const { celebrate, Joi } = require('celebrate');

module.exports.validateNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(7),
  }),
});

module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(7),
  }),
});
