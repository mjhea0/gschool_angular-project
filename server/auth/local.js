var passport = require('passport');
var localStrategy = require('passport-local');
var User = require('../models/user');

passport.use(new LocalStrategy({
  session: true
},
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, {id: user.id});
    });
  }
));
