const router = require('express').Router();
const userRouter = require('./users');
const { validateName, validateEmail, validatePassword } = require('../middlewares/validate');

//const cardRouter = require('./cards');
const { auth } = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');
const { login, createUser } = require('../controllers/users');

router.post('/signin', validateEmail, validatePassword, login);
router.post('/signup', validateName, validateEmail, validatePassword, createUser);
router.use(auth);
router.use('/users', userRouter);
// router.use('/cards', cardRouter);
router.use('*', (req, res, next) => {
  const error = new NotFoundError('Такой путь не существует');
  next(error);
});

module.exports = router;
