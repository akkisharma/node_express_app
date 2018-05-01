var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js')

/* GET ALL Users */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.render('users/index', {users: users});
  });
});

router.post('/login', function(req, res) {
  console.log("req.body = ", req.body);
  if(!req.body.user_name || !req.body.password){
    res.json({message: "Please enter both username and password"});
  } else {
    User.findOne({user_name: req.body.user_name}, function(err, user) {
      if (err) return next(err)
      else
        if(user && user.password === req.body.password){
          res.json({message: 'Login successful.', status: true});
        }
      res.json({message: "Invalid Credentails!", status: false});
    });
  }
});


/* GET SINGLE User BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE User */
router.post('/', function(req, res, next) {

  if(!req.body)
    req.json({message: "Inadequate parameters", status: false});
  else {
    user_params = assignAttributes(req.body)
    User.create(user_params, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  }
});

/* UPDATE User */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE User */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

function assignAttributes(params) {
  response_object = params;
  if(response_object.role_type == 'Consultant') {
    response_object.consultant_attributes.status = 'Pending';
  }
  else{
    // set user specific params here
  }
  return response_object
}

module.exports = router;