import conn from '../../src/db/db.js';
import dbClass from '../../src/db/dbClass.js'
import { profilDir } from '../../src/ob/config.js'
import s3 from '../../src/ob/s3.js'
import { multiParse } from '../../src/helper.js'
import { basename } from 'path';
import fs from 'fs/promises'

const ROOT = process.env.ROOT;

export default async function Candidat(req,res){
	let db = new dbClass(conn),
	query = req.query,
	body = req.body,
	method = req.method,
	form = await multiParse(req).catch((error)=> ({error}));

	if(method == 'GET'){
		await db.getCandidates(query).then((response)=>{
			res.status(200).json(response);
		}).catch((error)=>{
			res.status(500).json(error);
		})
	}
	else if(req.method == 'POST'){
		
		let filePath = form.files.image[0].path,
		filename = basename(filePath);

		form.data.image = `${profilDir}/${filename}`;

		await db.addCandidat(form.data).then(async (response)=>{
			try{
				let S3 = new s3(),
				data = await fs.readFile(filePath);

				await S3.putProfil(filename,data);

				res.status((response.inserted)? 201:200).json(response);
			}
			catch(e){
				console.error("Error",e);
				res.status(500).json(e);
			}
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