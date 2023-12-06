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

module.exports.validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/https?:\/\/[a-z0-9\-_.]{1,30}\.[a-z0-9.]{2,6}[a-z0-9\-._~:?#[\]/@!$&*+,;=]{0,1000}/i),
    trailerLink: Joi.string().required().regex(/https?:\/\/[a-z0-9\-_.]{1,30}\.[a-z0-9.]{2,6}[a-z0-9\-._~:?#[\]/@!$&*+,;=]{0,1000}/i),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(/https?:\/\/[a-z0-9\-_.]{1,30}\.[a-z0-9.]{2,6}[a-z0-9\-._~:?#[\]/@!$&*+,;=]{0,1000}/i),
    movieId: Joi.number().required(),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});
