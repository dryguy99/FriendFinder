
// BASE SETUP
// =============================================================================
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');	// parse the json data
var fs = require('fs');
var orm = require("./app/orm.js");			// call the mySQL queires

var AST = require('node-sqlparser');		// call node sql parser
// fix CORS errors
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     // intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//       res.send(200);
//     }
//     else {
//       next();
//     }
// };
// app.use(allowCrossDomain);


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;	// set our port

// ROUTES FOR API
// =============================================================================
var router = express.Router();// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});
// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
// write routes here
router.get('/', function(req, res) {
	// orm.selectAndOrder("name", "photo", "total", "total", "DESC", function (result) {
	// 	console.log(result);
	// 	res.send(result);
	// });
	orm.select("*", "friends", "total", "DESC", function (results) {
		res.send(results);
		console.log(results);
		// for (var i = 0; i < results.length; i++) {
		// 	console.log("Name: " + results[i].name + " Photo: " + results[i].photo + " Total: " + results[i].total);
		// }
	});
	
});
var qArray = [];
router.route('/survey')
// create a basic card (accessed at POST http://localhost:3000/api/basic)
    .post(function(req, res) {
    	console.log(req.body);
    	qArray.push(req.body.name);
    	qArray.push(req.body.photo);
    	for (var i = 0; i < req.body.scores.length; i++) {
    		qArray.push(parseInt(req.body.scores[i]));
    	}
    	// qArray.push(req.body.scores);
    	qArray.push(parseInt(req.body.total));
    	
    	console.log(" everything: " + qArray);
    	orm.addtoDB(qArray, function(result) {
    		res.send("success: "+ result);
    	});
    	
    	// function postFriend(name, photo, qArray, total){
    	
		// connection.query("INSERT INTO friends (name = ?, photo = ?, q0 = ?,q1 = ?,q2 = ?,q3 = ?,q4 = ?,q5 = ?,q6 = ?,q7 = ?,q8 = ?,q9 = ?,total = ?) VALUES" [ name, photo, qArray, total], function (error, results, fields){
		// 	if (error) {res.send(error);}
		//     // save the card and check for errors
		//     res.json({ message: 'Card created!' });
		// 	});
		// }
		// //postFriend(name, photo, qArray, total);
 	  	//res.send("Success!");
  //   	console.log(total);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(express.static('./app/public'));
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);



// function runFind(){
// 		connection.query("SELECT id, name, photo, total FROM friends ORDER BY id;", function (error, results, fields){
// 			if (error) {
// 				res.send(error);
// 			}
// 			//console.log('THE SOLUTION IS ', JSON.stringify(results));

// 			res.send(results);
// 		});
		
// 	}		