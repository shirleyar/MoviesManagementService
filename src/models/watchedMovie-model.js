'use strict';

const logger = require('../helpers/logger'),
    _ = require('lodash'),
    mySqlConnector = require('../connectors/mySql-connector');

function getMovie(name, year) {
    return mySqlConnector.getMovie(name, year)
        .catch(error => {
            logger.error("Error occurred while getting movie: %s", error);
            return Promise.reject(error);
        });
}

function getAllWatchedMovies() {
    return mySqlConnector.getAllMovies()
        .catch(error=>{
            logger.error("Error while getting all watched movies: %j", error);
            return Promise.reject(error);
        })
}


function addOrUpdateMovie(name, year, user_rating) {
    let today = new Date().toDateString();// TODO:fix
    return getMovie(name, year)
        .then(movie => {
            if (_.isEmpty(movie)) {
                return insertMovie(name, year, user_rating, today);
            } else {
                return updateMovie(movie, user_rating, today);
            }
        })
}

function insertMovie(name, year, user_rating, date) {
    return mySqlConnector.insertMovie(name, year, user_rating, date)
        .catch(error => {
            logger.error("Error occurred while inserting movie: %s", error);
            return Promise.reject(error);
        });
}

function updateMovie(movie, date, user_rating) {
    return mySqlConnector.updateMovie(movie, user_rating || movie.user_rating, date)
        .catch(error => {
            logger.error("Error occurred while inserting movie: %s", error);
            return Promise.reject(error);
        });
}

module.exports = {
    getMovie,
    getAllWatchedMovies,
    addOrUpdateMovie
};