'use strict';

const mysql = require('mysql'),
    queries = require('../helpers/mysql-queries'),
    constants = require('../helpers/consts'),
    logger = require('../helpers/logger');

let connection;

function createConnection() {
    connection = mysql.createConnection({
        host: constants.MYSQL_HOST,
        user: constants.MYSQL_USER,
        password: constants.MYSQL_PASSWORD,
        database: constants.MYSQL_DATABASE,
    });
}

function connect() {
    try {
        createConnection();
        connection.connect();
        logger.info("MYSQL CONNECTED!");

        return Promise.resolve();
    } catch (error) {
        logger.error('Failed connecting to MySql: %j', error);
        return Promise.reject(error);
    }
}

function getAllMovies() {
    return new Promise((resolve, reject) => {
        return connection.query(queries.SELECT_ALL, (error, results, fields) => {
            handleResult(resolve, reject, error, results);
        })
    })
}

function getMovie(name, year) {
    return new Promise((resolve, reject) => {
        let prepared = mysql.format(queries.SELECT_MOVIE, [name, year]);
        return connection.query(prepared, function (error, results, fields) {
            handleResult(resolve, reject, error, results);
        })
    })
}

function insertOrUpdateMovie(name, year, user_rating) {
    return new Promise((resolve, reject) => {
        try {
            let now = new Date();
            let prepared = connection.query(queries.INSERT_UPDATE, [name, year, user_rating, 1, now, user_rating, now]);
            return connection.query(prepared, function (error, results, fields) {
                handleResult(resolve, reject, error, results);
            })
        } catch (error) {
            logger.error('Error while querying DB: %j', error);
            reject(error);
        }
    })
}

function handleResult(resolve, reject, error, results) {
    if (error) {
        logger.error('Error while querying DB: %j', error);
        reject(error);
    } else {
        resolve(results);
    }
}

module.exports = {
    connect,
    getAllMovies,
    getMovie,
    insertOrUpdateMovie
};