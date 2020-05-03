var ContractModel = require('../models/contracts');
const merge = require('deepmerge');

// list all contracts
exports.list = (req, res) => {
	ContractModel.getAllContracts((err, contracts) => {
		if(err) {
			res.json({
				status: 'error',
				message: err,
			});
		}
		
		res.json({
			status: 200,
			data: contracts
		});
	});
};

// add a new contract
exports.add = (req, res) => {
	var contract = new ContractModel();

	// map valid keys
	contract.event = req.body.event;
	contract.hotel = req.body.hotel;
	contract.request = req.body.request;
	contract.allocation = req.body.allocation;
	contract.costs = req.body.costs;
	contract.release = req.body.release;
	contract.contact = req.body.contact;
	contract.cancellation =	req.body.cancellation;
	contract.author = req.body.author;
	contract.approved_on = req.body.approved_on; // demo

	// save contract
	contract.save((err) => {
		if(err) {
			res.json(err);
		}
		
		res.json({
			message: 'New contract created!',
			data: contract
		});
	});
};

// view a contract by reference ID
exports.get = (req, res) => {
	ContractModel.findOne({ ref: req.params.ref }, (err, contract) => {
		if(err) { res.json(err) }

		// if a contract is found, return it
		if(contract) {
			res.json(contract);
		} 
		// otherwise throw 404
		else {
			res.status(404).end();
		}
	});
};

// update the event section of a contract by reference ID
exports.update = (req, res) => {
	const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

	ContractModel.findOne({ ref: req.params.ref }, (err, contract) => {			
		if(err) { res.status(500).json(err) }
		if(!contract) { res.status(404).json({ 'message' : 'Contract not found' }) }
		
		// copy the current contract object (without ID)
		let current = contract.toObject();
		delete current._id; 

		// merge changed values
		let merged = merge(current, req.body, { arrayMerge: overwriteMerge });

		// update contract with new data
		for(let [key, value] of Object.entries(merged)) {
			contract[key] = value;
			contract.markModified(key);
		}

		// save updated contract and check for errors
		contract.save((err) => {
			if(err) { res.status(500).send(err) }

			res.status(200).send({
				status: 200,
				message: 'Contract Info updated',
				data: contract
			});
		});
	});
};

// delete a contract by reference ID
exports.delete = (req, res) => {
	ContractModel.remove({
		ref: req.params.ref
	}, (err, contract) => {
		if(err) {
			res.send(err);
		}
		
		res.json({
			status: 200,
			message: 'Contract deleted'
		});
	});
};