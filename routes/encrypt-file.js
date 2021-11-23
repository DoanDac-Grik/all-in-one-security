const express = require('express');
const router = express.Router();

const encryptFileController = require('../controllers/EncryptFileController');

router.get('/', encryptFileController.showEncryptFile);

module.exports = router;