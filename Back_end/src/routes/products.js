// Dựa vào đoạn mã trong categories.js
const express = require('express');
const router = express.Router();
const productsController = require('../app/controller/productsController');
// Phải chắc chắn rằng bạn đang sử dụng một hàm callback cho phương thức get
router.get('/getall', productsController.getAll);
router.post('/create', productsController.create);
router.put('/update', productsController.update);
router.get('/getbyid', productsController.getbyid);
router.get('/delete', productsController.delete);
router.get('/search', productsController.searchAndPaginate);
module.exports = router;
