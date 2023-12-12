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
      const id = req.body.id;
      const data = await categoriesRep.getbyid(id);
      if (!data) {
        return res.status(404).json({ message: 'Category not found' });
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
    const categoryId = req.body.id;
    const updatedData = req.body; // Dữ liệu cần cập nhật, gửi qua body của yêu cầu
    try {
      const updatedCategory = await categoriesRep.update(categoryId, updatedData);
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.body.id;
      const data = await categoriesRep.delete(id);
      if (!data) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  async  searchAndPaginate(req, res) {
    try {
      const { query, page, pageSize } = req.body;
      const { count, rows } = await categoriesRep.searchAndPaginate(query, page, pageSize);
      res.status(200).json({ count, rows });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
}


module.exports = new CategoriesController();
