module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  });

  Product.associate = models => {
    Product.belongsTo(models.User, { foreignKey: 'userId' });
    Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
  };

  return Product;
};
