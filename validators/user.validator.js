const { validateRequest } = require('../helpers/req-res.helper');
const Joi = require('joi');

const requestParamterTypes = {
  body: 'body',
  query: 'query',
  params: 'param'
};

const userSignIn = (req, res, next) => {
  const schema = Joi.object().keys({ email_id: Joi.string().required(), password: Joi.string().min(3).required() });

  validateRequest(req, res, next, schema, requestParamterTypes.body);
};

const userSignUp = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string(),
    email_id: Joi.string().required(),
    password: Joi.string().min(3).required()
  });

  validateRequest(req, res, next, schema, requestParamterTypes.body);
};

const userChangePasswordId = (req, res, next) => {
  const schema = Joi.object().keys({
    id: Joi.string().required()
  });

  validateRequest(req, res, next, schema, requestParamterTypes.param);
};

const userChangePassword = (req, res, next) => {
  const schema = Joi.object().keys({
    oldPassword: Joi.string().min(3).required(),
    newPassword: Joi.string().min(3).required(),
    confirmedPassword: Joi.string().min(3).required()
  });

  validateRequest(req, res, next, schema, requestParamterTypes.body);
};

const userForgetPassword = (req, res, next) => {
  const schema = Joi.object().keys({
    email_id: Joi.string().email().required(),
    newPassword: Joi.string().min(3).required(),
    confirmedPassword: Joi.string().min(3).required()
  });

  validateRequest(req, res, next, schema, requestParamterTypes.body);
};

module.exports = {
  userSignIn,
  userSignUp,
  userChangePassword,
  userForgetPassword,
  userChangePasswordId
};
