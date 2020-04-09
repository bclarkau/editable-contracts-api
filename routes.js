let router = require('express').Router();

///////////////////////////////////////////////////////////////////
// Global routes
///////////////////////////////////////////////////////////////////

router.get('/', function(req, res) {
	res.json({
		status: 'success',
		message: 'Editable Contracts API',
	});
});

///////////////////////////////////////////////////////////////////
// Contract routes
///////////////////////////////////////////////////////////////////

var contractController = require('./controllers/contracts');

// Contact routes
router.route('/contracts')
	.get(contractController.list)           // list all contracts
	.post(contractController.add);          // add new contract

router.route('/contract/:ref')
	.get(contractController.view)           // get a contract
	.patch(contractController.update)       // update a contract 
	.delete(contractController.delete);     // delete a contract 
	
// Export API routes
module.exports = router;