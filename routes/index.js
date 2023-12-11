const router = require('express').Router();
const userRouter = require('./users');
const { validateName, validateEmail, validatePassword } = require('../middlewares/validate');

const movieRouter = require('./movies');
const { auth } = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');
const { login, createUser } = require('../controllers/users');

router.post('/signin', validateEmail, validatePassword, login);
router.post('/signup', validateName, validateEmail, validatePassword, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => {
  const error = new NotFoundError('Страница по указанному маршруту не найдена');
  next(error);
});

module.exports = router;
