const express = require("express");
const router = express.Router();
const {update_Comment, create_Comment,delete_comment} = require("../../controller/comments/comments");


const {authenticateToken} = require("../../middleware/authenticate");
router.use(authenticateToken);

router.post("/create-new-comment", create_Comment);
router.put("/update-comment/:id", update_Comment);
router.delete("/delete-comment/:id", delete_comment);

module.exports = router;