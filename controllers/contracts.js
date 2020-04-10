var ContractModel = require('../models/contracts');

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
	contract.author = req.body.author;

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

// update a contract by reference ID
exports.update = (req, res) => {
	ContractModel.findOne({ ref: req.params.ref }, (err, contract) => {
		if(err) {
			res.send(err);
		}
		
		// params to update
		contract.author = req.body.author;
		
		// save the contract and check for errors
		contract.save((err) => {
			if(err) {
				res.json(err);
			}

			res.json({
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