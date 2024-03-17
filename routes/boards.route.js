const express = require('express');
const router = express.Router();

const boardController = require('../controllers/board.controller.js');
const boardValidator = require('../validators/board.validator.js');

router.get('/', boardValidator.getBoards, boardController.getAllRetroBoards);
router.get('/basic-board-data', boardValidator.getBoards, boardController.getBoardBasicData);
router.post('/', boardValidator.createBoard, boardController.createBoard);

module.exports = router;
