const Joi = require('joi');
const { validateRequest } = require('../helpers/req-res.helper');

const requestParamterTypes = {
  body: 'body',
  query: 'query',
  params: 'param'
};

const createColumn = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    board_id: Joi.string().required()
  });

  validateRequest(req, res, next, schema, requestParamterTypes.body);
};

module.exports = { createColumn };
