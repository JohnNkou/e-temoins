import mysql from 'mysql';

const conn = mysql.createConnection({
	host:'localhost',
	user:'ceni',
	password:'ceni',
	database:'Ceni'
});

export default conn;