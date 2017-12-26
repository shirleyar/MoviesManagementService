'use strict';

const Express = require('express'),
    Webtask = require('webtask-tools'),
    bodyParser = require('body-parser'),
    app = Express(),
    mysqlConnector = require('./connectors/mySql-connector'),
    controller = require('./controllers/controller'),
    logger = require('./helpers/logger');

app.use(bodyParser.json());

mysqlConnector.connect()
    .then(() => {
        app.get("/movie/:movieName/year/:year", (req, res) => controller.movie_get_by_name_year(req, res));

        //removed endoint due to limitations
        // app.put("/movie", (req, res) => controller.movie_put(req, res));

        app.get("/movies", (req, res) => controller.movie_get_all_watched(req, res));

        app.get("/movie/:movieName/year/:year/recommendation", (req, res) => controller.movie_get_recommendation(req, res));

        // should add here a no method and wrong path handlers

        logger.info("App is ready");
    }).catch(error => {
    logger.error("Error during initialization: %j", error);
});

// app.listen(3000);

module.exports = Webtask.fromExpress(app);
// module.exports = app;