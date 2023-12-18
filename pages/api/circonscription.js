import conn from '../../src/db/db.js';
import dbClass from '../../src/db/dbClass.js'

export default async function Circonscription(req,res){
	let query = req.query,
	method = req.method,
	db = new dbClass(conn);

	switch(method){
	case 'GET':
		if(!query){
			return res.status(400).json({ error:{
				message:"Bad request"
			} })
		}
		db.getCirconscription(query).then((response)=>{
			res.status(200).json(response);
		}).catch((error)=>{
			res.status(500).json(error);
		})
		break;

	default:
		res.status(501).send('');
	}
}