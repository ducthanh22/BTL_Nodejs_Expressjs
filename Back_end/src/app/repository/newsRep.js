const { DataTypes } = require('sequelize');
var db = require('../model/models/index');
const news = require('../model/models/news')(db.sequelize, DataTypes);
const BaseRepository = require('../repository/common/Base');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs').promises;



class newsRepository extends BaseRepository {
  constructor() {
    super(news);
  }

  async searchNews(keyword, page, pageSize) {
    try {
      let whereCondition = {};
      // Kiểm tra xem keyword có giá trị không
      if (keyword && keyword.trim() !== "") {
        whereCondition = {
            Title: {
            [Op.like]: `%${keyword}%`,
          },
        };
      }
      // Chuyển đổi pageSize thành một giá trị số
      const numericPageSize = parseInt(pageSize);
      const { count, rows } = await news.findAndCountAll({
        where: whereCondition,
        limit: numericPageSize,
        offset: (page - 1) * numericPageSize,
      });
  
      return { count, rows };
    } catch (error) {
      throw error;
    }
  }

  async fileUpload(id, file) {
    console.log(file)
    try {
      const existingNews = await news.findByPk(id);
      console.log(existingNews)
      if (existingNews) {
        const olname=existingNews.Image;
        const newFileName = `${Date.now()}_${file.name}`;
        existingNews.Image =newFileName;
        const uploadPath = path.join('D:/BTL_Nodejs_Expressjs/DoAn5.UI/src/assets/admin/img_blog',newFileName);
        if(olname!=null && olname !=''){
          const existoldfile = path.join('D:/BTL_Nodejs_Expressjs/DoAn5.UI/src/assets/admin/img_blog',olname);
          await fs.unlink(existoldfile);
          await file.mv(uploadPath);
          await existingNews.save();
        }
        else{
          await file.mv(uploadPath);
          await existingNews.save();
        }
        return (`UpLoadFile ${newFileName} success`);
      } else {
        throw new Error(`Product with ID ${id} not found.`);
      }
    } catch (error) {
        console.log(error)
      throw error;
    }
  }
}

module.exports = new newsRepository();
