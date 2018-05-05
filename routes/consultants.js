var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js')

/* GET ALL Users */
router.get('/', function(req, res, next) {

  User.find({"role_type" : "Consultant"}, function (err, users) {
    if (err) return next(err);

    if(users.length){
      res.render('consultants/index', {users: users});
    }else {
      res.json({message: 'No Consultant Found!'})
    }
  });
});

router.put('/update_status', function(req, res, next) {
  user_name = req.body.user_name;
  console.log("user_name = ", user_name);
  if(user_name) {
    var query = { user_name: user_name }
    var update_attributes = { "consultant_attributes.status" : "Approved" }
    User.update(query, update_attributes, function (err, result) {
      if (err) return next(err);

      if(result.ok){
        res.json({status: true, user: result});
      } else {
        res.json({status: false, message: "Approve Fail!"});
      }
    });
  } else {
    res.json({message: 'Please specify user_name', status: false})
  }
});

module.exports = router;