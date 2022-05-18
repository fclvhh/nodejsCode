// crm mysqljs
var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'demo'
});

connection.connect();
connection.query('SELECT * FROM student', function (error, results) {
  if (error) throw error;
  console.log('结果是: ', results);
});

connection.end();