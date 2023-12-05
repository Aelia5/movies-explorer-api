const { celebrate, Joi } = require('celebrate');

module.exports.validateName = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

module.exports.validateEmail = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }).unknown(true),
});

module.exports.validatePassword = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(7),
  }).unknown(true),
});
