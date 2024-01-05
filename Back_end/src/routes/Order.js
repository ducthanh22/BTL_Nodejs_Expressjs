// Dựa vào đoạn mã trong categories.js
const express = require('express');
const router = express.Router();
const OrderController = require('../app/controller/orderController');
// Phải chắc chắn rằng bạn đang sử dụng một hàm callback cho phương thức get
router.get('/getall', OrderController.getAll);
router.post('/create', OrderController.create);
router.post('/update', OrderController.update);
router.get('/getbyid/:id', OrderController.getbyid);
router.get('/getbyuser/:id', OrderController.getbyuser);
router.get('/delete', OrderController.delete);
router.get('/search', OrderController.searchAndPaginate);
module.exports = router;
