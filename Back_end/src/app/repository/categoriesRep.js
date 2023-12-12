// const { DataTypes } = require('sequelize');
// var db = require('../model/models/index');
// const categories = require('../model/models/categories')(db.sequelize, DataTypes);
// const { Op } = require('sequelize');
// class CategoriesRep {
//   async getAll() {
//     try {
//       const data = await categories.findAll();
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async getbyid(id) {
//     try {
//       const data = await categories.findByPk(id);
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async Create(categoryData) {
//     try {
//       const newCategory = await categories.create(categoryData);
//       return newCategory;
//     } catch (error) {
//       throw error;
//     }
//   }
//   async updateCategory(categoryId, updatedData) {
//     try {
//       const existingCategory = await categories.findByPk(categoryId);
//       if (existingCategory) {
//         const updatedCategory = await existingCategory.update(updatedData, {
//           where: { id: categoryId } 
//         });
//         return updatedCategory;
//       } else {
//         throw new Error(`ID ${categoryId} not found.`);
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
//   async delete(id) {
//     try {
//       const existingCategory = await categories.findByPk(id);
//       if (existingCategory) {
//         // Sử dụng phương thức destroy để xóa bản ghi
//         const deletedCategoryCount = await categories.destroy({ where: { id } });
//         if (deletedCategoryCount > 0) {
//           return { message: `Đã xóa ID ${id}` };
//         } else {
//           throw new Error(`ID ${id} not found.`);
//         }
//       } else {
//         throw new Error(`ID ${id} not found.`);
//       }
//     } catch (error) {
//       throw error;
//     }
//   }  
//   async searchAndPaginate(query, page=1, pageSize=10) {
//     try {
//       if (isNaN(page) || page < 1) {
//         page = 1;
//       }
//       const { count, rows } = await categories.findAndCountAll({
//         where: {
//           name: {
//             [Op.like]: `%${query}%`,
//           },
//         },
//         limit: pageSize,
//         offset: (page - 1) * pageSize,
//       });

//       return { count, rows };
//     } catch (error) {
//       throw error;
//     }
//   }

// }


// module.exports = new CategoriesRep();



const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const categories = require('../model/models/categories')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');

class CategoriesRepository extends BaseRepository {
  constructor() {
    super(categories);
  }
  
}

module.exports = new CategoriesRepository();
