var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    latitude: {type: Number},
    longitude: {type: Number},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    lunches: [{type: Schema.Types.ObjectId, ref: 'Lunch'}],
    subscribedLunches: [{type: Schema.Types.ObjectId, ref: 'Lunch'}]
},
{ usePushEach: true });

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
