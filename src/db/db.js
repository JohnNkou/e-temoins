import mysql from 'mysql';

function createConnection(){
	return mysql.createConnection({
		host:'127.0.0.1',
		user:'ceni',
		password:'ceniceniceni',
		database:'Ceni',
		multipleStatements:true
	})
}

const o = {
	conn : createConnection(),
	reconnect:()=>{
		o.conn = createConnection();
		o.conn.on('error',(e)=>{
			if(e.fatal){
				o.reconnect();
			}
		})
	}
}

o.conn.on('error',(e)=>{
	if(e.fatal){
		o.reconnect();
	}
})

export default o;