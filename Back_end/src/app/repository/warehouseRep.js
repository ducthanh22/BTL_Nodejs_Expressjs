const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const warehouse = require('../model/models/warehouse')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');

class warehouseRepository extends BaseRepository {
  constructor() {
    super(warehouse);
  }
}

module.exports = new warehouseRepository();
