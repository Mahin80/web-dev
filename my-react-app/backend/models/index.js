import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize('testdb', 'localuser', '123456', {
  host: 'localhost',
  dialect: 'postgres'
});

import ProductModel from './Products.js';
import UserModel from './User.js';
import MessageModel from './Message.js';
import CategoryModel from './Category.js';
import OrderModel from './Order.js';
import OrderItemModel from './OrderItem.js';

export const Product = ProductModel(sequelize, DataTypes);
export const User = UserModel(sequelize, DataTypes);
export const Message = MessageModel(sequelize, DataTypes);
export const Category = CategoryModel(sequelize, DataTypes);
export const Order = OrderModel(sequelize, DataTypes);
export const OrderItem = OrderItemModel(sequelize, DataTypes);

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

