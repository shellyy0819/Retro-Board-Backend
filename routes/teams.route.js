const express = require('express');
const router = express.Router();

const teamController = require('../controllers/team.controller.js');
const teamValidator = require('../validators/team.validator.js');

router.post('/', teamValidator.teamCreation, teamController.teamCreation);
router.put('/:id', teamValidator.updateTeamName, teamValidator.requestTeamName, teamController.updateTeamName);
router.get('/:id/boards', teamValidator.getBoards, teamController.getAllBoardsData);
router.get('/:team_id/boards/:board_id', teamValidator.getSpecificBoard, teamController.getSpecificBoardData);

module.exports = router;
