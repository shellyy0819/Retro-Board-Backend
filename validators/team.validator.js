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

module.exports = { teamCreation, getBoards };
