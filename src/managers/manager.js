'use strict';

const movieModel = require('../models/Movie-model'),
    Promise = require('bluebird'),
    watchedMovieModel = require('../models/watchedMovie-model'),
    imdbTool = require('../helpers/imdb-tool'),
    movieRecommendationTool = require('../models/MovieReccommendationEngine'),
    logger = require('../helpers/logger'),
    format = require('util').format;

function insertOrUpdateWatchedMovie(name, year, user_rating) {
    return watchedMovieModel.addOrUpdateMovie(name, year, user_rating)
        .then(() => {
            return watchedMovieModel.getMovie(name, year);
        }).then(movie => {
            logger.info("Movie data was stored");
            return Promise.resolve(movieModel(movie.name, movie.year, movie.user_rating, movie.times_watched, movie.date_last_watched));
        }).catch(error => {
            logger.error("Error getting stored movie: %j", error);
            return Promise.reject(errorBuilder(500, "Internal Error", "Error while saving movie"));
        })
}

function getAllWatchedMovies() {
    let movies =[];
    let promiseArray =[];
    return watchedMovieModel.getAllWatchedMovies()
        .then(watchedMovies => {
            watchedMovies.forEach(watchedMovie=>{
               promiseArray.push(movieModel(watchedMovie))
            });
            return Promise.all(promiseArray)
        }).then(results=>{
                    console.log(results);
                })
                .catch(error => {
                    logger.error("Error occurred while getting all watched movies: %j", error);
                    return Promise.reject(errorBuilder(500, "Internal Error", "Error while getting all watched movies"))
                });
        }

function getWatchedMovie(name, year) {
    return watchedMovieModel.getMovie(name, year)
        .then(watchedMovie => {
            return movieModel(watchedMovie.name, watchedMovie.year, watchedMovie.user_rating, watchedMovie.times_watched, watchedMovie.date_last_watched)
        }).catch(error => {
            logger.error("Error occurred while getting movie by name '%s' and year %s: %j", name, year, error);
            return Promise.reject(errorBuilder(500, "Internal Error", "Error while getting watched movie '%s' of year %s", name, year));
        });
}

function getMovieRecommendation(name, year) {
    return watchedMovieModel.getMovie(name, year)
        .then(watchedMovie => {
            if (_.isEmpty(watchedMovie)) {
                return Promise.reject('Movie not watched - go watch it first');
            }
            return imdbTool(watchedMovie.name, watchedMovie.year)
        }).then(imdbMovie => {
            return movieRecommendationTool(imdbMovie)
        }).catch(error => {
            logger.error("Error while getting movie recommendation upon movie '%s' of year '%s'", name, year);
            if (error === 'Movie not watched - go watch it first') {
                return Promise.reject(errorBuilder(400, 'Bad Request', error));
            } else {
                return Promise.reject(errorBuilder(500, 'Internal Error', format("Error while getting movie recommendation upon movie '%s' of year '%s'", name, year)))
            }
        })
}

function errorBuilder(code, message, details) {
    return _.pickBy({
        error: code,
        message: message,
        details: details
    });
}

module.exports = {
    insertOrUpdateWatchedMovie,
    getAllWatchedMovies,
    getMovieRecommendation,
    getWatchedMovie
};