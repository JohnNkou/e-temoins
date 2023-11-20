import { multiParse } from '../../src/helper.js'
import { basename, extname } from 'path';
import textractClass from '../../src/textract/textract.js'
import fs from 'fs/promises';
import conn from '../../src/db/db.js'
import dbClass from '../../src/db/dbClass.js'
import S3Dev from '../../src/ob/s3.js'
import { pvName } from '../../src/formNames'

const ROOT = process.env.ROOT;

function getFileName(filePath){
	return basename(filePath,extname(filePath));
}

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
	length,
	upload = `${ROOT}/public/upload`,
	bPath = `${upload}/bulletin`,
	ePath = `${upload}/failed`,
	S3;
	

	if(method == 'POST'){
		if(body.error){
			res.status(500).json({ error:body.error });
		}
		else{

			files = body.files[pvName];
			length = files.length;
			textract = new textractClass();

			for(let i=0; i < length; i++){
				file = files[i];
				data = await fs.readFile(file.path);
				r = await textract.analyzeDocument(data).catch((error)=>({error}));

				if(r.error){
					res.status(500).json(r);
					return;
				}
				else{

					S3 = new S3Dev();

					let puke = S3.putFile(getFileName(file.originalFilename),data).catch((error)=>({error})),
					fileName = puke.fileName;

					if(puke.error){
						console.error("BIG ERROR",puke.error);
						failed.push(file.originalFilename);
						errors.push(puke.error);
						continue;
					}
				}
			}

			removeFiles(files);

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

async function removeFiles(files){
	let length = files.length;

	for(let i=0; i < length; i++){
		await fs.rm(files[i].path).catch(console.error);
	}
}

export const config = {
	api:{
		bodyParser:false
	}
}