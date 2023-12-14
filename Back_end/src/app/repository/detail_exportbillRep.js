const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const detail_exportbill = require('../model/models/detail_exportbill')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');

class detail_exportbillRepository extends BaseRepository {
  constructor() {
    super(detail_exportbill);
  }
}

module.exports = new detail_exportbillRepository();
