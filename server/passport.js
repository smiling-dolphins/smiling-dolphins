var InstagramStrategy = require("passport-instagram").Strategy
var Auth = require("./auth.js");

require("../db/models/user");

module.exports = function (passport) {

//Places the user into a passport session if logged in
  passport.serializeUser(function(user, done) {
    done(null, user ? user.get('instagram_id') : false);
  });

//Attaches User Instagram Profile to every Req body from client;
  passport.deserializeUser(function(id, done) {
    db.model('User').fetchById({ instagram_id: id })
    .then(function(user) {
      done(null, user);
    })
    .catch(function(err){
      done(err, false);
    });
  });

//Define Instagram Passport Strategy
  passport.use(new InstagramStrategy({
    clientID: Auth.clientId,
    clientSecret: Auth.clientSecret,
    passReqToCallback: true,
    enabledProof: false,
    callbackURL: "http://127.0.0.1:8000/auth/instagram/callback"
  },

//If User isn't stored in our database, create a new user and store the Instagram ID in our database
//Called immediately after '/auth/instagram/callback'
  function(req, accessToken, refreshToken, profile, done) {
    db.model('User').fetchById({
      username: profile.username,
      instagram_id: profile.id
    }).then(function(user) {
      if (!user) {
      // if user does not exist in our database add them
        return db.model('User').newUser({
          username: profile.username,
          instagram_id: profile.id
        }).save();
      } else {
        console.log('Did we find something?', user);
        // if user exists in our database
        return user;
      }
    }).then(function(user) {
      console.log("this is profile:", profile);
      return user;
    }).then(function(user) {
      return done(null, user);
    }).catch(function(err) {
      console.err(err);
      return done(err, false);
    });
  }));
};
