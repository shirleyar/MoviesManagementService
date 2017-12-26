'use strict';

module.exports = {
    // general
    APP_NAME: 'Movie Management Service',

    // movie model
    NOT_AVAILABLE: "N/A",

    // imdb api
    IMDB_MOVIE_URL: "imdburl",
    IMDB_GENRES: "genres",
    IMDB_RATRNG: "rating",

    // top movies model
    TOP_MOVIES_NUM: 100,

    // should be env variables
    OMDB_API_KEY: '334476d3',
    MYSQL_HOST: 'sql11.freesqldatabase.com',
    MYSQL_USER: 'sql11212380',
    MYSQL_PASSWORD: 'ARJKJBntgp',
    MYSQL_DATABASE: 'sql11212380',
    SQLITE_DIR: '../../resources/imdb-top-250.sqlite',

    // recommendation engine
    NOT_FOUND_INDEX: -1,
};