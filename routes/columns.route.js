const express = require('express');
const router = express.Router();

const columnController = require('../controllers/column.controller.js');
const columnValidator = require('../validators/column.validator.js');

router.post('/', columnValidator.createColumn, columnController.createColumn);

module.exports = router;
