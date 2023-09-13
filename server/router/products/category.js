const express = require("express");
const router = express.Router();

const { getAllCategory,getSingleCategory,createNewCategory,deleteCategory,updateCategory,getCategoryByName } =  require("../../controller/produts/category")
const {authenticateToken,authorizeAdmin} = require("../../middleware/authenticate");

router.use(authenticateToken, authorizeAdmin);

router.get("/all-category", getAllCategory);
router.get("/single-category/:id", getSingleCategory);
router.get("/get-category-by-Name", getCategoryByName);
router.post("/create-new-category", createNewCategory);
router.put("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);

module.exports = router;