const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const size = require('../model/models/size')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');

class SizeRepository extends BaseRepository {
  constructor() {
    super(size);
  }
}

module.exports = new SizeRepository();
