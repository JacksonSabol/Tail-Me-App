// Export our user Authorization routes
module.exports = function (app, passport) {
    // Import models
    var db = require("../models");
    // Import jsonwebtoke middleware
    const jwt = require('jsonwebtoken');
    // Import dotenv to access our JWT token key
    require('dotenv').config();

    // Use for all auth routes in the future to send custom error messages
    // https://stackoverflow.com/a/35455255/10503606

    // POST route to sign in and authorize an existing user using our local strategy 'local-signin'
    app.post("/user/signin", passport.authenticate('local-signin'), function (req, res) {
        // Upon successful signin and authentication, create a JWT and send it back with a message
        const token = jwt.sign({ id: req.user.id }, process.env.secret);
        res.status(200).send({
            auth: true,
            token: token,
            message: 'User logged in'
        });
    });

    // POST route to signup and authorize a new dog Walker using our local strategy 'local-signup'
    app.post('/walker/signup', passport.authenticate('local-signup'), function (req, res) {
        // Upon successful signup and authentication,  create a JWT and send it back with a message
        console.log(req.user);
        const token = jwt.sign({ id: req.user.id }, process.env.secret);
        res.status(200).send({
            auth: true,
            token: token,
            message: 'Dog-walking user authenticated'
        });
    });

    // POST route to signup and authorize a new dog Owner using our local strategy 'local-signup'
    app.post('/owner/signup', passport.authenticate('local-signup'), function (req, res) {
        // Upon successful signup and authentication, create a JWT and send it back with a message
        const token = jwt.sign({ id: req.user.id }, process.env.secret);
        res.status(200).send({
            auth: true,
            token: token,
            message: 'Dog-owning user authenticated'
        });
    });

    app.get('/authenticate', passport.authenticate('jwt', { session: false }), function (req, res) {
        if (req.user.username === req.query.username) {
            db.auth.findOne({
                where: {
                    username: req.query.username,
                },
            }).then(user => {
                if (user != null) {
                    console.log('user found in db from /authenticate');
                    res.status(200).send({
                        auth: true,
                        AuthID: user.id,
                        username: user.username,
                        password: user.password,
                        email: user.email,
                        message: 'user found in db',
                    });
                } else {
                    console.log('no user exists in db with that username');
                    res.status(401).send('no user exists in db with that username');
                }
            });
        } else {
            console.log('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    });

    app.get('/findUser', passport.authenticate('jwt', { session: false }), function (req, res) {
        if (req.user.username === req.query.username) {
            db.user.findOne({
                where: {
                    authId: req.user.id
                },
                include: [db.auth]
            }).then(user => {
                if (user != null) {
                    console.log('user found in db from /findUser');
                    res.status(200).send({
                        UserID: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userType: user.userType,
                        aboutMe: user.aboutMe,
                        address: user.address,
                        City: user.City,
                        State: user.State,
                        zipCode: user.zipCode,
                        country: user.country
                    });
                } else {
                    console.log('no user exists in db with that username');
                    res.status(401).send('no user exists in db with that username');
                }
            });
        } else {
            console.log('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    });
    // Find all walker information
    app.get('/findWalker', passport.authenticate('jwt', { session: false }), function (req, res) {
        if (req.user.username === req.query.username) {
            db.user.findOne({
                where: {
                    authId: req.user.id
                },
                include: [db.auth, db.walker]
            }).then(user => {
                if (user != null) {
                    console.log('user found in db from /findWalker');
                    console.log(user.walker.status);

                    res.status(200).send({
                        UserID: user.id,
                        email: user.auth.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userType: user.userType,
                        aboutMe: user.aboutMe,
                        address: user.address,
                        City: user.City,
                        State: user.State,
                        zipCode: user.zipCode,
                        country: user.country,
                        certification: user.walker.certification,
                        insurance: user.walker.insurance,
                        bond: user.walker.bond,
                        services: user.walker.services,
                        availibility: user.walker.status

                    });
                } else {
                    console.log('no user exists in db with that username');
                    res.status(401).send('no user exists in db with that username');
                }
            });
        } else {
            console.log('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    });
    // Find all owner information
    app.get('/findOwner', passport.authenticate('jwt', { session: false }), function (req, res) {
        if (req.user.username === req.query.username) {
            db.user.findOne({
                where: {
                    authId: req.user.id
                },
                include: [db.auth, db.dogOwner]
            }).then(user => {
                if (user != null) {
                    console.log('user found in db from /findOwner');
                    // console.log(user.dogOwner.dogName);
                    res.status(200).send({
                        UserID: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userType: user.userType,
                        aboutMe: user.aboutMe,
                        address: user.address,
                        City: user.City,
                        State: user.State,
                        zipCode: user.zipCode,
                        country: user.country
                    });
                } else {
                    console.log('no user exists in db with that username');
                    res.status(401).send('no user exists in db with that username');
                }
            });
        } else {
            console.log('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    });
    // Logout handled on front end
}