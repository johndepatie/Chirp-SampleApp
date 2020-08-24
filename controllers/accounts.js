var express = require('express');
var User = require('../models/users');
var validate = require("validate.js");

exports.signupForm = function(req, res) {
    res.render('accounts/new');
};

exports.create = function(req, res) {
    var username = req.body.email;
    var password = req.body.password;

    var newUser = new User({
        username: username,
        password: password
    });

    newUser.save(function(err) {
        if (err) throw err;

        console.log('User saved succesfully!');
    });

    res.redirect('/');
};

exports.list = function(req, res) {

    User.find(function (err, users) {
        if (err) console.log(err)

        console.log(users)
        res.render('account/list', { accounts: users});
    });
}