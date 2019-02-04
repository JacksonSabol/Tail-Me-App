// Import bCrypt for encrypting and decrypting passwords
var bCrypt = require('bcrypt-nodejs');
// Import Sequelize to use operators (and/or/etc to allow user to enter username OR email when signing in)
var Sequelize = require('sequelize');
// Assign variable to hold Sequelize operators
const Op = Sequelize.Op;

// Export local strategies, passing "Passport" module and the user "Auth" table from server.js
module.exports = function (passport, auth) {
    // Assign a variable to point to the Sequelize "Auth" table
    var Auth = auth;
    // Import Local "Strategy" constructor from "passport-local" module
    var LocalStrategy = require('passport-local').Strategy;
    // Tell passport to use a new LocalStrategy called "local-signup"
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'username', // Setting the authenticating username to be the inputted username
            passwordField: 'password', // Setting the authenticating password to be the inputted password
            passReqToCallback: true, // Pass the entire request to the callback function so we can encrypt the password and add an entry into the Sequelize table
            session: false // Make sure Passport doesn't use session storage, as we'll be setting JWT to local storage client side

        }, function (req, username, password, done) {
            // Assign a function to encrypt the user's password
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            }
            // Check the Auth table for an entry matching the user-inputted username
            Auth.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                // If an entry is found, the username is already taken, i.e. the user already has an account
                if (user) {
                    return done(null, false,
                        {
                            message: 'That username is already taken.'
                        });
                }
                // Otherwise, the user does not have an account, so make a new one
                else {
                    // Encrypt the user's password using the bCrypt helper function
                    var userPassword = generateHash(password);
                    // Assign a variable to hold the user's authentication information
                    var data = {
                        username: username,
                        password: userPassword,
                        email: req.body.email
                    };
                    // Create a row in the Auth table with the user's information
                    Auth.create(data).then(function (newUser, created) {
                        // If the row was not successfully added to the Auth table
                        if (!newUser) {
                            // Return error: null and user: false
                            return done(null, false,
                                {
                                    message: 'Our servers are under a heavy load right now. Please try again in a moment.'
                                });
                        }
                        // Otherwise, return error: null and the newUser
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));
    // Tell passport to use a new LocalStrategy called "local-signin"
    passport.use('local-signin', new LocalStrategy(
        {
            // By default, Passport LocalStrategy uses a username and a password
            usernameField: 'username', // Setting the authenticating username to be the inputted username
            passwordField: 'password', // Setting the authenticating password to be the inputted password
            passReqToCallback: true, // Pass the entire request to the callback function to compare username/password to those stored in the Auth table
            session: false // Make sure Passport doesn't use session storage, as we'll be setting JWT to local storage client side
        },
        function (req, username, password, done) {
            // Define a function to compare two passwords - user entered password and password stored in the Auth table
            var isValidPassword = function (userpass, password) {
                // Use bCrypt method to compare the two passwords - returns 'true' or 'false'
                return bCrypt.compareSync(password, userpass);
            }
            // Check the Auth table for an entry matching the user-inputted username
            Auth.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                // If no entry matches the user-inputted username
                if (!user) {
                    // Return error: null, user: false
                    return done(null, false, {
                        message: 'Username does not exist in our database'
                    });
                }
                // If the user-inputted password does not match the password from the Auth table
                if (!isValidPassword(user.password, password)) {
                    // Return error: null, user: false
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                // Otherwise, update last_login time
                user
                    .update({
                        last_login: Date.now()
                    })
                    .then(function (user) {
                        // Assign a variable to point to the user information
                        var userInfo = user.get();
                        // Return error: null and the authenticated user information
                        return done(null, userInfo);
                        // Catch any errors
                    }).catch(function (err) {
                        // Return error: null, user: false
                        return done(null, false,
                            {
                                message: 'Our servers are under a heavy load right now. Please try again in a moment.'
                            });
                    });
            });
        }
    ));
    // Import JSON Web Token strategies from passport-jwt
    const JWTstrategy = require('passport-jwt').Strategy;
    const ExtractJWT = require('passport-jwt').ExtractJwt;
    // Import dotenv for JWT key
    require('dotenv').config();
    // Define options for JWT to extract from Auth Header using secret key
    const opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: process.env.secret
    };
    passport.use('jwt', new JWTstrategy(opts, (jwt_payload, done) => {
        try {
            Auth.findOne({
                where: {
                    id: jwt_payload.id,
                },
            }).then(user => {
                if (user) {
                    console.log('user found in db in passport');
                    done(null, user);
                } else {
                    console.log('user not found in db');
                    done(null, false,
                        {
                            message: 'Username does not exist in our database'
                        });
                }
            });
        } catch (err) {
            done(err);
        }
    }),
    );
    // Save the user id (the second argument of the done function) in a session
    // It is later used to retrieve the whole object via the deserializeUser function
    passport.serializeUser(function (auth, done) {
        done(null, auth.id);
    });

    // Retrieve the user id from the stored session
    passport.deserializeUser(function (id, done) {
        // Check the Auth table for a matching user id and pass the user information into the parameter of the callback function
        Auth.findById(id).then(function (user) {
            // If the user is found on the Auth table
            if (user) {
                // Return error: null, and the user's authentication information
                done(null, user.get());
            }
            // Otherwise, the user's id was not found, or the session was destroyed
            else {
                // Return the specific error, user: null
                done(user.errors, null);
            }
        });
    });
}