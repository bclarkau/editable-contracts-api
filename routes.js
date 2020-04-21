const router = require('express').Router();
const cors = require('cors');

router.all('*', cors());

///////////////////////////////////////////////////////////////////
// Global routes
///////////////////////////////////////////////////////////////////

router.post('/auth', cors(), (req, res) => {
	res.json({
		authenticated: true
	});
});

///////////////////////////////////////////////////////////////////
// Contract routes
///////////////////////////////////////////////////////////////////

var contractController = require('./controllers/contracts');

// Contact routes
router.route('/contracts')
	.get(cors(), contractController.list)		// list all contracts
	.post(cors(), contractController.add);		// add new contract

router.route('/contract/:ref')
	.post(cors(), contractController.get)		// get a contract
	.delete(cors(), contractController.delete);	// delete a contract 

///////////////////////////////////////////////////////////////////
// Section routes
///////////////////////////////////////////////////////////////////

var contractEventController = require('./controllers/sectionEvent');

router.route('/contract/:ref/event')
	.patch(cors(), contractEventController.update)	// update event section

// Export API routes
module.exports = router;