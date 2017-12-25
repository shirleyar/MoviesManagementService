'use strict';

const mysql = require('mysql'),
    queries = require('../helpers/mysql-queries'),
    constants = require('../helpers/consts'),
    format = require('util').format(),
    logger = require('../helpers/logger'),
    _ = require('lodash');

let connection;

function createConnection() {
    connection = mysql.createConnection({
        host: constants.MYSQL_HOST,
        user: constants.MYSQL_USER,
        password: constants.MYSQL_PASSWORD,
        database: constants.MYSQL_DATABASE,
        timezone: 'local',
        dateStrings:true
    });
}

function connect() {
    connection.connect(function (err) {
        if (err) {
            let errorMsg = format('Failed connecting to DB: ', err.toString());
            logger.error(errorMsg);
            throw new Error(format(errorMsg));
        }
        logger.info("MYSQL CONNECTED!");
    });
}

function getAllWatched(){}


app.get("/", function (req, res) {
    connection.query('SELECT * from sql11212380.Top_250_Movies LIMIT 2', function (err, rows, fields) {
        connection.end();
        if (!err)
            res.json({solution: rows.toString()});
        else
            res.json({error: "err"});
    });
});

