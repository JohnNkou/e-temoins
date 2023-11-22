import conn from '../../src/db/db.js';
import dbClass from '../../src/db/dbClass.js'
import { multiParse } from '../../src/helper.js'
import fs from 'fs/promises'

export default async function Candidat(req,res){
	let db = new dbClass(conn),
	query = req.query,
	body = req.body,
	method = req.method,
	form = await multiParse(req).catch((error)=> ({error}));

	if(method == 'GET'){
		await db.getTemoins(query).then((response)=>{
			res.status(200).json(response);
		}).catch((error)=>{
			res.status(500).json(error);
		})
	}
	else if(req.method == 'POST'){
		console.log(form);
		form.data.role = 'temoin';
		await db.addUser(form.data).then(async (response)=>{
			for(let i = 0; i < form.removePath.length; i++){
				let path = form.removePath[i];
				console.log('path',path);
				console.log(await fs.rename(path[0],`/Users/flashbell/Node/e-temoins/public/upload/${path[1]}`))
			}
			res.status((response.inserted)? 201:200).json(response);
		}).catch(async (error)=>{
			res.status(500).json(error);
			for(let i=0; i < form.removePath.length; i++){
				let path = form.removePath[i];
				await fs.rm(path[0]);
			}
		})
	}
	else{
		res.status(401);
	}
}

export const config = {
	api:{
		bodyParser:false
	}
}