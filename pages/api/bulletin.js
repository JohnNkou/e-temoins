import { multiParse } from '../../src/helper.js'
import textract from '../../src/textract/textract.js'
import fs from 'fs/promises';
import conn from '../../src/db/db.js'
import dbClass from '../../src/db/dbClass.js'

export default async function Bulletin(req,res){
	let db = new dbClass(conn),
	body = await multiParse(req).catch((error)=> ({error})),
	files,
	file,
	data,
	r;

	if(body.error){
		res.status(500).json({ error:body.error });
	}
	else{
		files = body.files.bulletins;

		for(let i=0; i < files.length; i++){
			file = files[i];
			data = await fs.readFile(file.path);
			r = await textract(data).catch((error)=> ({error}));

			if(r.error){
				res.status(500).json(r);
				return;
			}
			else{
				let response = await db.addBulletin({ img:file.originalFilename, commentaire:body.data.commentaire }).catch((error)=>({error}));
				if(response.error){
					res.status(500).json(response);
					return;
				}
				else{
					await fs.rename(file.path,`/Users/flashbell/Node/e-temoins/public/upload/bulletin/${file.originalFilename}`);
					
					let r2 = await db.addVote({ president:r.votes[0], national:r.votes[1], provincial:r.votes[2], bulletinId:response.id }).catch((error)=>({error}));

					if(r2.error){
						res.status(500).json(r2);
						return;
					}
				}
			}
		}

		res.status(201);
		res.end();
	}
}

export const config = {
	api:{
		bodyParser:false
	}
}