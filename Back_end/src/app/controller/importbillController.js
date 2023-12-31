// controller/ColorController.js
const Rep = require('../repository/importbillRep');

class importbillController {

  async getAll(_, res) {
    try {
      const data = await Rep.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
  async getbyid(req, res) {
    try {
      const id = req.body.id;
      const data = await Rep.getbyids(id);
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
      const orderData = req.body;
      const orderDetailsData = req.body.Detail_importbills;
      console.log(req.body)
   
      const newCategory = await Rep.createMany(orderData, orderDetailsData);
      res.status(201).json({
        message: ' created successfully',
        order: newCategory,
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
      const updated = await Rep.update(id, Data);
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.body.id;
      const data = await Rep.delete(id);
      if (!data) {
        return res.status(404).json({ message: ' not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }

  async  searchAndPaginate(req, res) {
    try {
      const { keyword, page, pageSize } = req.query;
      const { count, rows } = await Rep.searchAndPaginate(keyword, page, pageSize);
      res.status(200).json({ count, rows });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
}

module.exports = new importbillController();
