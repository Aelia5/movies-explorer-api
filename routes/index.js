const router = require('express').Router();
const userRouter = require('./users');
const { validateUser } = require('../utils/validate');
const { celebrate, Joi } = require('celebrate');


//const cardRouter = require('./cards');
//const { auth } = require('../middlewares/auth');

//const NotFoundError = require('../errors/not-found-err');
const { login, createUser } = require('../controllers/users');

// router.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().required().min(7),
//   }),
// }), login);
router.post('/signup', validateUser, createUser);
//router.use(auth);
router.use('/users', userRouter);
// router.use('/cards', cardRouter);
// router.use('*', (req, res, next) => {
//   const error = new NotFoundError('Такой путь не существует');
//   next(error);
// });

module.exports = router;
