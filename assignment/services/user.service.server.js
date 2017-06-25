var app=require('../../express');
var userModel=require('../model/user/user.model.server');
var bcrypt = require("bcrypt-nodejs");
var passport=require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new LocalStrategy(localStrategy));
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
/*var googleConfig = {
    clientID     : '954054378440-f76pqaib389fbd9i50l9k0mho2uov866.apps.googleusercontent.com',
    clientSecret : 'OyZssJHhvwB6vhJPqBOCf7ag',
    callbackURL  : 'http://localhost:4000/auth/google/callback'
};*/
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

app.get ('/api/user/:userId', findUserById);
app.put ('/api/user/:userId', updateUser);
app.get ('/api/user', findUser);
app.post ('/api/user', createUser);
app.delete ('/api/user/:userId', deleteUser);

app.post  ('/api/login', passport.authenticate('local'), login);
app.post  ('/api/logout', logout);
app.get('/api/loggedin', loggedIn);
app.post('/api/register', register);
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));

function register(req,res) {
    var userObj=req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUser(userObj)
        .then(function (user) {
            req.login(user ,function (status) {
                    res.send(status);
                });
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function loggedIn(req, res) {
    console.log(req.user);
    if(req.isAuthenticated())
    {
        res.json(req.user);
    }
    else
    {
        res.send('0');
    }
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password))
            {
                done(null, user);
            }
            else
            {
                done(null, false);
            }
        }, function (error) {
            done(null, false);
        });
}

function login(req, res) {
    res.json(req.user);
}


function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel.findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function () {
            res.json(null);
        });
    /*for(var u in users) {
        if(users[u]._id === userId) {
            res.json(users[u]);
            return;
        }
    }
    res.json(null);*/
}

function updateUser(req, res) {
    var user=req.body;
    var userId=req.params.userId;
    /*for(var u in users)
    {
        if(users[u]._id===req.params.userId)
        {
            users[u]=user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);*/
    userModel.updateUser(userId,user)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteUser(req, res) {
    var userId=req.params.userId;
    /*var ind=null;
    for(var u in users)
    {
        if(users[u]._id===req.params.userId)
        {
            ind=u;
        }
    }
    if(ind!==null)
    {
        users.splice(u,1);
        res.sendStatus(200);
        return;
    }
    else
    {
        res.sendStatus(404);
    }*/
    userModel.deleteUser(userId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function createUser(req, res) {
    var user=req.body;
    userModel.createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
    // user._id=(new Date().getTime()) + "";
    // users.push(user);
    // res.json(user);
}

function findUser(req, res) {
    var username=req.query.username;
    var password=req.query.password;
    if(password && username)
    {
        findUserByCredentials(req, res);
    }
    else if(username)
    {
        findUserByUsername(req, res);
    }
}

function findUserByCredentials(req, res) {
   var username=req.query.username;
   var password=req.query.password;
   /*for(var u in users)
    {
        if(users[u].username===username && users[u].password===password)
        {
            res.json(users[u]);
            return;
        }
    }
    res.json(null);*/
   userModel.findUserByCredentials(username, password)
       .then(function (user) {
           res.json(user);
       }, function (err) {
           res.json(null);
       })
}

function findUserByUsername(req, res) {
    var username=req.query.username;
    /*for(var u in users)
    {
        if(users[u].username===username)
        {
            res.json(users[u]);
            return;
        }
    }
    res.json(null);*/
    userModel.findUserByUsername(username)
        .then(function (user) {
            res.json(user);
        }, function () {
            res.json(null);
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  email,
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}