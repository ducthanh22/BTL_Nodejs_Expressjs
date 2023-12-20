// Dựa vào đoạn mã trong categories.js
const express = require('express');
const router = express.Router();
const categoriesController = require('../app/controller/categoriesController');
// Phải chắc chắn rằng bạn đang sử dụng một hàm callback cho phương thức get
router.get('/getall', categoriesController.getAll);
router.post('/create', categoriesController.create);
router.put('/update', categoriesController.updateCategory);
router.get('/getbyid/:id', categoriesController.getbyid);
router.get('/delete/:id', categoriesController.delete);
router.get('/search', categoriesController.searchAndPaginate);
module.exports = router;
