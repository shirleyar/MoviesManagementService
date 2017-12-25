'use strict';

const sqliteConnector = require('../connectors/sqlite-connector'),
    logger = require('../helpers/logger'),
    constants = require('../helpers/consts'),
    _ = require('lodash'),
    imdbTool = require('../helpers/imdb-tool');

module.exports.getTopMovies = function () {
    let movies = [];
    let promiseArray;
    return sqliteConnector.getMovies(constants.TOP_MOVIES_NUM)
        .then((sqliteMovieList) => {
            promiseArray = sqliteMovieList.map(topMovie => {
                return imdbTool.search(topMovie.name, topMovie.year)
            });
            Promise.all(promiseArray)
                .then(resultsArray => {
                    resultsArray.forEach(imdbMovie =>
                        movies.push(buildTopMovie(sqliteMovieList, imdbMovie)))
                }).then(() => {
                return Promise.resolve(movies)
            }).catch(error=> {
                logger.error('Error occurred while building top movies list: %s', error);
                return Promise.reject(error);
            });
        });
};

function buildTopMovie(moviesList, imdbMovie) {
    let topMovie = _.find(moviesList, {name: imdbMovie.title});
    return {
        name: imdbMovie.title,
        year: imdbMovie._year_data,
        genres: imdbTool.BuildGenresArray(imdbMovie),
        rank: topMovie.rank
    }
}