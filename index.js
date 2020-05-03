let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let routes = require('./routes');

// init
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// connect database
mongoose.connect('mongodb://localhost/editable-contracts', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

if(!db) {
	console.log('Error connecting to database');
} else {
	console.log('Database connection successful');
}

// setup server
var port = process.env.PORT || 8888;

// include v1 routes
app.use('/v1', routes);

// start app 
app.listen(port, function() {
	console.log('App running on port ' + port);
});