'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail_importbill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Detail_importbill.init({
    IdImportbillId: DataTypes.INTEGER,
    Idproduct: DataTypes.INTEGER,
    Price: DataTypes.INTEGER,
    Quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detail_importbill',
  });
  return Detail_importbill;
};