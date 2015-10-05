var express = require('express');
var passport = require('passport');
var Account = require('../../models/account');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/home', function(req, res, next) {
  res.render('', {title: 'Homepage'});
});


module.exports = router;
