const express = require("express");
const router = express.Router();
const {getAllProducts, getsingleProducts, createNewProducts, updateProducts, deleteProducts}  = require("../../controller/produts/product");
const {authenticateToken,authorizeAdmin} = require("../../middleware/authenticate");

router.use(authenticateToken, authorizeAdmin);

router.get("/all-product", getAllProducts);
router.get("/single-product/:id", getsingleProducts);
router.post("/create-new-product", createNewProducts);
router.put("/update-product/:id", updateProducts);
router.delete("/delete-product/:id", deleteProducts);

module.exports = router;