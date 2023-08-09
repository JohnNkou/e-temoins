import mysql from 'mysql';

const conn = mysql.createConnection({
	host:'127.0.0.1',
	user:'ceni',
	password:'ceni',
	database:'Ceni',
	multipleStatements:true
});

export default conn;