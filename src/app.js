// dummy code for poc sake

/* express app as a webtask */

var Express = require('express');
var Webtask = require('webtask-tools');

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'sql11.freesqldatabase.com',
    user     : 'sql11212380',
    password : 'ARJKJBntgp',
    database : 'sql11212380'
});
var app = Express();

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});

app.get("/",function(req,res){
    connection.query('SELECT * from sql11212380.Top_250_Movies LIMIT 2', function(err, rows, fields) {
        connection.end();
        if (!err)
            res.json({solution: rows.toString()});
        else
            res.json({error:"err"});
    });
});

// expose this express app as a webtask-compatible function

module.exports = Webtask.fromExpress(app);