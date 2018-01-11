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

router.post('/subscribe', function(req, res, next){
    
    var decoded = jwt.decode(req.query.token);
    
    User.findById(decoded.user._id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'Une erreur est survenue...',
                error: err
            });
        }
        Lunch.findById(req.body.lunchId, function(err, lunch){
            if(err){
                return res.status(500).json({
                    title: 'Une erreur est survenue...',
                    error: err
                });
            }
            if(lunch.remainingPlaces < 1){
                return res.status(201).json({
                    message: 'Il ne reste plus de place libre au repas',
                    subscribed: false,
                    alreadySubscribed: false,
                    obj: lunch
                });
            }else if((lunch.guests.indexOf(user._id) > -1) || (user.subscribedLunches.indexOf(lunch._id) > -1)){
                    return res.status(201).json({
                        message: 'Vous êtes déjà inscrit',
                        alreadySubscribed: true,
                        subscribed: false,
                        obj: lunch
                    });     
                }else{
                    user.subscribedLunches.push(req.body.lunchId);
                    user.save();
                    lunch.guests.push(user._id);
                    lunch.save();
                    var update = { $set: { remainingPlaces: lunch.remainingPlaces -1}};
                    Lunch.findByIdAndUpdate(lunch._id, update, function(err, lunch2){
                        if(err){
                            return res.status(500).json({
                                title: 'Une erreur est survenue...',
                                error: err
                            });
                        }
                        lunch2.save(function(err, lunch){
                            return res.status(201).json({
                                message: 'Inscription de l\'utilisateur au repas prise en compte',
                                subscribed: true,
                                alreadySubscribed: false,
                                obj: lunch
                            });
                        });
                    });
                }
            
            
        });
    });
});

module.exports = router;
