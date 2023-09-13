const express = require("express");
const router = express.Router();


const  {createCartItems, deleteSingleCartItems,getCartItems} = require("../../controller/cart/cartItems");
const { authenticateToken } = require("../../middleware/authenticate");

router.use(authenticateToken);

router.get("/getAllCart", getCartItems);
router.post("/createCart", createCartItems);
// router.put("/updateCart/:id", updateCartItems);
router.delete("/deleteCart/:id", deleteSingleCartItems);

module.exports = router;