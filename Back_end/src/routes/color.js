// Dựa vào đoạn mã trong categories.js
const express = require('express');
const router = express.Router();
const colorController = require('../app/controller/colorController');
// Phải chắc chắn rằng bạn đang sử dụng một hàm callback cho phương thức get
router.get('/getall', colorController.getAll);
router.post('/create', colorController.create);
router.put('/update', colorController.update);
router.get('/getbyid', colorController.getbyid);
router.get('/delete', colorController.delete);
router.get('/search', colorController.searchAndPaginate);
module.exports = router;
