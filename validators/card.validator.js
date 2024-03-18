const Joi = require('joi');
const { validateRequest } = require('../helpers/req-res.helper');

const requestParamterTypes = {
  body: 'body',
  query: 'query',
  params: 'param'
};

const createCard = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    board_id: Joi.string().required(),
    column_id: Joi.string().required(),
    order_no: Joi.number().required()
  });

  validateRequest(req, res, next, schema, requestParamterTypes.body);
};

module.exports = { createCard };
