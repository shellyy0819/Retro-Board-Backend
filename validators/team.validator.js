const { validateRequest } = require('../helpers/req-res.helper');
const Joi = require('joi');

const requestParamterTypes = {
  body: 'body',
  query: 'query',
  params: 'param'
};

const teamCreation = (req, res, next) => {
  const schema = Joi.object().keys({ name: Joi.string().required() });

  validateRequest(req, res, next, schema, requestParamterTypes.body);
};

const getBoards = (req, res, next) => {
  const schema = Joi.object().keys({
    created_by: Joi.string().optional(),
    board_name: Joi.string().optional(),
    meeting_date: Joi.date().optional()
  });

  validateRequest(req, res, next, schema, requestParamterTypes.query);
};

const getSpecificBoard = (req, res, next) => {
  const schema = Joi.object().keys({
    team_id: Joi.string().guid().required(),
    board_id: Joi.string().guid().required()
  });

  validateRequest(req, res, next, schema, requestParamterTypes.params);
};

const updateTeamName = (req, res, next) => {
  const schema = Joi.object().keys({
    id: Joi.string().required()
  });

  validateRequest(req, res, next, schema, requestParamterTypes.params);
};

const requestTeamName = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required()
  });

  validateRequest(req, res, next, schema, requestParamterTypes.body);
};

module.exports = { teamCreation, getBoards, updateTeamName, requestTeamName, getSpecificBoard };
