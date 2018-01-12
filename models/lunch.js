var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var schema = new Schema({
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    locationName: {type: String, required: true},
    userHost: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    remainingPlaces: {type: Number, required: true},
    guests: [{type: Schema.Types.ObjectId, ref: 'User'}]
},{ usePushEach: true },{collection: 'lunches'});

// schema.post('remove'), function (lunch){
//     User.findById(lunch.user, function(err, user){
//         user.lunches.pull(lunch._id);
//         user.save();
//     });
// }

module.exports = mongoose.model('Lunch', schema);
