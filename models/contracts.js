const { v4: uuidv4 } = require('uuid');
var mongoose = require('mongoose');

// contract database schema
// force schema to save blank objects
var contractSchema = mongoose.Schema({
	event:			{ type: Object, default: {} },
	hotel:			{ type: Object, default: {} },
	request:		{ type: String, default: '' },
	allocation:		{ type: Object, default: {} },
	costs:			{ type: Array, default: {} },
	contact:		{ type: Object, default: {} },
	cancellation:	{ type: Object, default: {} },
	author:			{ type: Object, default: {} },
	status:			{ type: String, default: 'draft' },
	ref:			{ type: String, default: uuidv4 },
	created_on: 	{ type: Date, default: Date.now },
	signature: 		{ type: String, default: '' },
	signed_on: 		{ type: Date, default: '' }
}, { minimize: false });

// export contract model with schema
var Contract = module.exports = mongoose.model('contract', contractSchema);

// get all contracts
module.exports.getAllContracts = function(callback, limit) {
	Contract.find(callback).limit(limit);
}