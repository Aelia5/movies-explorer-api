const { celebrate, Joi } = require('celebrate');

module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(7),
  }),
});
