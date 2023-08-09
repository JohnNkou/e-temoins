import { multiParse } from '../../src/helper.js'
import textract from '../../src/textract/textract.js'
import fs from 'fs/promises';
import conn from '../../src/db/db.js'
import dbClass from '../../src/db/dbClass.js'

export default async function Bulletin(req,res){
	let query = req.query,
	db = new dbClass(conn),
	method = req.method,
	body = await multiParse(req).catch((error)=> ({error})),
	files,
	file,
	data,
	r,
	failed = [],
	errors = [],
	upload = '/Users/flashbell/Node/e-temoins/public/upload',
	bPath = `${upload}/bulletin`,
	ePath = `${upload}/failed`;

	if(method == 'POST'){
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
					let response = await db.addBulletin({ img:file.originalFilename, commentaire:body.data.commentaire, status:'success' }).catch((error)=>({error}));
					if(response.error){
						failed.push(file.originalFilename);
						errors.push(response.error);
						fs.rename(file.path,`${ePath}/${file.originalFilename}`).catch((error)=>{
							console.error(error);
						})
					}
					else{
						await fs.rename(file.path,`${bPath}/${file.originalFilename}`);

						let r2 = await db.addVote({ president:r.votes[0], national:r.votes[1], provincial:r.votes[2], bulletinId:response.id }).catch((error)=>({error}));

						if(r2.error){
							errors.push(r2.error);
							let r3 = await db.updateBulletin(response.id,'failedVote').catch((error)=>({error}));

							if(r3.error){
								errors.push(r3.error);
								res.status(500).json(r2);
								return;
							}
						}
					}
				}
			}

			res.status(201).json({failed,errors});
			res.end();
		}
	}
	else{
		await db.getBulletins(query).then((response)=>{
			res.status(200).json(response);
		}).catch((error)=>{
			res.status(500).json(error);
		})
	}
}

export const config = {
	api:{
		bodyParser:false
	}
}