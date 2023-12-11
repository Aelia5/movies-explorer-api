const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальное число символов: 2'],
    maxlength: [30, 'Максимальное число символов: 30'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Введён некорректный email.',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
