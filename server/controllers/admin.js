const User = require('../models/user')
const Order = require('../models/order')

exports.orders = async (req, res) =>{
    let allorders = await Order.find({})
    .sort('-createdAt')
    .populate('products.product')
    .exec();

    res.json(allorders)
} 

exports.orderStatus = async (req, res) =>{
    const {orderId, orderStatus} = req.body;
    let updated = Order.findByIdAndUpdate(orderId, {orderStatus}, {new: true}).exec()
    res.json(updated)
}