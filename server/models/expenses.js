var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Expenses', new Schema({
	sheet_id: { type: Schema.Types.ObjectId, required: true },
	name: { type: String, required: true },
	date: { type: Date, required: true },
	amount: { type: Number, required: true },
	paid_by: { type: Schema.Types.ObjectId, required: true },
	paid_for: [ { type: Schema.Types.ObjectId, required: true } ]
}));