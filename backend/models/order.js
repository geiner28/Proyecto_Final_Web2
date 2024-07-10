module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      clientName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      clientID: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
    });
  
    return Order;
  };
  