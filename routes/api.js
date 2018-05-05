var express = require('express');
var app = express();
var router = express.Router();
var User = require('../models/User.js')

router.get('/consultants/:status', function(req, res, next) {
  status = req.params.status;
  if(status) {
    status = status.charAt(0).toUpperCase() + status.slice(1);
    User.find({"consultant_attributes.status" : status}, function (err, users) {
      if (err) return next(err);
      // res.render('consultants/index', {users: users});
      res.json({users: users});
    });
  } else {
    res.json({message: 'No Consultant Found!', status: false})
  }
});


router.post('/users/login', function(req, res) {
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

module.exports = router;