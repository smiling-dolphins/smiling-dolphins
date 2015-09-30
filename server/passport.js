var InstagramStrategy = require("passport-instagram").Strategy
var Auth = require("./auth.js");
var User = require("../db/models/user");

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
      });

      // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.fetchById(id, function(err, user) {
      done(err, user);
          });
      });
//Define Instagram Strategy
  passport.use(new InstagramStrategy({
    clientID: Auth.clientId,
    clientSecret: Auth.clientSecret,
    callbackURL: "http://localhost:8000/auth/instagram/callback"
    },
//____________________________________________________________________________
//If User isn't stored in our database, create a new user and store the Instagram ID in our database

    function(accessToken, refreshToken, profile, done) {
      User.fetchById({instagram_id: profile.id}), function (err, user) {
        if(err) {
          return done(err);
          }
        if(user) {
          return done(null, user);
          }
        else {
          var newUser = new User();
            newUser.username = profile.id;
            //newUser.token = token;
            newUser.save(function (err) {
              if(err)
                throw err;
              return done(null, newUser);
            })
          }
        }
      }));
    };
