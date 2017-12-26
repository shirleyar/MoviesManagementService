'use strict';

module.exports = {
    INSERT_UPDATE: 'INSERT INTO sql11212380.Watched_Movies (name, year, user_rating, times_watched, date_last_watched) VALUES (?, ?, ?, ? ,?) ON DUPLICATE KEY UPDATE user_rating=?, times_watched=times_watched+1, date_last_watched= ?',
    SELECT_MOVIE: 'SELECT * FROM sql11212380.Watched_Movies WHERE name LIKE ? AND year = ?;',
    SELECT_ALL: "SELECT * FROM sql11212380.Watched_Movies;"
};