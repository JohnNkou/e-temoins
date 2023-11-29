import { multiParse } from '../../src/helper.js'
import { basename, extname } from 'path';
import textractClass from '../../src/textract/textract.js'
import fs from 'fs/promises';
import conn from '../../src/db/db.js'
import dbClass from '../../src/db/dbClass.js'
import S3Dev from '../../src/ob/s3.js'
import { pvName } from '../../src/formNames.js'
import { success } from '../../src/names.js'
import { getFileName, isDev } from '../../src/utils/helper.js'
import { pvURI, pvARN, voixURI, voixARN, preuveURI, preuveARN } from '../../src/ob/config.js'
import cookie from 'cookie'

const ROOT = process.env.ROOT,
refName = 'references[]',
voiceName = 'voix[]',
proofName = 'preuve[]',
voiceLink = (isDev())? voixURI: voixARN,
preuveLink = (isDev())? preuveURI : preuveARN;

export default async function Bulletin(req,res){
	let query = req.query,
	db = new dbClass(conn),
	method = req.method,
	body,
	cookies = cookie.parse(req.headers.cookie || ''),
	sessionId = cookies && cookies.sessionId,
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

	if(method == 'POST'){

		let sessionData = await db.getSession(sessionId).catch((error)=> ({error})),
		idTemoin;

		if(sessionData.error){
			return res.status(500).json({ success:'0', msg: error.toString(), error:sessionData.error });
		}
		else if(!sessionData.data.length){
			return res.status(403).json({ success:'0', msg:'Veuillez vous authentifier' });
		}
		else{
			idTemoin = sessionData.data[0].idTem;
		}

		body = await multiParse(req).catch((error)=> ({error}));

		if(body.error){
			res.status(500).json({ success:'0', msg: body.error.toString() , error:body.error });
		}
		else{

			files = body.files;
			
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

			let pvName = getFileName(ref[0].path),
			refFile = await fs.readFile(ref[0].path).catch((error)=> ({error})),
			voiceNames = [],
			voiceFile = await Promise.all(voix.map((v)=>{
				voiceNames.push(`${voiceLink}/${getFileName(v.path)}`);
				return fs.readFile(v.path).catch((error)=>({error}));
			})),
			preuveNames = [],
			preuveFile = await Promise.all(preuve.map((v)=>{
				preuveNames.push(`${preuveLink}/${getFileName(v.path)}`);
				return fs.readFile(v.path).catch((error)=>({error}))
			}));

			//console.log('refData',refData);
			//console.log('voixData',voixData);
			//console.log('preuveData',preuveData);

			let textract = new textractClass(),
			dateNow = Date.now(),
			dateThen;
			r = await textract.analyzeDocument({refFile,voiceFile}).catch((error)=>({error}));
			dateThen = Date.now();

			console.log("Traitement: " + (dateThen - dateNow) );

			if(r.error){
				let er = (r.error.custom)? r.error : r;
				return res.status(500).json(er);
			}
			else if(r.missing.length){
				return res.status(400).json({
					success:'0',
					msg:"Le fichier references manque les donnée suivante " + r.missing.join(',')
				})
			}

			let rr = await db.addPv({...r, voiceNames, pvName, preuveNames, idTemoin}).catch((error)=>({error}));

			if(rr.error){
				errors.push(rr.error);
			}
			else{
				added = rr.added;
			}

			if(errors.length){
				res.status(400).json(errors);
			}
			else{
				S3 = new S3Dev();

				S3.putPv(getFileName(ref[0].path),refFile).catch((error)=>{
					console.log("Error while putting references file",error, ref[0].originalFilename);
				});


				voix.forEach((v,i)=>{
					S3.putVoix(getFileName(v.path), voiceFile[i]).catch((error)=>{
						console.error("Error while putting voiceFile ",error,v.originalFilename)
					})
				});

				preuve.forEach((v,i)=>{
					S3.putPreuve(getFileName(v.path), preuveFile[i]).catch((error)=>{
						console.error("Error while putting preuveFile ",error,v.originalFilename)
					});
				});

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