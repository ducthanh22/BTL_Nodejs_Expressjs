const {DataTypes,Op } = require('sequelize'); 
var db = require('../model/models/index');
const sequelize = db.sequelize; 
const order = require('../model/models/order')(db.sequelize, DataTypes);
const BaseRepository = require('./common/Base');
const order_detail= require('../model/models/order_detail')(db.sequelize, DataTypes);
const customer= require('../model/models/users')(db.sequelize, DataTypes);
const products= require('../model/models/products')(db.sequelize, DataTypes);



order.hasMany(order_detail, { foreignKey: 'Id_product' });

order.belongsTo(customer, {foreignKey: 'Id_customer'});
customer.hasMany(order, { foreignKey: 'Id_customer' });

products.hasMany(products, { foreignKey: 'Id_product' });
products.belongsTo(products, {foreignKey: 'Id_product'});



class OrderRepository extends BaseRepository {
  constructor() {
    super(order);
  }
  async createMany(orderData, orderDetailsData) {
    let transaction;
    try {
      // Bắt đầu giao dịch
      transaction = await sequelize.transaction();
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
              [{
                model: customer,
                required: false,
              },
              
            ]
            
          });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async searchAndPaginateOrder(keyword, page, pageSize) {
    try {
     
      let whereCondition = {};
      // Kiểm tra xem keyword có giá trị không
      if (keyword && keyword.trim() !== "") {
        whereCondition = {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        };
        console.log(whereCondition)
      }
      // Chuyển đổi pageSize thành một giá trị số
      const numericPageSize = parseInt(pageSize);
      const { count, rows } = await order.findAndCountAll({
        where: whereCondition,
        limit: numericPageSize,
        offset: (page - 1) * numericPageSize,
        include:[
          // {
          //   model:order_detail,
          //   required:false
          // },
          {
            model:customer,
            required:false
          }
        ]
      });
      return { count, rows };
    } catch (error) {
      throw error;
    }
  }

  
  
}

module.exports = new OrderRepository();