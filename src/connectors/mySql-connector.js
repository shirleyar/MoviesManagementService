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
        timezone: 'local',
        dateStrings: true
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
            if (error) {
                logger.error('Error while querying DB: %j', error);
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}

function getMovie(name, year) {
    let prepared = mysql.format(queries.SELECT_MOVIE, [name, year]);
    return Promise.resolve(connection.query(prepared, (error, results, fields) => handleOutcome(error, results, fields)))
}

function insertOrUpdateMovie(name, year, user_rating, today) {
    let prepared = connection.query(queries.INSERT_UPDATE, [name, year, user_rating, 1, today, user_rating, today]);
    return connection.query(prepared, null, (error, results, fields) => handleOutcome(error, results, fields));
}

function handleOutcome(error, results, fields) {

}


module.exports = {
    connect,
    getAllMovies,
    getMovie,
    insertOrUpdateMovie
};