const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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
      success_url: 'http://localhost:5000/pages/thankyou.html',
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

