'use strict';

const sqlite3 = require('sqlite3').verbose(),
    constants = require('../helpers/consts'),
    queries = require('../helpers/sqlite-queries'),
    logger = require('../helpers/logger'),
    _ = require('lodash');

module.exports.getMovies = function (numTops) {
    let db = new sqlite3.Database(constants.SQLITE_DIR);
    db.all(queries.SELECT_ALL, function (err, rows) {
        if (err) {
            logger.error("Error during querying Sqlite database: %j", err);
            return Promise.reject(error);
        } else {
            return Promise.resolve(_.take(rows, numTops));
        }
    })
};