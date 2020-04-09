var ContractModel = require('../models/contracts');

// list all contracts
exports.list = function(req, res) {
	ContractModel.getAllContracts(function(err, contracts) {
		if (err) {
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
exports.add = function(req, res) {
    var contract = new ContractModel();
    contract.author = req.body.author;

    // save contract
	contract.save(function(err) {
		if (err) {
			res.json(err);
		}
		
		res.json({
			message: 'New contract created!',
			data: contract
		});
	});
};

// view a contract by reference ID
exports.view = function(req, res) {
	ContractModel.findOne({ ref: req.params.ref }, function(err, contract) {
		if (err) {
			res.send(err);
		}

		res.json(contract);
	});
};

// update a contract by reference ID
exports.update = function(req, res) {
    ContractModel.findOne({ ref: req.params.ref }, function(err, contract) {
		if (err) {
            res.send(err);
        }
        
        // params to update
        contract.author = req.body.author;
		
		// save the contract and check for errors
		contract.save(function(err) {
			if (err) {
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
exports.delete = function(req, res) {
	ContractModel.remove({
		ref: req.params.ref
	}, function(err, contract) {
		if (err) {
			res.send(err);
		}
		
		res.json({
			status: 200,
			message: 'Contract deleted'
		});
	});
};