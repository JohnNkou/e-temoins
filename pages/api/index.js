import { multiParse } from '../../src/helper.js'
import { basename, extname } from 'path';
import textractClass from '../../src/textract/textract.js'
import fs from 'fs/promises';
import conn from '../../src/db/db.js'
import dbClass from '../../src/db/dbClass.js'
import S3Dev from '../../src/ob/s3.js'
import { pvName } from '../../src/formNames.js'
import { success } from '../../src/names.js'

const ROOT = process.env.ROOT,
refName = 'references',
voiceName = 'voix',
proofName = 'preuve';

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
	missing = [],
	failed = [],
	errors = [],
	added,
	length,
	upload = `${ROOT}/public/upload`,
	bPath = `${upload}/bulletin`,
	ePath = `${upload}/failed`,
	S3;

	res.setHeader('Access-Control-Allow-Origin','http://52.207.250.132');
	res.setHeader('Access-Control-Allow-Methods','POST');
	

	if(method == 'POST'){
		if(body.error){
			res.status(500).json({ success:'0', msg: body.error.toString() , error:body.error });
		}
		else{

			files = body.files
			
			let ref = files[refName],
			voix = files[voiceName],
			preuve = files[proofName];

			if(!ref || !ref.length){
				return res.status(400).json({
					success:'0',
					msg:"Aucun fichier references trouvé"
				})
			}
			else if(!voix || !voix.length){
				return res.status(400).json({
					success:'0',
					msg: "Aucun fichier des voix"
				})
			}
			else if(!preuve || !preuve.length){
				return res.status(400).json({
					success:'0',
					msg:"Aucun fichier de preuve donnée"
				})
			}

			let refFile = await fs.readFile(ref[0].path).catch((error)=> ({error})),
			voiceFile = await Promise.all(voix.map((v)=>{
				return fs.readFile(v.path).catch((error)=>({error}));
			})),
			preuveFile = await Promise.all(preuve.map((v)=>{
				return fs.readFile(v.path).catch((error)=>({error}))
			}));

			//console.log('refData',refData);
			//console.log('voixData',voixData);
			//console.log('preuveData',preuveData);

			let textract = new textractClass();
			r = await textract.analyzeDocument({refFile,voiceFile}).catch((error)=>({error}));

			if(r.error){
				return res.status(500).json(r);
			}
			else if(r.missing.length){
				return res.status(400).json({
					success:'1',
					msg:"Le fichier references manque les donnée suivante " + r.missing.join(',')
				})
			}

			S3 = new S3Dev();

			S3.putFile(getFileName(ref[0].path),refFile).catch((error)=>{
				console.log("Error while putting references file", ref[0].originalFilename);
			});

			voix.forEach((v,i)=>{
				S3.putFile(getFileName(v.path), voiceFile[i]).catch((error)=>{
					console.error("Error while putting voiceFile ",v.originalFilename)
				})
			});

			let rr = await db.addPv({...r, idTemoin:null}).catch((error)=>({error}));

			if(rr.error){
				errors.push(rr.errors);
			}
			else{
				added = rr.added;
			}

			if(errors.length){
				res.status(400).json(errors);
			}
			else{
				res.status(201).json({
					success:'1',
					msg:'Données inserées',
					data:'success.php'
				});
			}

			removeFiles(files);
		}
	}

	else if(method == 'GET'){
		await db.getBulletins(query).then((response)=>{
			res.status(200).json(response);
		}).catch((error)=>{
			res.status(500).json(error);
		})
	}
	else{
		console.log('method',method);
		console.log('headers',req.headers);
		res.status(501).send('');
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