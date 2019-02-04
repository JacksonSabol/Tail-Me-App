// Dependencies
var express = require("express");
var Cors = require('cors');
var passport = require('passport');

// var session = require('express-session');

// var bodyParser = require('body-parser');
var env = require('dotenv').load();
require('dotenv').config();
var PORT = process.env.PORT || 3001;

// Requiring our models for syncing
var db = require("./models");

// Requiring our routes
const routes = require("./routes");

// Sets up the Express App
var app = express();

// Handle Cross-origin resource sharing
app.use(Cors());
// Sets up the Express app to handle data parsing
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());

// For Passport authentication through Express-Session
// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport to use on the app
app.use(passport.initialize());

// Persistent login sessions
// app.use(passport.session());

// Load passport strategies
require("./config/passport/passport.js")(passport, db.auth);
// Import static directories
app.use(express.static("public"));

// Import routes
require("./routes/auth-routes.js")(app, passport);
app.use(routes);
//require("./routes/html-routes.js")(app);
//require("./routes/walker-api-routes.js")(app);
//require("./routes/owner-api-routes.js")(app);
//require("./routes/dog-api-routes.js")(app);
//require("./routes/walk-api-routes.js")(app);
//require("./routes/path-api-routes.js")(app);


// React stuff here to serve up static assets (usually on heroku)
// This is what worked for the Google Books project, it should be the same for this one
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: false }).then(function () { // Set to false after Auth table is initially made post deployment
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});