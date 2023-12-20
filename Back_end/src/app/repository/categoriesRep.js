
const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const categories = require('../model/models/categories')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');

class CategoriesRepository extends BaseRepository {
  constructor() {
    super(categories);
  }
  
}

module.exports = new CategoriesRepository();
