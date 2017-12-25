'use strict';

const imdbApi = require('imdb-api'),
    logger = require('./logger'),
    _ = require('lodash'),
    constants = require('./consts');

module.exports.search = function (name, year) {
    if (_.isEmpty(name) || _.isEmpty(year)) {
        logger.error('Invalid search arguments - name: %s, year: %s ', name, year);
        return Promise.reject('Invalid search arguments');
    }
    return imdbApi.search({
        title: name,
        _year_data: year
    }, {
        apiKey: constants.OMDB_API_KEY
    })
};

module.exports.BuildGenresArray= function (movie) {
    return movie.genres ? movie.genres.split(/[ ,]+/) : [];
};