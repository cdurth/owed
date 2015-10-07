var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Sheets', new Schema({
	name: { type: String, required: true },
	created: { type: Date, default: Date.now }
}));