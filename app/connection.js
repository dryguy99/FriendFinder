var mysql = require("mysql");

//----------------------------------------------
// set up mySQL local for testing
var connection = mysql.createConnection({
 host: "localhost",
 port: 3306,
 user: 'root',
 password: 'test',
 database: 'friendfinder_db'
});


//----------------------------------------------
// set up mysql for use on website
// var connection = mysql.createConnection({
//  host: "wvulqmhjj9tbtc1w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//  port: 3306,
//  user: "ogcd9hligymivxa7",
//  password: "nom02ddbbpux8ox1",
//  database: "y0cg1nb2b394wk40"
// });

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
