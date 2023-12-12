// Dựa vào đoạn mã trong categories.js
const express = require('express');
const router = express.Router();
const OrderController = require('../app/controller/orderController');
// Phải chắc chắn rằng bạn đang sử dụng một hàm callback cho phương thức get
router.get('/getall', OrderController.getAll);
router.post('/create', OrderController.create);
router.put('/update', OrderController.update);
router.get('/getbyid', OrderController.getbyid);
router.get('/delete', OrderController.delete);
router.get('/search', OrderController.searchAndPaginate);
module.exports = router;
