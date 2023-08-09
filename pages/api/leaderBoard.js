import conn from '../../src/db/db.js'
import dbClass from '../../src/db/dbClass.js';

export default async function leaderBoard(req,res){
	let query = req.query,
	db = new dbClass(conn),
	method = req.method;

	if(method == 'GET'){
		if(query.all){
			await db.getLeaderBoardAll().then((response)=>{
				res.status(200).json(response);
			}).catch((error)=>{
				res.status(500).json(error);
			})
		}
		else if(query.column){
			await db.getLeaderBoardAll(query).then((response)=>{
				res.status(200).json(response);
			}).catch((error)=>{
				res.status(500).json(error);
			})
		}
		else{
			res.status(400).send();
		}
	}
	else{
		res.status(501).send();
	}
}