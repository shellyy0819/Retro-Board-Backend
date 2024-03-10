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

module.exports = { teamCreation };
