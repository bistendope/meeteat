var express = require('express');
var router = express.Router();

var Lunch = require('../models/lunch');

router.post('/', function(req, res, next){
    var lunch = new Lunch({
        location: req.body.location
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
