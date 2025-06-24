const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const stripeRoutes = require('./routes/checkoutRoutes');
const { sequelize, Product, User,Messages,Category } = require('./models');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/messages', messageRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes);
app.use('/stripe', stripeRoutes);

app.use('/pages', express.static(path.join(__dirname, '../pages')));

app.use('/uploads', express.static('uploads')); // To serve uploaded images




sequelize.sync({}).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
