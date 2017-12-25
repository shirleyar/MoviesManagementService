'use strict';

const imdbTool = require('../helpers/imdb-tool'),
    constants = require('../helpers/consts'),
    logger = require ('../helpers/logger'),
    _ = require('lodash');

module.exports = function (name, year, user_rating, times_watched, last_watched_date) {
    return imdbTool.search(name, year)
    .then((data) => {
        return Promise.resolve(_.pick({
            name: name,
            year: year,
            user_rating: user_rating,
            imdb_rating: _.get(data, constants.IMDB_RATRNG,constants.NOT_AVAILABLE),
            times_watched: times_watched,
            last_watched_on: last_watched_date,
            genres: imdbTool.BuildGenresArray(data),
            imdb_url: _.get(data, constants.IMDB_MOVIE_URL, constants.NOT_AVAILABLE)
        }, _.identity));
    }).catch((error)=> {
        logger.error('Error while contacting imdb api: %s', error);
        return Promise.reject(error);
    })
};