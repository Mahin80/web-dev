const { Order, OrderItem, Product } = require('../models');

exports.createStripeSession = async (req, res) => {
  const { items, email, ...shipping } = req.body;

  try {
    const lineItems = await Promise.all(items.map(async item => {
      const product = await Product.findByPk(item.id);
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name
          },
          unit_amount: Math.round(product.price * 100), // in cents
        },
        quantity: item.quantity
      };
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: lineItems,
      success_url: 'http://localhost:5000/stripe/orders/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5000/checkout.html',
      metadata: {
        email,
        cart: JSON.stringify(items),
        ...shipping
      }
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
};

exports.handleSuccess = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const items = JSON.parse(session.metadata.cart);

  console.log('Stripe session metadata:', session.metadata);

  try {
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.id);
      if (!product) {
        console.error('Missing product for ID:', item.id);
        throw new Error(`Product not found for ID ${item.id}`);
      }
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      orderItems.push({ productId: product.id, quantity: item.quantity, price: product.price, name: product.name });
    }

    const shipping = (total > 100) ? 0 : 20;
    const subtotal = total + shipping;

    const orderData = {
      email: session.metadata.email,
      total,
      shipping,
      subtotal,
      paymentMethod: 'stripe',
      ...session.metadata
    };

    
    if (!orderData.userId || orderData.userId === '') {
      orderData.userId = null;
    } else {
      orderData.userId = parseInt(orderData.userId);
    }

    const order = await Order.create(orderData);

    for (const item of orderItems) {
      await OrderItem.create({ ...item, orderId: order.id });
    }

    res.redirect('/pages/thankyou.html');
  } catch (err) {
    console.error('Order saving failed:', err);
    res.status(500).send('Order processing error.');
  }
};