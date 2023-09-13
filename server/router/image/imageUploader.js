const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');

router.post('/:type', uploadImage);

module.exports = router;