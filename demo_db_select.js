var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "guilherme27",
  database: "uffbot"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT  nome FROM seguranca where id=1", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
