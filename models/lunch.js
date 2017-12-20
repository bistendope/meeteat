var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    location: {type: String, required: true},
    userHost: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    guests: [{type: Schema.Types.ObjectId, ref: 'User'}]
},{collection: 'lunches'});

module.exports = mongoose.model('Lunch', schema);
