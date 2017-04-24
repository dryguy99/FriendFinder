var connection = require("./connection.js");

// Object Relational Mapper (ORM)

var orm = {
  addtoDB: function(qArray, CB) {
    var queryString = "INSERT INTO friends VALUES(name, photo, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, total) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(queryString, [qArray], function(err, result) {
      if (err) {
        console.log("my SQL error: " + err);
        CB(err);
      }
      console.log(result);
      CB(result);
    });
  },
  selectAndOrder: function(col1, col2, col3, orderCol, orderBy, CB) {
    var queryString = "SELECT ?? ?? ?? FROM friends ORDER BY ? ?";
    console.log(queryString);
    connection.query(queryString, [col1, col2, col3, orderCol, orderBy], function(err, result) {
      if (err) {
        console.log(err);
        CB(err);}
      CB(result);

    });
  },
  select: function(col, table, orderCol, orderBy, CB) {
    var queryString = "SELECT ?? FROM ?? ORDER BY ? ?";
    connection.query(queryString, [col, table, orderCol, orderBy], function(err, result) {
      console.log(result);
      CB(result);
    });
  }

};

module.exports = orm;
