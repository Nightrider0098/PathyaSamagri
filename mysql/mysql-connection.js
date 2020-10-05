var mysql = require('mysql');


var con = mysql.createConnection({
  host: "db4free.net",
  user: "zoomlearner0098",
  password: "MITohnasan@12345",
  database: "githubdatabase",
  multipleStatements: true
});

function a() {
  con.connect(function (err) {
    if (err) {
      a()
      return console.log("failed to connect to book_store pls download mysql", err);
    }

    else return console.log("connection establish with book_store!!!!");
  });
}
a()
module.exports = con;

