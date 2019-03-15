// Dependencies
var express = require("express");
var Cors = require('cors');
var passport = require('passport');

// var session = require('express-session');

// var bodyParser = require('body-parser');
// var env = require('dotenv').load();
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
app.use(express.urlencoded({ extended: false}));
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
// app.use(express.static("public"));
app.use(express.static("client/build"));
// Import routes
require("./routes/auth-routes.js")(app, passport);
require("./routes/mail-routes")(app);
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


//// CRON TAKSs


var cron = require("node-cron");

//// TEST sending console.log
// cron.schedule("* * * * *", function () {
//     console.log("running a task every minute");
// });

//// Sending SMS for reminders: every day start a task at 6pm that get all the walks for next day and send a reminder to the owners

cron.schedule("* 18 * * *", function () {
    console.log("Sending automatic reminders at: ", Date.now())
    // var sequelize = require("sequelize")
    const sequelize = require('sequelize');
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow_formatted = (tomorrow.toISOString().replace(/-/g, '').split('T')[0])

    db.walks
        .findAll({
            include: [{ association: 'dogOwner' }
            ],
            where: sequelize.where(sequelize.fn('date', sequelize.col('walkDate')), '=',   tomorrow_formatted)  
            })
        .then(dbModel => { prepareSMS(dbModel) })
        .catch(err => console.log(err))

    function prepareSMS(data) {

        for (let i = 0; i < data.length; i++) {

            console.log("WALKTIME: ", i, data[i].id, data[i].walkDate);
            let walk = {
                dogName: data[i].dogOwner.dogName,
                walkTime: data[i].walkDate,
                phoneNumber: data[i].dogOwner.emergencyContact
            }
           // sendReminders(walk)
        }
    }

    function sendReminders(walk) {
        console.log(walk)

        // TWILIO API

        require('dotenv').config();
       
        var id = process.env.TWILIO_ACCOUNT_SID;
        var secret = process.env.TWILIO_TOKEN;
        var phonefrom = process.env.TWILIO_PHONE_FROM;

        const client = require('twilio')(id, secret);

        var phoneNumber = walk.phoneNumber;
        var dogName = walk.dogName;
        var walkTime = walk.walkTime;
        var datenow = new Date();
        datenow.setDate(datenow.getDate());

        var reminder = "this is a reminder for " + dogName + " tomorrow at " + walkTime + " be ready for a fun walk. " + datenow;

        console.log(reminder)

        client.messages
            .create({
                body: reminder,
                from: phonefrom,
                to: phoneNumber
            })
            .then(message => {
                console.log(message.sid);
                //create a row in the  invitations pending table
                //res.json(res)
            })
            .done(console.log("sended"));
    }
})

//////// END CRON TASKs


// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: false}).then(function () { // Set to false after Auth table is initially made post deployment
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});