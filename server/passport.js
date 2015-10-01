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
      db.model('User').fetchById({
        instagram_id: profile.id
      }).then(function(user) {
        if (!user) {
        // if user does not exist in our database
          var user = db.model('User').newUser({
            instagram_id: profile.id;
          }).save();
          return done(null, user);
        } else {
        // if user exists in our database
          return done(null, user);
        }
      }).catch(function(err) {
        console.err(err);
      });


    }
  ));
};
