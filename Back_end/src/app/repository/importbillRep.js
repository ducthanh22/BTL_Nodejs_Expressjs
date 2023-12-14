const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const importbill = require('../model/models/importbill')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');
const detail_importbill = require('../model/models/detail_importbill')(db.sequelize, DataTypes);
const sequelize = db.sequelize; 
importbill.hasMany(detail_importbill, { foreignKey: 'IdImportbillId' });


class importbillRepository extends BaseRepository {
  constructor() {
    super(importbill);
  }
  async createMany(orderData, orderDetailsData) {
    let transaction;
    try {
      // Bắt đầu giao dịch
      transaction = await sequelize.transaction();
      const newOrder = await importbill.create(orderData, { transaction });
      if (orderDetailsData && Array.isArray(orderDetailsData)) {
        const orderDetailsWithOrderId = orderDetailsData.map((detail) => ({
          ...detail,
          IdImportbillId: newOrder.id,
        }));
        console.log(orderDetailsWithOrderId)
        await detail_importbill.bulkCreate(orderDetailsWithOrderId, { transaction });
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
        const data = await importbill.findByPk(id, {
            include: 
              {
                model: detail_importbill,
                required: false,
              }
            
          });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new importbillRepository();
