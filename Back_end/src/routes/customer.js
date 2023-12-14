// Dựa vào đoạn mã trong categories.js
const express = require('express');
const router = express.Router();
const Controller = require('../app/controller/customerController');
// Phải chắc chắn rằng bạn đang sử dụng một hàm callback cho phương thức get
router.get('/getall', Controller.getAll);
router.post('/create', Controller.create);
router.put('/update', Controller.update);
router.get('/getbyid', Controller.getbyid);
router.get('/delete', Controller.delete);
router.get('/search', Controller.searchAndPaginate);
module.exports = router;
