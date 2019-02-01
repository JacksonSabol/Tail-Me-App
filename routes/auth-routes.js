// Export our user Authorization routes
module.exports = function (app, passport) {
    // POST route to sign in and authorize an existing user using our local strategy 'local-signin'
    app.post("/user/signin", passport.authenticate('local-signin'), function (req, res) {
        // Upon successful signin and authentication, redirect to the user's profile page
        res.status(200).send({ message: 'Logged In' });
    });
    
    // POST route to signup and authorize a new dog Walker using our local strategy 'local-signup'
    app.post('/walker/signup', passport.authenticate('local-signup'), function (req, res) {
        // Upon successful signup and authentication, send true and redirect client side
        res.status(200).send({ message: 'Walker created' });
    });

    // POST route to signup and authorize a new dog Owner using our local strategy 'local-signup'
    app.post('/owner/signup', passport.authenticate('local-signup'), function (req, res) {
        // Upon successful signup and authentication, send true and redirect client side
        res.json(true);
    });

    // GET route to Logout user
    app.get("/user/logout", function (req, res) {
        // Since we designated the Express 'app' to use express-session, we can access its features when any instance of Express is defined
        // In this case, we 'destroy' the session to log a user out
        req.session.destroy(function (err) {
            // Log errors
            if (err) console.log(err)
            // Redirect to the home page client-side after successfully logging out the user
            res.status(200).send({ message: 'User logged out' });
        });
    });
}