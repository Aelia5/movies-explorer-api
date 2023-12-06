const Movie = require('../models/movie');

const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const {
  validationErrorMessage,
} = require('../utils/constants');

const notFoundMessage = 'Такого фильма не существует';
const forbiddenMessage = 'Вы не можете удалить чужой фильм';

const { SUCCESS_CODE } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({}).populate('owner')
    .then((movies) => res.send(movies.reverse()))
    .catch((err) => {
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  }).then((movie) => Movie.findById(movie._id).populate('owner'))
    .then((movie) => res.status(SUCCESS_CODE).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(validationErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(notFoundMessage);
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenMessage);
      } else {
        Movie.findByIdAndDelete(movie._id)
          .then(() => res.send(movie))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(validationErrorMessage));
      } else {
        next(err);
      }
    });
};
