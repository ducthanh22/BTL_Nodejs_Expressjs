const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const detail_importbill = require('../model/models/detail_importbill')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');

class detail_importbillRepository extends BaseRepository {
  constructor() {
    super(detail_importbill);
  }
}

module.exports = new detail_importbillRepository();
