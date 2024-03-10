const express = require('express');
const router = express.Router();

const teamController = require('../controllers/team.controller.js');
const teamValidator = require('../validators/team.validator.js');

router.post('/', teamValidator.teamCreation, teamController.teamCreation);

module.exports = router;
