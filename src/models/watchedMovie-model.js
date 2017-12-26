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
    let today = new Date();// TODO:fix
    return mySqlConnector.insertOrUpdateMovie (name, year, user_rating, today)
        .catch(error => {
            logger.error("Error occurred while inserting or updating movie: %s", error);
            return Promise.reject(error);
        })
}

module.exports = {
    getMovie,
    getAllWatchedMovies,
    addOrUpdateMovie
};