'use strict';

const manager = require('../managers/manager'),
    logger = require('../helpers/logger'),
    _ = require('lodash');

module.exports = {
    movie_get_by_name_year: function (req, res) {
        return manager.getWatchedMovie(req.params.movieName, req.params.year)
            .then(result => {
                return res.json(result);
            }).catch(error => {
                logger.error('Error was returned: %j', error);
                return res.status(_.get(error, "code", 500)).json(error);
            });
    },

    movie_put: function (req, res) {
        return manager.insertOrUpdateWatchedMovie(req.body.name, req.body.year, req.body.user_rating)
            .then(movie => {
                return res.json(movie).status(201);
            }).catch(error => {
                logger.error('Error was returned: %j', error);
                return res.status(_.get(error, "code", 500)).json(error);
            });
    },

    movie_get_all_watched: function (req, res) {
        return manager.getAllWatchedMovies()
            .then(list => {
                return res.json(list);
            }).catch(error => {
                logger.error('Error was returned: %j', error);
                return res.status(_.get(error, "code", 500)).json(error);
            });
    },

    movie_get_recommendation: function (req, res) {
        return manager.getMovieRecommendation(req.params.movieName, req.params.year)
            .then(movie => {
                return res.json(movie);
            }).catch(error => {
                logger.error('Error was returned: %j', error);
                return res.status(_.get(error, "code", 500)).json(error);
            });
    }
};