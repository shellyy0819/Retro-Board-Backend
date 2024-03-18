const { validateRequest } = require('../helpers/req-res.helper');
const Joi = require('joi');

const requestParamterTypes = {
  body: 'body',
  query: 'query',
  params: 'param'
};

const getBoards = (req, res, next) => {
  const schema = Joi.object().keys({
    created_by: Joi.string().optional(),
    board_name: Joi.string().optional(),
    meeting_date: Joi.date().optional()
  });

  validateRequest(req, res, next, schema, requestParamterTypes.query);
};

const getBasicBoardData = (req, res, next) => {
  const schema = {};

  validateRequest(req, res, next, schema, requestParamterTypes.query);
};

const createBoard = (req, res, next) => {
  const schema = Joi.object().keys({
    team_id: Joi.string()
      .guid({
        version: ['uuidv4', 'uuidv5']
      })
      .required(),
    created_by: Joi.string().optional(),
    board_name: Joi.string().required(),
    meeting_date: Joi.date().optional()
  });

  validateRequest(req, res, next, schema, requestParamterTypes.body);
};

module.exports = { getBoards, createBoard, getBasicBoardData };
