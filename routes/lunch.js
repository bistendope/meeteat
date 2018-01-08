var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var secretKey = 'MKhmKx5JYbf6Fb8AmviVDJZUNQMXmrrJ';

var User = require('../models/user');
var Lunch = require('../models/lunch');

router.get('/', function(req, res, next){
    Lunch.find()
    .populate('userHost')
        .exec(function(err, lunches){
            if(err){
                return res.status(500).json({
                    title:'Une erreur est survenue (récupération des repas)',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Repas correctement récupérés',
                obj: lunches
            });
        });
}); 

router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decoded){
        if(err){
            return res.status(401).json({
                title:' Non authentifié',
                error: err
            });
        }
        next();
    })
});

router.post('/', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'Une erreur est survenue...',
                error: err
            });
        }
        var lunch = new Lunch({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            locationName: req.body.locationName,
            userHost: user._id,
            remainingPlaces: req.body.remainingPlaces,
            userHostName: user.firstName
            
        });
        lunch.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'Une erreur est survenue...',
                    error: err
                });
            }
            user.lunches.push(result._id);
            user.save();
            
            res.status(201).json({
                message: 'Repas ajouté !',
                obj: result
            });
        });
    });
    
});

module.exports = router;
