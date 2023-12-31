const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const price = require('../model/models/price')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');

class PriceRepository extends BaseRepository {
  constructor() {
    super(price);
  }
}

module.exports = new PriceRepository();
