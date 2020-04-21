var ContractModel = require('../models/contracts');

// update the event section of a contract by reference ID
exports.update = (req, res) => {
	ContractModel.findOne({ ref: req.params.ref }, (err, contract) => {			
		if(err) { res.status(500).json(err) }
		if(!contract) { res.status(404).json({ 'message' : 'Contract not found' }) }
		
		// params to update
		if(req.body.name) { contract.event.name = req.body.name }
		if(req.body.venue) { contract.event.venue = req.body.venue }
		if(req.body.start) { contract.event.start = req.body.start }
		if(req.body.end) { contract.event.end = req.body.end }
		contract.markModified('event');

		// save the contract and check for errors
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