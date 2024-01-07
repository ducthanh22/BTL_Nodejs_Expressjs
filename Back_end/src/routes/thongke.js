
const express = require('express');
const router = express.Router();
const Controller = require('../app/controller/ThongkeController');

router.get('/Count', Controller.Thongke);
router.get('/getmonth', Controller.getMonthlyRevenue);


module.exports = router;
