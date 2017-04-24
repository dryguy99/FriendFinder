var mysql = require("mysql");

//----------------------------------------------
// set up mySQL local for testing
// var connection = mysql.createConnection({
//  host: "localhost",
//  port: 3306,
//  user: 'root',
//  password: 'test',
//  database: 'friendfinder_db'
// });


//----------------------------------------------
// set up mysql for use on website
var connection = mysql.createConnection({
 host: "wftuqljwesiffol6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
 port: 3306,
 user: "zttvn5sxxpv86pga",
 password: "wza9a40tv6az6s3a",
 database: "a8cn47880zwdi0l6"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
