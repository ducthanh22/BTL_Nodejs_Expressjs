const { DataTypes } = require('sequelize');
var db = require('../model/models/index');

const sequelize = db.sequelize; 
const exportbill = require('../model/models/exportbill')(db.sequelize, DataTypes);
const detail_exportbill = require('../model/models/detail_exportbill')(db.sequelize, DataTypes);
const BaseRepository = require('./common/Base');

exportbill.hasMany(detail_exportbill, { foreignKey: 'IdExportbill' });

class exportbillRepository extends BaseRepository {
  constructor() {
    super(exportbill);
  }
  async createMany(orderData, orderDetailsData) {
    let transaction;
    try {
      // Bắt đầu giao dịch
      transaction = await sequelize.transaction();
      const newOrder = await exportbill.create(orderData, { transaction });
      if (orderDetailsData && Array.isArray(orderDetailsData)) {
        const orderDetailsWithOrderId = orderDetailsData.map((detail) => ({
          ...detail,
          IdExportbill: newOrder.id,
        }));
        await detail_exportbill.bulkCreate(orderDetailsWithOrderId, { transaction });
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
        const data = await exportbill.findByPk(id, {
            include: 
              {
                model: detail_exportbill,
                required: false,
              }
          });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async search(keyword, page, pageSize) {
    try {
      let whereCondition = {};
      // Kiểm tra xem keyword có giá trị không
      if (keyword) {
        whereCondition = {
          id: keyword
        };
      }
      // Chuyển đổi pageSize thành một giá trị số
      const numericPageSize = parseInt(pageSize);
      const { count, rows } = await this.model.findAndCountAll({
        where: whereCondition,
        limit: numericPageSize,
        offset: (page - 1) * numericPageSize,
      });
  
      return { count, rows };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new exportbillRepository();
