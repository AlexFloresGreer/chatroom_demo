var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//setting up ejs and views folder
app.set("views", path.join(__dirname,"./views"));
app.set("view engine", "ejs");

var server = app.listen(8000, function() {
  console.log("listening on port 8000")
});

var io = require('socket.io').listen(server);

var route = require('./routes/index.js')(app, server, io);
