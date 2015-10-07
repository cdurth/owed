var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Friends', new Schema({
	sheet_id: { type: Schema.Types.ObjectId, required: true },
	name: { type: String, required: true }
}));