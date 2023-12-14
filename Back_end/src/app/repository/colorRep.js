const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const Color = require('../model/models/color')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');

class ColorRepository extends BaseRepository {
  constructor() {
    super(Color);
  }
}

module.exports = new ColorRepository();
