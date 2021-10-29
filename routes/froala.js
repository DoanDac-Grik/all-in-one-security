const express = require('express');
const router = express.Router();

const froalaEditorController = require('../controllers/FroalaEditorController.js');

router.post('/', froalaEditorController.uploadImage);

module.exports = router;