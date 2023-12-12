const { Sequelize, DataTypes } = require('sequelize'); 
var db = require('../model/models/index');

const sequelize = db.sequelize; 

const order = require('../model/models/order')(db.sequelize, DataTypes);
const BaseRepository = require('./common/Base');
const order_detail= require('../model/models/order_detail')(db.sequelize, DataTypes);

order.hasMany(order_detail, { foreignKey: 'Id_product' });

class OrderRepository extends BaseRepository {
  constructor() {
    super(order);
  }
  async createMany(orderData, orderDetailsData) {
    let transaction;
    try {
      // Bắt đầu giao dịch
      transaction = await sequelize.transaction();
      console.log("transaction",transaction)
      const newOrder = await order.create(orderData, { transaction });
      if (orderDetailsData && Array.isArray(orderDetailsData)) {
        const orderDetailsWithOrderId = orderDetailsData.map((detail) => ({
          ...detail,
          Id_Order: newOrder.id,
        }));
        console.log(orderDetailsWithOrderId)
        await order_detail.bulkCreate(orderDetailsWithOrderId, { transaction });
      }
      // Commit giao dịch nếu mọi thứ thành công
      await transaction.commit();
      return newOrder;
    } catch (error) {
      console.error('Error creating Order:', error);
      // Rollback giao dịch nếu có lỗi
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  
  


  async getbyids(id) {
    try {
        const data = await order.findByPk(id, {
            include: 
              {
                model: order_detail,
                required: false,
              }
            
          });
      return data;
    } catch (error) {
      throw error;
    }
  }
  
}

module.exports = new OrderRepository();