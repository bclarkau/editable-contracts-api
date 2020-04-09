const { v4: uuidv4 } = require('uuid');
var mongoose = require('mongoose');

// contract database schema
var contractSchema = mongoose.Schema({
    author: {
        type: Number,
        required: true
    },
    ref: {
        type: String,
        default: uuidv4
    },
	created_on: {
		type: Date,
		default: Date.now
	}
});

// export contract model with schema
var Contract = module.exports = mongoose.model('contract', contractSchema);

// get all contracts
module.exports.getAllContracts = function(callback, limit) {
	Contract.find(callback).limit(limit);
}