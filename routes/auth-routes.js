// Export our user Authorization routes
module.exports = function (app, passport) {
    // POST route to sign in and authorize an existing user using our local strategy 'local-signin'
    app.post("/user/signin", passport.authenticate('local-signin'), function (req, res) {
        // Upon successful signin and authentication, redirect to the user's profile page
        res.redirect('/'); // change to something like /user/<username>
    });
    
    // POST route to signup and authorize a new dog Walker using our local strategy 'local-signup'
    app.post('/walker/signup', passport.authenticate('local-signup'), function (req, res) {
        // Upon successful signup and authentication, redirect to the create profile page
        res.redirect('/walker/create');
    });

    // POST route to signup and authorize a new dog Owner using our local strategy 'local-signup'
    app.post('/owner/signup', passport.authenticate('local-signup'), function (req, res) {
        // Upon successful signup and authentication, redirect to the create profile page
        res.redirect('/owner/create');
    });

    // GET route to Logout user
    app.get("/user/logout", function (req, res) {
        // Since we designated the Express 'app' to use express-session, we can access its features when any instance of Express is defined
        // In this case, we 'destroy' the session to log a user out
        req.session.destroy(function (err) {
            // Log errors
            if (err) console.log(err)
            // Redirect to the home page after successfully logging out the user
            res.redirect('/');
        });
    });
}