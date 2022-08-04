'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alerts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Alerts.init({
    email: DataTypes.STRING,
    drugName: DataTypes.STRING,
    getSMS: DataTypes.BOOLEAN,
    getEmail: DataTypes.BOOLEAN,
    getPhoneCall: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Alerts',
  });
  return Alerts;
};