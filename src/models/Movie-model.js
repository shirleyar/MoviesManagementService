'use strict';

const imdbTool = require('../helpers/imdb-tool'),
    constants = require('../helpers/consts'),
    logger = require ('../helpers/logger'),
    _ = require('lodash');

module.exports = function (movie) {
    return imdbTool.search(_.get(movie, 'name'), _.get(movie, 'year'))
    .then((data) => {
        return Promise.resolve(_.pick({
            name: _.get(movie, 'name'),
            year: _.get(movie, 'name'),
            user_rating: _.get(movie, 'user_rating'),
            imdb_rating: _.get(data, constants.IMDB_RATRNG,constants.NOT_AVAILABLE),
            times_watched: _.get(movie, 'times_watched'),
            last_watched_on: _.get(movie,'last_watched_date'),
            genres: imdbTool.BuildGenresArray(data),
            imdb_url: _.get(data, constants.IMDB_MOVIE_URL, constants.NOT_AVAILABLE)
        }));
    }).catch((error)=> {
        logger.error('Error while contacting imdb api: %s', error);
        return Promise.reject(error);
    })

};