const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('testdb', 'localuser', '123456', {
  host: 'localhost',
  dialect: 'postgres'
});

// Load models using factory functions
const Product = require('./Products')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);
const Message = require('./Message')(sequelize, DataTypes);
const Category = require('./Category')(sequelize, DataTypes);
const Order = require('./Order')(sequelize, DataTypes);
const OrderItem = require('./OrderItem')(sequelize, DataTypes);
// Set associations

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

Product.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Product, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

module.exports = { sequelize, Product, User, Message, Category , Order, OrderItem };
