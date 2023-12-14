// controller/ColorController.js
const detail_exportbillRep = require('../repository/detail_exportbillRep');

class detail_exportbillRepController {

  async getAll(_, res) {
    try {
      const data = await detail_exportbillRep.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
  async getbyid(req, res) {
    try {
      const id = req.body.id;
      console.log(id)
      const data = await detail_exportbillRep.getbyid(id);
      if (!data) {
        return res.status(404).json({ message: ' not found' });
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
      const ColorData = req.body;
      const newColor = await detail_exportbillRep.create(ColorData);
      res.status(201).json({
        message: ' created successfully',
        Color: newColor,
      });
    } catch (error) {
      // Xử lý lỗi và trả về thông báo lỗi
      console.error('Error creating :', error);
      res.status(500).json({
        error: error.message,
      });
    }
  }

  async update(req, res) {
    const id = req.body.id;
    console.log(id)
    const Data = req.body; // Dữ liệu cần cập nhật, gửi qua body của yêu cầu
    try {
      const updated = await detail_exportbillRep.update(id, Data);
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server ', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.body.id;
      const data = await detail_exportbillRep.delete(id);
      if (!data) {
        return res.status(404).json({ message: ' not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server ', error: error.message });
    }
  }

  async  searchAndPaginate(req, res) {
    try {
      const { keyword, page, pageSize } = req.body;
      const { count, rows } = await detail_exportbillRep.searchAndPaginate(keyword, page, pageSize);
      res.status(200).json({ count, rows });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
}

module.exports = new detail_exportbillRepController();
