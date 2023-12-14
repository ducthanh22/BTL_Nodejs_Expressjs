const { Op } = require('sequelize');

class BaseRep {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      const data = await this.model.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getbyid(id) {
    try {
      const data = await this.model.findByPk(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      const newData = await this.model.create(data);
      return newData;
    } catch (error) {
      throw error;
    }
  }

  async update(id, Data) {
    try {
      const existingData = await this.model.findByPk(id);
      if (existingData) {
        const updatedDataInstance = await existingData.update(Data, {
          where: { id },
        });
        return updatedDataInstance;
      } else {
        throw new Error(`id ${id} not found.`);
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const existingData = await this.model.findByPk(id);
      if (existingData) {
        const deletedCount = await this.model.destroy({ where: { id } });
        if (deletedCount > 0) {
          return { message: `Deleted id ${id}` };
        } else {
          throw new Error(`id ${id} not found.`);
        }
      } else {
        throw new Error(`id ${id} not found.`);
      }
    } catch (error) {
      throw error;
    }
  }

  // async searchAndPaginate(keyword, page=1, pageSize=6) {
  //   try {
  //     let whereCondition = {};
  //     // Kiểm tra xem keyword có giá trị không
  //     if (keyword && keyword.trim() !== "") {
  //       whereCondition = {
  //         name: {
  //           [Op.like]: `%${keyword}%`,
  //         },
  //       };
  //     }
  //     const { count, rows } = await this.model.findAndCountAll({
  //       where: whereCondition,
  //       limit: pageSize,
  //       offset: (page - 1) * pageSize,
  //     });
  //     return { count, rows };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async searchAndPaginate(keyword, page, pageSize) {
    try {
      let whereCondition = {};
  
      // Kiểm tra xem keyword có giá trị không
      if (keyword && keyword.trim() !== "") {
        whereCondition = {
          name: {
            [Op.like]: `%${keyword}%`,
          },
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

module.exports = BaseRep;
