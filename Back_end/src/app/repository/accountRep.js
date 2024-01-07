const { DataTypes ,Op} = require('sequelize');
var db = require('../model/models/index');
const account = require('../model/models/users')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');
const jwt = require("jsonwebtoken");
const secretKey = "THANH125202";


class accountRepository extends BaseRepository {
    constructor() {
        super(account);
    }
    async login(username, password) {
        try {
            const exist_user = await account.findOne({
                where: {
                    username: username,
                    password: password,
                },
            });
            // console.log(exist_user)
            if (exist_user) {
                const token = jwt.sign({
                    id: exist_user.id,
                    username: exist_user.username,
                    fullname:exist_user.name,
                    email:exist_user.email,
                    sdt:exist_user.sdt,
                    address:exist_user.address,
                    status:exist_user.status,
                }, secretKey, { expiresIn: "24h" });

                return {
                    id: exist_user.id,
                    username: exist_user.username,
                    token}
            }
        }
        catch (error) {
            throw error;
        }
    }

    async searchCustomer(keyword, page, pageSize) {
        try {
          let whereCondition = {};
          if (keyword && keyword.trim() !== "") {
            whereCondition = {
              name: {
                [Op.like]: `%${keyword}%`,
              },
              status: 1,
            };
          } else {
            whereCondition = {
              status: 1,
            };
          }
          // Chuyển đổi pageSize thành một giá trị số
          const numericPageSize = parseInt(pageSize);
          const { count, rows } = await account.findAndCountAll({
            where: whereCondition,
            limit: numericPageSize,
            offset: (page - 1) * numericPageSize,
          });
      
          return { count, rows };
        } catch (error) {
          throw error;
        }
      }

      async searchStaff(keyword, page, pageSize) {
        try {
          let whereCondition = {};
          if (keyword && keyword.trim() !== "") {
            whereCondition = {
              name: {
                [Op.like]: `%${keyword}%`,
              },
              status: 2,
            };
          } else {
            whereCondition = {
              status: 2,
            };
          }
          // Chuyển đổi pageSize thành một giá trị số
          const numericPageSize = parseInt(pageSize);
          const { count, rows } = await account.findAndCountAll({
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

module.exports = new accountRepository();
