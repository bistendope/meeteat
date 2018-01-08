var express = require('express');
var router = express.Router();
var logger = require ('morgan');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var secretKey = 'MKhmKx5JYbf6Fb8AmviVDJZUNQMXmrrJ';
var User = require('../models/user');

router.get('/', function(req, res, next){
    User.find()
        .exec(function(err, users){
            if(err){
                return res.status(500).json({
                    title:'Une erreur est survenue (récupération des utilisateurs)',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Utilisateurs correctement récupérés',
                obj: users
            });
        });
}); 

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

router.post('/position', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    var update = { $set: { latitude: req.body.lat, longitude:req.body.lng}};
    User.findByIdAndUpdate(decoded.user._id, update, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'Une erreur est survenue...',
                error: err
            });
        }
        user.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'Une erreur est survenue...',
                    error: err
                });
            }
            
            res.status(201).json({
                message: 'Position de l\'utilisateur modifiée !',
                obj: result
            });
        });
    });
    
});

router.post('/signin', function(req, res, next){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'Une erreur est survenue (Identification échouée).',
                error: err
            });
        }
        if (!user){
            return res.status(401).json({
                title: 'Identification échouée',
                error: {message: 'Identifiants invalides'}
            });
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Identification échouée',
                error: {message: 'Identifiants invalides'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Identification réussie !',
            token: token,
            userId: user._id
        });
    });
});

module.exports = router;
