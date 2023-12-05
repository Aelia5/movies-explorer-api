const router = require('express').Router();
const { validateName, validateEmail } = require('../middlewares/validate');

const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', validateName, validateEmail, updateUser);

module.exports = router;
