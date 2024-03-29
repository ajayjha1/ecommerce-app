const express = require('express')

const router = express.Router();

//middleware
const { authCheck, adminCheck} = require("../middlewares/auth");
//controller
const {orders, orderStatus} = require("../controllers/admin");

//routes
router.get('/admin/orders', authCheck, adminCheck, orders);
router.put('/admin/order-status', authCheck, adminCheck, orderStatus);

module.exports = router;