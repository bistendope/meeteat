var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    locationName: {type: String, required: true},
    userHost: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    remainingPlaces: {type: Number, required: true},
    guests: [{type: Schema.Types.ObjectId, ref: 'User'}]
},{collection: 'lunches'});

module.exports = mongoose.model('Lunch', schema);
