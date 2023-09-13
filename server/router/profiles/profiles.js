const express = require("express");
const router = express.Router();

const {createUserProfile,updateProfileUser } = require("../../controller/profiles/profiles")
const { authenticateToken } = require("../../middleware/authenticate");
router.use(authenticateToken);

router.post("/createUserProfile", createUserProfile);
router.put("/updateUserProfile/:id", updateProfileUser);

module.exports = router
