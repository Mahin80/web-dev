import dotenv from 'dotenv';
dotenv.config(); // Load .env variables

import express from 'express';
const app = express(); // p

import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import stripeRoutes from './routes/checkoutRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';

import { sequelize } from './models/index.js';
import path from 'path';

const PORT = process.env.PORT || 5000; // ✅ Declare your port

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/messages', messageRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes);
app.use('/stripe', stripeRoutes);
app.use('/webhook', webhookRoutes);

app.use('/pages', express.static('../pages')); 
app.use('/uploads', express.static('uploads')); 

sequelize.authenticate()
  .then(() => {
    console.log(' Database connected');

    return sequelize.sync({ alter: true}); // or sync({ force: true }) to recreate tables
  })
  .then(() => {
    console.log(' Database synced');
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error(' Failed to connect to DB or sync:', err);
  });
