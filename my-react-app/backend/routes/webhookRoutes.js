import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Stripe from 'stripe';
import { Order, OrderItem, Product } from '../models/index.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata;
    const items = JSON.parse(metadata.cart || '[]');

    try {
      let total = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await Product.findByPk(item.id);
        if (!product) continue;

        // Update stock here
        if (product.stock < item.quantity) {
          console.warn(`Insufficient stock for product ${product.name}`);
          continue; // Optionally abort the loop or order if stock is not enough
        }

        await Product.update(
          { stock: product.stock - item.quantity },
          { where: { id: item.id } }
        );

        total += product.price * item.quantity;
        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
          name: product.name
        });
      }

      const shipping = total > 100 ? 0 : 20;
      const subtotal = total + shipping;

      const orderData = {
        email: metadata.email,
        total,
        shipping,
        subtotal,
        paymentMethod: 'stripe',
        ...metadata
      };

      orderData.userId = orderData.userId ? parseInt(orderData.userId) : null;

      const order = await Order.create(orderData);
      for (const item of orderItems) {
        await OrderItem.create({ ...item, orderId: order.id });
      }

      console.log(' Order saved from webhook & stock updated.');
      res.status(200).json({ received: true });
    } catch (error) {
      console.error(' Error saving order from webhook:', error);
      res.status(500).send('Order saving failed');
    }
  } else {
    res.status(200).json({ received: true });
  }
});

export default router;