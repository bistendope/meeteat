var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../models/user');

/* GET home page. */
router.post('/', function(req, res, next) {
  var user =  new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email
  });
  user.save(function(err, result){
      if(err){
          return res.status(500).json({
              title: "Une erreur est survenue",
              error: err
          });
      }
      res.status(201).json({
          message: "Utilisateur créé",
          obj: result
      });
  });
});

module.exports = router;
