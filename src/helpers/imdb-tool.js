'use strict';

const imdbApi = require('imdb-api'),
    logger = require('./logger'),
    _ = require('lodash'),
    constants = require('./consts');

module.exports.search = function (name,year) {
    if (_.isEmpty(name)) {
        logger.error('Invalid search arguments - name: %s', name);
        return Promise.reject('Invalid search arguments');
    }
    return imdbApi.search({
        title: name,
    }, {
        apiKey: constants.OMDB_API_KEY
    }).then(movies=>{
        let movie = _.find(movies.results, movie => {return movie.year === year});
        return Promise.resolve(movie || {});
    }).catch(error=>{
        logger.error("Error getting movie from imdb: %j". error);
        return Promise.reject(error);
    })
};

module.exports.BuildGenresArray= function (movie) {
    return movie.genres ? movie.genres.split(/[ ,]+/) : [];
};