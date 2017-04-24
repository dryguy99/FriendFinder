var connection = require("./connection.js");

// Object Relational Mapper (ORM)

var orm = {
  addtoDB: function(qArray, CB) {
    var queryString = "INSERT INTO friends (name, photo, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, total) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(queryString, qArray, function(err, result) {
      if (err) {
        console.log("my SQL error: " + err);
        CB(err);
      }
      console.log(result);
      CB(result);
    });
  },
  select: function(col, table, CB) {
    var queryString = "SELECT ?? FROM ??";
    connection.query(queryString, [col, table, function(err, result) {
      if (err) {
        console.log("my SQL error: " + err);
        CB(err);
      }
      console.log(result);
      CB(result);
    });
  }

};

module.exports = orm;
