'use strict';

module.exports = {
    INSERT_TOP_250: "INSERT INTO ?.Top_250_Movies (`rating_imdb`, `name`, `year`) VALUES (?, ?, ?);",
    // SELECT_TOP_250_BY_NAME_YEAR: ,
    // SELECT_TOP_250_ALL: ,

    INSERT_GENRES: "INSERT INTO `?`.`Genres` (`genre_id`, `genre_name`) VALUES (NULL, NULL);"

};