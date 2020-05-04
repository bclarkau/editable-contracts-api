require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let routes = require('./routes');

// init
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// connect database
try {
	mongoose.connect(process.env.DB_STRING, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	});
	console.log('Database connection successful');
} catch(err) {
	console.error('Error connecting to database');
	console.error(err.message);
	process.exit(1);
} 

// setup server
var port = process.env.PORT || 8888;

// include v1 routes
app.use('/v1', routes);

// start app 
app.listen(port, function() {
	console.log('App running on port ' + port);
});