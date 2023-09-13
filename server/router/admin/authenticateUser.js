const express = require("express");
const router = express.Router();
const updateUser  = require("../../controller/admin/userAuthorize");
const {authenticateToken} = require("../../middleware/authenticate");


router.use(authenticateToken);
router.put("/update/:id", updateUser);

module.exports = router;