var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chirp' });

  /* Throws user data from the database. Literally never actually do this
  User.find(function (err, users){
    if (err) console.log(err)

    res.render('accounts/list', { accounts: users })
  });*/
  
});

module.exports = router;
