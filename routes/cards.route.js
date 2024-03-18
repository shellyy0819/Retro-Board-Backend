const express = require('express');
const router = express.Router();

const cardController = require('../controllers/card.controller.js');
const cardValidator = require('../validators/card.validator.js');

router.post('/', cardValidator.createCard, cardController.createCard);

module.exports = router;
