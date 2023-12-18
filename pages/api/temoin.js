import conn from '../../src/db/db.js';
import dbClass from '../../src/db/dbClass.js'
import s3 from '../../src/ob/s3.js'
import { multiParse } from '../../src/helper.js'
import fs from 'fs/promises'
import bcrypt from 'bcrypt';
import { basename } from 'path'

const ROOT = process.env.ROOT;

function getHash(text){
	return new Promise((resolve,reject)=>{
		bcrypt.hash(text,10,function(err,hash){
			if(err){
				return reject(err);
			}

			resolve(hash);
		})
	})
}

export default async function Temoin(req,res){
	let db = new dbClass(conn),
	query = req.query,
	body = req.body,
	method = req.method,
	form = await multiParse(req).catch((error)=> ({error}));

	try{
		if(method == 'GET'){
			await db.getTemoins(query).then((response)=>{
				res.status(200).json(response);
			}).catch((error)=>{
				res.status(500).json(error);
			})
		}
		else if(req.method == 'POST'){
			
			form.data.password = await getHash(form.data.password);
			form.data.image = basename(form.files.image[0].path);

			if(!(form.data.idCandidats instanceof Array)){
				form.data.idCandidats = [form.data.idCandidats];
			}
			await db.addUser(form.data).then(async (response)=>{ console.log('response',response);
				try{
					let S3 = new s3(),
					filePath = form.files.image[0].path,
					filename = basename(filePath),
					data = await fs.readFile(filePath);

					await S3.putProfil(filename,data);

					for(let i = 0; i < form.removePath.length; i++){
						let path = form.removePath[i];
						console.log('path',path);
						console.log(await fs.rename(path[0],`${ROOT}/public/upload/${path[1]}`))
					}
					res.status((response.inserted)? 201:200).json(response);
				}
				catch(e){
					console.error("ERror",e);
					res.status(500).json(e);
				}
			}).catch(async (error)=>{ console.error('error',error);
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
	catch(e){
		console.error("Error",e);
		res.status(500).json(e);
	}
}

export const config = {
	api:{
		bodyParser:false
	}
}