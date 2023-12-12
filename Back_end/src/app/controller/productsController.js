// controller/productsController.js
const productsRep = require('../repository/productRep');

class productsController {

  async getAll(_, res) {
    try {
      const data = await productsRep.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
  async getbyid(req, res) {
    try {
      const id = req.body.id;
      const data = await productsRep.getbyid(id);
      if (!data) {
        return res.status(404).json({ message: 'products not found' });
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
      const productsData = req.body;
      const newproducts = await productsRep.Create(productsData);
      res.status(201).json({
        message: 'products created successfully',
        products: newproducts,
      });
    } catch (error) {
      // Xử lý lỗi và trả về thông báo lỗi
      console.error('Error creating products:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  async update(req, res) {
    const productsId = req.body.id;
    const updatedData = req.body; // Dữ liệu cần cập nhật, gửi qua body của yêu cầu
    try {
      const updatedproducts = await productsRep.updateproducts(productsId, updatedData);
      res.status(200).json(updatedproducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.body.id;
      const data = await productsRep.delete(id);
      if (!data) {
        return res.status(404).json({ message: 'products not found' });
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
      const { count, rows } = await productsRep.searchAndPaginate(query, page, pageSize);
      res.status(200).json({ count, rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
}


module.exports = new productsController();
