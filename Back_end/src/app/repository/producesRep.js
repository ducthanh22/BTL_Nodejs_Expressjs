
const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const produces = require('../model/models/produces')(db.sequelize, DataTypes);
const BaseRepository = require('./common/Base');

class ProducesRepository extends BaseRepository {
  constructor() {
    super(produces);
  }
  
}

module.exports = new ProducesRepository();
