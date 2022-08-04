'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockMedication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  StockMedication.init({
    email: DataTypes.STRING,
    drug_name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    quantity_remind: DataTypes.INTEGER,
    alert_time: DataTypes.STRING,
    reminder_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StockMedication',
  });
  return StockMedication;
};