'use strict';

const topImdbMoviesModel = require('../models/topImdbMovie-model'),
    watchedMovieModel = require('../models/watchedMovie-model'),
    logger = require('../helpers/logger'),
    _ = require('lodash'),
    allSubsets = require('all-subsets'),
    constants = require('../helpers/consts');

module.exports = function (movie) {
    let genres = movie.genres;
    let relevantMovies;
    let topMovies, watchedMovies;
    return Promise.all([
        topImdbMoviesModel.getTopMovies(),
        watchedMovieModel.getAllWatchedMovies()
    ]).then(results => {
        topMovies = results[0];
        watchedMovies = results[1];
        return pickMostRelevantUnwatchedMovie(relevantMovies, watchedMovies, genres)
    }).catch(error => {
        logger.error("Error while looking for recommendation: %j", error);
        return Promise.reject(error);
    })
};

function pickMostRelevantUnwatchedMovie(topMovies, watchedMovies, genres) {
    let genresSubsets = getGenresSubsets(genres);
        genresSubsets.forEach(genresSet => {
        topMovies.forEach(topMovie => {
            if (isRelevantMovie(genresSet, topMovie) && isUnwatched(topMovie, watchedMovies)) {
                return Promise.resolve(topMovie)
            }
        })
    });
    return Promise.resolve({});
}

function getGenresSubsets(genres) {
    let subsets = allSubsets(genres);
    _.reverse(_.sortBy(subsets, [function (subset) {
        return subset.length
    }])).pop();
    return subsets;
}

function isRelevantMovie(genres, movie) {
    genres.forEach(genre=>{
        if (!_.includes(movie.genres, genre)){
            return false;
        }
    });
    return true;
}

function isUnwatched(movie, watchedMovies) {
    let movieIndex = _.pickBy(watchedMovies, {name: movie.name, year: movie.year});
    return movieIndex === constants.NOT_FOUND_INDEX;
}