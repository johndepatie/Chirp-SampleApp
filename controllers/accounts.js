var express = require('express');
var User = require('../models/users');

exports.signupForm = function(req, res) {
    res.render('accounts/new', { user: {}, errors: [] });
};

exports.create = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var newUser = new User({
      username: username,
      password: password
    });

    newUser.save(function(err) {
      if (err) {
          res.render('accounts/new', { user: newUser, errors: err.errors });
      } else {
          res.redirect('/');
          console.log('User saved successfully!');
      }

    });
};

exports.list = function(req, res) {

    User.find(function (err, users) {
        if (err) console.log(err)

        console.log(users)
        res.render('account/list', { accounts: users});
    });
}