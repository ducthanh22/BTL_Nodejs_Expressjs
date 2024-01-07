const { DataTypes, Op } = require('sequelize');
var db = require('../model/models/index');
const sequelize = db.sequelize;
const users = require('../model/models/users')(db.sequelize, DataTypes);
const order = require('../model/models/order')(db.sequelize, DataTypes);
const exportbill = require('../model/models/exportbill')(db.sequelize, DataTypes);


class ThongkeRepository {

  async getStatistics(startDate, endDate) {
    try {
      let whereCondition = {};

      if (startDate !== '' && endDate !== '') {
        const endDatePlusOneDay = new Date(endDate);
        endDatePlusOneDay.setDate(endDatePlusOneDay.getDate() + 1);

        whereCondition = {
          createdAt: {
            [Op.between]: [startDate, endDatePlusOneDay],
          },
        };
      }

      // Thống kê số lượng người dùng (User)
      const userCount = await users.count({
        where: {
          status: 1,
          ...whereCondition,
        },
      });

      // Thống kê số lượng đơn đặt hàng (Order)
      const orderCount = await order.count({
        where: whereCondition,
      });

      // Thống kê tổng giá trị hóa đơn xuất (ExportBill)
      const exportBillTotalValue = await exportbill.sum('Price', {
        where: whereCondition,
      });

      return { userCount, orderCount, exportBillTotalValue };
    } catch (error) {
      throw error;
    }
  }

  async getMonthlyRevenue(startDate, endDate) {
    try {

      let whereCondition = {};

      if (startDate !== '' && endDate !== '') {
        // Chuyển đổi startDate và endDate thành đối tượng Date
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        // Đặt giờ, phút, giây của endDate về 23:59:59 để bao gồm cả ngày cuối cùng
        endDateObj.setHours(23, 59, 59);
        whereCondition = {
          createdAt: {
            [Op.between]: [startDateObj, endDateObj],
          },
        };
      }
      if(startDate == '' && endDate == '') {
        // Lấy ra 6 tháng từ cuối
        const currentDate = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
        console.log(sixMonthsAgo)
        whereCondition = {
          createdAt: {
            [Op.gte]: sixMonthsAgo,
            [Op.lte]: currentDate,
          },
        };
      }
      // Truy vấn cơ sở dữ liệu để lấy doanh thu theo tháng
      const monthlyRevenue = await exportbill.findAll({
        attributes: [
          [sequelize.fn('YEAR', sequelize.col('createdAt')), 'year'],
          [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
          [sequelize.fn('SUM', sequelize.col('Price')), 'totalRevenue'],
        ],
        where: whereCondition,
        group: [sequelize.fn('YEAR', sequelize.col('createdAt')), sequelize.fn('MONTH', sequelize.col('createdAt'))],
        raw: true,
      });
      return monthlyRevenue;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }


}

module.exports = new ThongkeRepository();
