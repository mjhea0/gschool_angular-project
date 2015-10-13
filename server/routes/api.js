var express = require('express');
var router = express.Router();
var passportGithub = require('../auth/github');

router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user, public_repo' ] }));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/', successRedirect: '/#/main' }),
  function(req, res) {
    // Successful authentication
    // console.log(req);
    res.json(req.user);
  });

module.exports = router;
