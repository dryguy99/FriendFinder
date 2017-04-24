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
  findWhoHasMost: function(tableOneCol, tableTwoForeignKey, tableOne, tableTwo) {
    var queryString = "SELECT ??, COUNT(??) AS count FROM ?? LEFT JOIN ?? ON ??.??= ??.id GROUP BY ?? ORDER BY count DESC LIMIT 1";

    connection.query(queryString, [tableOneCol, tableOneCol, tableOne, tableTwo, tableTwo, tableTwoForeignKey, tableOne, tableOneCol], function(err, result) {
      console.log(result);
    });
  },
  select: function(col, table) {
    var queryString = "SELECT ?? FROM ??";
    connection.query(queryString, [col, table], function(err, result) {
      console.log(result);
    });
  }

};

module.exports = orm;
