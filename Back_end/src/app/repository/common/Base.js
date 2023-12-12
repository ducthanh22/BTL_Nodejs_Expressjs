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

  async update(id, updatedData) {
    try {
      const existingData = await this.model.findByPk(id);
      if (existingData) {
        const updatedDataInstance = await existingData.update(updatedData, {
          where: { id },
        });
        return updatedDataInstance;
      } else {
        throw new Error(`ID ${id} not found.`);
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
          return { message: `Deleted ID ${id}` };
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

  async searchAndPaginate(query, page = 1, pageSize = 10) {
    try {
      if (isNaN(page) || page < 1) {
        page = 1;
      }

      const { count, rows } = await this.model.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${query}%`,
          },
        },
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });

      return { count, rows };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseRep;
