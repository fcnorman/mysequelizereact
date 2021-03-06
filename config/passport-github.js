const GitHubStrategy = require('passport-github').Strategy;
const models = require( '../models/index');
require('dotenv').config();


module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // from the user id, figure out who the user is...
  passport.deserializeUser(function(userId, done){
    models.User
      .find({ where: { id: userId } })
      .then(function(user){
        done(null, user);
      }).catch(function(err){
        done(err, null);
      });
  });


  passport.use(new GitHubStrategy({
      clientID: process.env.clientID,
      clientSecret: process.env.secret,
      // if the callback is set to 5000 the 0auth app will not work for some reason
      callbackURL: 'http://127.0.0.1:8000/api/users/auth/github/callback'
  
    },
    function(accessToken, refreshToken, profile, cb) {
        models.User
        .findOrCreate({
          where: {
            id: profile.id,
            username:profile.username
          }
        })
        .spread(function(user, created) {
          cb(null, user)
        });
      
      
    }
  ));
};

