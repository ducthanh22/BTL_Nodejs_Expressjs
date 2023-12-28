'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exportbill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exportbill.init({
    Id_customer: DataTypes.INTEGER,
    Price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Exportbill',
  });
  return Exportbill;
};