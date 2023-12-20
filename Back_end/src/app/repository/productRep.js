const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const products = require('../model/models/products')(db.sequelize, DataTypes);
const color = require('../model/models/color')(db.sequelize, DataTypes);
const price = require('../model/models/price')(db.sequelize, DataTypes);
const categories = require('../model/models/categories')(db.sequelize, DataTypes);

const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs').promises;

products.belongsTo(categories, { foreignKey: 'Idcategories' });

products.hasMany(color, { foreignKey: 'ID_products' });
products.hasMany(price, { foreignKey: 'Idproduct' });




class productsRep {
  async getAll() {
    try {
      const data = await products.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  async getbyid(id) {
    try {
        const data = await products.findByPk(id, {
            include: [
              {
                model: color,
                required: false,
              },
              {
                model: price,
                required: false,
              },
              {
                model: categories,
                required: false,
              },
            ],
          });
      return data;
    } catch (error) {
      throw error;
    }
  }

 async getcategories(id,page=1, pageSize=10){
    try{
      
      // Chuyển đổi pageSize thành một giá trị số
      const numericPageSize = parseInt(pageSize);
      const { count, rows } = await products.findAndCountAll({

        where: {Idcategories:id},
        include: [
          {
            model: price,
            required: false,
          },
          {
            model: color,
            required: false,
          }
        ],
        limit: numericPageSize,
        offset: (page - 1) * numericPageSize,
      });
  
      return { count, rows };
    }
    catch(error){
      throw error
    }
  }

  async Create(Data) {
    try {
      const newCategory = await products.create(Data);
      return newCategory;
    } catch (error) {
      throw error;
    }
  }
  async update(Id, Data) {
    try {
      const existing = await products.findByPk(Id);
      if (existing) {
        const updated = await existing.update(Data, {
          where: { id: Id } 
        });
        return updated;
      } else {
        throw new Error(`ID ${Id} not found.`);
      }
    } catch (error) {
      throw error;
    }
  }
  async delete(id) {
    try {
      const existing = await products.findByPk(id);
      if (existing) {
        // Sử dụng phương thức destroy để xóa bản ghi
        const deletedCategoryCount = await products.destroy({ where: { id } });
        if (deletedCategoryCount > 0) {
          return { message: `Đã xóa ID ${id}` };
        } else {
          throw new Error(`ID ${id} not found.`);
        }
      } else {
        throw new Error(`ID ${id} not found.`);
      }
    } catch (error) {
      throw error;
    }
  }  
  async searchAndPaginate(keyword, page=1, pageSize=10) {
    try {
      if (isNaN(page) || page < 1) {
        page = 1;
      }
      const { count, rows } = await products.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        include: [
          {
            model: price,
            required: false,
          },
          {
            model: color,
            required: false,
          }
        ],
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
      return { count, rows };
    } catch (error) {
      throw error;
    }
  }
  async fileUpload(id, file) {
    try {
      const existingProduct = await products.findByPk(id);
      if (existingProduct) {
        const olname=existingProduct.Image;
        const newFileName = `${Date.now()}_${file.name}`;
        existingProduct.Image =newFileName;
        const uploadPath = path.join('D:/BTL_Nodejs_Expressjs/DoAn5.UI/src/assets/admin/img',newFileName);
        if(olname!=null && olname !=''){
          const existoldfile = path.join('D:/BTL_Nodejs_Expressjs/DoAn5.UI/src/assets/admin/img',olname);
          await fs.unlink(existoldfile);
          await file.mv(uploadPath);
          await existingProduct.save();
        }
        else{
          await file.mv(uploadPath);
          await existingProduct.save();
        }
        return (`UpLoadFile ${newFileName} success`);
      } else {
        throw new Error(`Product with ID ${id} not found.`);
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new productsRep();
