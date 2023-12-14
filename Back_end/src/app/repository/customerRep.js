const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const customer = require('../model/models/customer')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');

class customerRepository extends BaseRepository {
  constructor() {
    super(customer);
  }
}

module.exports = new customerRepository();
