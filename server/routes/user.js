const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
//controllers
const {
    userCart, 
    getUserCart, 
    emptyCart, 
    saveAddress, 
    createCashOrder, 
    orders, 
    addToWishlist, 
    wishlist, 
    removeFromWishlist,
    ExampleAbc
} = require("../controllers/user");

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress)
router.get('/user/orders', authCheck, orders)

router.post('/user/cash-order', authCheck, createCashOrder)


//wishlist
router.post('/user/wishlist', authCheck, addToWishlist)
router.get('/user/wishlist', authCheck, wishlist);
router.put('/user/wishlist/:productId', authCheck, removeFromWishlist);
router.get('/abc', ExampleAbc)


router.get("/user", (req, res) =>{
    res.json({
        data:"hey you hit user API endpoint"
    })
})

module.exports = router;