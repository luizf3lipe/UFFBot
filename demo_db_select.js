var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "guilherme27",
  database: "uffbot"
});


var someVar = [];

con.query("select * from seguranca where id=1", function(err, rows){
  if(err) {
    throw err;
  } else {
    setValue(rows);
  }
});

function setValue(value) {
  someVar = value;
  console.log(someVar);
}



/*con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT  nome FROM seguranca where id=1", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});*/
