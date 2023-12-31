// controller/categoriesController.js
const OrderRep = require('../repository/orderRep');

class OrderController {

  async getAll(_, res) {
    try {
      const data = await OrderRep.getAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
  async getbyid(req, res) {
    try {
      const id = req.params.id;
      const data = await OrderRep.getbyids(id);
      if (!data) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  async getbyuser(req, res) {
    try {
      const id = req.params.id;
      const data = await OrderRep.getbyuser(id);
      if (!data) {
        return res.status(404).json({ message: 'Order not found' });
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
      const orderDetailsData = req.body.Order_details;
      const newCategory = await OrderRep.createMany(orderData, orderDetailsData);
      res.status(201).json({
        message: 'Order created successfully',
        order: newCategory,
      });
    } catch (error) {
      // Xử lý lỗi và trả về thông báo lỗi
      console.error('Error creating Order:', error);
      res.status(500).json({
        error: error.message,
      });
    }
  }

  async update(req, res) {
    const id = req.body.id;
    const Data = req.body; // Dữ liệu cần cập nhật, gửi qua body của yêu cầu
    try {
      const updatedCategory = await OrderRep.update(id, Data);
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.body.id;
      const data = await OrderRep.delete(id);
      if (!data) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  async  searchAndPaginate(req, res) {
    try {
      const { keyword, page, pageSize}  = req.query;
      const { count, rows } = await OrderRep.searchAndPaginateOrder(keyword, page, pageSize);
      res.status(200).json({ count, rows });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
  
}


module.exports = new OrderController();
