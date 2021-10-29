const express = require('express');
const router = express.Router();

const aboutController = require('../controllers/AboutController.js');

router.get('/', aboutController.index);

module.exports = router;