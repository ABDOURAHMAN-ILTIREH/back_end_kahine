const express = require("express");
const router = express.Router();

const {getUniqueUser,getAllUser,updateUser,deleteUser}  = require("../../controller/admin/adminAuthorize");
const {authenticateToken,authorizeAdmin} = require("../../middleware/authenticate");


router.use(authenticateToken, authorizeAdmin);

router.get("/all-user", getAllUser);
router.get("/single-user/:id", getUniqueUser);
router.put("/update-user/:id",updateUser)
router.delete("/delete-user/:id",deleteUser)

module.exports = router;
