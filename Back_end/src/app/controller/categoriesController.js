// controller/categoriesController.js
const categoriesRep = require('../repository/categoriesRep');

class CategoriesController {

  async getAll(_, res) {
    try {
      const data = await categoriesRep.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
  async getbyid(req, res) {
    try {
      const id = req.params.id;
   
      const data = await categoriesRep.getbyid(id);
      if (!data) {
        return res.status(404).json({ message: 'not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
  async create(req, res) {
    try {
      // Lấy dữ liệu từ request body hoặc bất kỳ nguồn dữ liệu nào khác
      const categoryData = req.body;
      const newCategory = await categoriesRep.create(categoryData);
      res.status(201).json({
        message: 'Category created successfully',
        category: newCategory,
      });
    } catch (error) {
      // Xử lý lỗi và trả về thông báo lỗi
      console.error('Error creating category:', error);
      res.status(500).json({
        error: error.message,
      });
    }
  }

  async updateCategory(req, res) {
    const id = req.body.id;
    const Data = req.body; // Dữ liệu cần cập nhật, gửi qua body của yêu cầu
    try {
      const updated = await categoriesRep.update(id, Data);
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const data = await categoriesRep.delete(id);
      if (!data) {
        return res.status(404).json({ message: 'not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  async  searchAndPaginate(req, res) {
    try {
      const keyword = req.query.keyword;
      const page = req.query.page;
      const pageSize = req.query.pageSize;
      console.log('page',keyword)
     
      const { count, rows } = await categoriesRep.searchAndPaginate(keyword, page, pageSize);
      res.status(200).json({  count, rows });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
}
module.exports = new CategoriesController();
