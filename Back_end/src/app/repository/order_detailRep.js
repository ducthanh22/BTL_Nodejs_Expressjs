const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const order_detail = require('../model/models/order_detail')(db.sequelize, DataTypes);
const order = require('../model/models/order')(db.sequelize, DataTypes);
const products = require('../model/models/products')(db.sequelize, DataTypes);


const BaseRepository = require('../repository/common/Base');


order.hasMany(order_detail, { foreignKey: 'Id_Order' });
order_detail.belongsTo(order, { foreignKey: 'Id_Order' });

products.hasMany(order_detail, { foreignKey: 'Id_product' });
order_detail.belongsTo(products, { foreignKey: 'Id_product' });


class order_detailRepository extends BaseRepository {
  constructor() {
    super(order_detail);
  }

  async getbyids(id) {
    try {
      const data = await order_detail.findAll({
        where: { Id_Order: id }, // Điều kiện tìm kiếm sử dụng object { Id_Order: id }
        include: [
          {
            model: products,
            required: false,
          },
          {
            model: order,
            required: false,
          },
        ],
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  
}

module.exports = new order_detailRepository();


