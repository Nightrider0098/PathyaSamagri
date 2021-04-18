var mysql = require("mysql");

var con = mysql.createConnection({
  host: "db4free.net",
  user: "zoomlearner0098",
  password: "MITohnasan@12345",
  database: "githubdatabase",
  multipleStatements: true,
  // host: "localhost",
  // user: "root",
  // password: "Password@12345",
  // database: "pathyaSamagri",
  // multipleStatements: true,
});

con.connect(function (err) {
  if (err) {
    return console.log(
      "failed to connect to book_store pls download mysql",
      err
    );
  } else return console.log("connection establish with book_store!!!!");
});

module.exports = con;
