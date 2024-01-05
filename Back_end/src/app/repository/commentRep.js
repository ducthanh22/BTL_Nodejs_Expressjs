const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const comment = require('../model/models/comment')(db.sequelize, DataTypes);
const users = require('../model/models/users')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');

users.hasMany(comment, { foreignKey: 'Id_user' })
comment.belongsTo(users,{ foreignKey: 'Id_user' })


class commentRepository extends BaseRepository {
  constructor() {
    super(comment);
  }

  async getbynews(id,page=1, pageSize=10){
    try{ 
      // Chuyển đổi pageSize thành một giá trị số
      const numericPageSize = parseInt(pageSize);
      const { count, rows } = await comment.findAndCountAll({

        where: {Id_news:id},
        include: [
          {
            model: users,
            required: false,
          },
          
        ],
        limit: numericPageSize,//giới hạn số lượng bản ghi
        offset: (page - 1) * numericPageSize,//vị trí bắt đầu của tập dữ liệu 
      });
  
      return { count, rows };
    }
    catch(error){
      throw error
    }
  }
}

module.exports = new commentRepository();
