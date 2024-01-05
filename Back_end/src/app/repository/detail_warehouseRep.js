const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const detail_warehouse = require('../model/models/detail_warehouse')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');

class Detail_warehouseRepository extends BaseRepository {
  constructor() {
    super(detail_warehouse);
  }
  async createmany(data) {
    try {
      const result = await Promise.all(
        data.map(async (item) => {
          const existingRecord = await detail_warehouse.findOne({
            where: {
              Idproduct: item.Idproduct,
              Idwarehouse: item.Idwarehouse,
            },
          });
          if (existingRecord) {
            // Nếu bản ghi đã tồn tại, cộng thêm vào trường Quantity
            existingRecord.Quantity += item.Quantity;
            return existingRecord.save();
          } else {
            // Nếu bản ghi chưa tồn tại, tạo mới
            return detail_warehouse.create(item);
          }
        })
      );
  
      return result;
    } catch (error) {
      throw error;
    }
  }
  async Deletemany(data) {
    try {
      const result = await Promise.all(
        data.map(async (item) => {
          const existingRecord = await detail_warehouse.findOne({
            where: {
              Idproduct: item.Idproduct,
              Idwarehouse: item.Idwarehouse,
            },
          });
  
          if (existingRecord) {
            // Nếu bản ghi đã tồn tại, cộng thêm vào trường Quantity
            existingRecord.Quantity -= item.Quantity;
            return existingRecord.save();
          } else {
            // Nếu bản ghi chưa tồn tại, tạo mới
            return `Không có mã sản phẩm ${item.Idproduct}`;
          }
        })
      );
  
      return result;
    } catch (error) {
      throw error;
    }
  }
  
}

module.exports = new Detail_warehouseRepository();
