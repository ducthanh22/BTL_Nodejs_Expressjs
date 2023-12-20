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
      const id = req.params.id;
    
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
  async getcategories(req, res) {
    try {
      const { id, page, pageSize } = req.query;
      const { count, rows } = await productsRep.getcategories(id, page, pageSize);
      res.status(200).json({ count, rows });
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
      req.productId = newproducts.id;
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
    const productsid = req.body.id;
    const updatedData = req.body; // Dữ liệu cần cập nhật, gửi qua body của yêu cầu
    try {
      const updatedproducts = await productsRep.updateproducts(productsid, updatedData);
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
      const { keyword, page, pageSize } = req.body;
      const { count, rows } = await productsRep.searchAndPaginate(keyword, page, pageSize);
      res.status(200).json({ count, rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  async  Fileupload(req, res) {
    try {
      const id = req.productId || parseInt(req.body.id);

      const file = req.files.file;
      const data = await productsRep.fileUpload(id, file);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
}


module.exports = new productsController();
