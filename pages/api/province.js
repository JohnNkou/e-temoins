import conn from '../../src/db/db.js'
import dbClass from '../../src/db/dbClass.js'

export default async  function Province(req,res){
	try{
		let db = new dbClass(conn),
		response = await db.getProvince();

		res.status(200).json(response);
	}
	catch(e){
		res.status(500).json(e);
	}
}