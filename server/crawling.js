/**
 * Created by 1002625 on 2017-02-23.
 */

// load packages
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


// configure cross domain
var cors = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Credentials", "true");
    (req.method === "OPTIONS") ? res.send(200) : next();
};
app.use(cors);

// configure mongoose
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function() {
    console.log("Connected to mongod server");
});

// connect to mongodb server
mongoose.connect("mongodb://127.0.0.1/crawling");

// define model
var stock = require("./models/stock");

// configure app to use bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configure server port
var port = process.env.PORT || 8080;

// configure router
var router = require("./routes")(app, stock);

// run server
var server = app.listen(port, function() {
    console.log("express server has started on port " + port);
});

// crawling timer start
require("./crawling/timer").start();