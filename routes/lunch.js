var express = require('express');
var router = express.Router();

var Lunch = require('../models/lunch');

router.get('/', function(req, res, next){
    Lunch.find()
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

router.post('/', function(req, res, next){
    var lunch = new Lunch({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        locationName: req.body.locationName,
        remainingPlaces: req.body.remainingPlaces

    });
    lunch.save(function(err, result){
        if(err){
            return res.status(500).json({
                title: 'Une erreur est survenue...',
                error: err
            });
        }
        res.status(201).json({
            message: 'Repas ajouté !',
            obj: result
        });
    });
})

module.exports = router;
