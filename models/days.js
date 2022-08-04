'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Days extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Days.init({
    email: DataTypes.STRING,
    drugName: DataTypes.STRING,
    sunday: DataTypes.BOOLEAN,
    monday: DataTypes.BOOLEAN,
    tuesday: DataTypes.BOOLEAN,
    wednesday: DataTypes.BOOLEAN,
    thursday: DataTypes.BOOLEAN,
    friday: DataTypes.BOOLEAN,
    saturday: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Days',
  });
  return Days;
};