const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const order_detail = require('../model/models/order_detail')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');

class order_detailRepository extends BaseRepository {
  constructor() {
    super(order_detail);
  }
}

module.exports = new order_detailRepository();
