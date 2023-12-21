import { multiParse } from '../../src/helper.js'
import { basename, extname } from 'path';
import textractClass from '../../src/textract/textract.js'
import fs from 'fs/promises';
import conn from '../../src/db/db.js'
import dbClass from '../../src/db/dbClass.js'
import S3Dev from '../../src/ob/s3.js'
import { pvName } from '../../src/formNames.js'
import { success } from '../../src/names.js'
import { domainKeys, getFileName, isDev } from '../../src/utils/helper.js'
import { preuveURI, preuveARN } from '../../src/ob/config.js'
import cookie from 'cookie'

const ROOT = process.env.ROOT,
myDomainKeys = [...domainKeys],
preRef = 'references-presidentielles[]',
natRef = 'references-nationales[]',
proRef = 'references-provinciales[]',
preVoix = 'voix-presidentielles[]',
natVoix = 'voix-nationales[]',
proVoix = 'voix-provinciales[]',
prePreuve = 'preuve-presidentielles[]',
natPreuve = 'preuve-nationales[]',
proPreuve = 'preuve-provinciales[]',
presidentielKey = myDomainKeys[0],
nationaleKey = myDomainKeys[1],
provincialKey = myDomainKeys[2],
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
	S3,limitBreached;

	if(method == 'POST'){

		let sessionData = await db.getSession(sessionId).catch((error)=> ({error})),
		user,idTemoin,userProvince, userCirconscription,
		userCirconscriptionId;

		if(sessionData.error){
			console.log("Response sent, session Error");
			return res.status(500).json({ success:'0', msg: sessionData.error.toString(), error:sessionData.error });
		}
		else if(!sessionData.data.length){
			console.log("Response sent, Not authenticated");
			return res.status(403).json({ success:'1', msg:'Veuillez vous authentifier', data:"login.php" });
		}
		else{

			try{
				user = sessionData.data[0];
				userProvince = user.province;
				userCirconscription = user.circonscription;
				userCirconscriptionId = user.circonscriptionId;
				idTemoin = user.idTem;
				limitBreached = await db.analyzedLimitBreached(idTemoin);

				if(limitBreached){
					console.log("response sent, limit");
					res.status(501).json({ success:'0', msg:"Vous avez atteint votre limite d'analyze de document" });
				}
			}
			catch(e){
				console.log("response sent. error user session parsing");
				res.status(400).json({ success:'0', msg:e.toString(), error:e });
			}
		}

		body = await multiParse(req).catch((error)=> ({error}));

		if(body.error){
			console.log("response sent. error parsing form send");
			res.status(500).json({ success:'0', msg: body.error.toString() , error:body.error });
		}
		else{

			files = body.files;
			
			let donnees = {
				[presidentielKey]:{
					reference: files[preRef],
					voix: files[preVoix],
					preuve: files[prePreuve],
					preuveFiles:[]
				},
				[nationaleKey]:{
					reference: files[natRef],
					voix: files[natVoix],
					preuve: files[natPreuve],
					preuveFiles:[]
				},
				[provincialKey]:{
					reference: files[proRef],
					voix: files[proVoix],
					preuve: files[proPreuve],
					preuveFiles:[]
				}
			};

			if(donnees[presidentielKey].reference){
				if(donnees[nationaleKey].reference || donnees[provincialKey].reference){
					if(!donnees[nationaleKey].reference){
						let index = myDomainKeys.indexOf(nationaleKey);
						myDomainKeys.splice(index,1);

						delete donnees[nationaleKey];
					}
					if(!donnees[provincialKey].reference){
						let index = myDomainKeys.indexOf(provincialKey);
						myDomainKeys.splice(index,1);

						delete donnees[provincialKey];
					}

					if(myDomainKeys.every((key)=> {
						if(donnees[key].preuve){
							donnees[key].preuveNames = donnees[key].preuve.map((preuve)=>{
								return `${preuveLink}/${preuve.path}`
							})
							return true;
						}
						else{
							return false;
						}
					})){
						
						let textract = new textractClass(userProvince,userCirconscription),
						dateNow = Date.now(),
						dateThen,
						dataResult;
						
						r = await textract.analyzeDocument({donnees}).catch((error)=>({error})),
						dataResult = r.dataReturn;
						dateThen = Date.now();

						if(r.error){ console.log("MAMAN",r);
							let er = (r.error.custom)? r.error : r;
							er.success = "0";

							if(!er.msg){
								er.msg = "Les photos envoyés n'ont pas pu être correctement traités. Veuillez vous assurer que les photos envoyé ne contiennent que le donnée neccessaire";
							}

							db.updateTracking(idTemoin,r.error.analyzedDocument).catch((error)=>{
								console.error("updateTracking error",error);
							})

							console.log("Response sent, analyzeError");
							res.status(500).json(er);
						}
						else if((dataResult[nationaleKey] && dataResult[nationaleKey].missing) || (dataResult[provincialKey] && dataResult[provincialKey].missing)){
							let msg = [];

							if(dataResult[nationaleKey] && dataResult[nationaleKey].missing){
								msg.push('Le fichier references nationale manque les donnée suivante '+ dataResult[nationaleKey].missing.join(','))
							}
							if(dataResult[provincialKey] && dataResult[provincialKey].missing){
								msg.push('Le fichier references provinciale manque les donnée suivante '+dataResult[provincialKey].missing.join(','))
							}
							console.log("Response sent. Some ref missing");
							res.status(400).json({
								success:'0',
								msg: msg.join('\n')
							})
						}
						else{
							let dLength = myDomainKeys.length;

							for(let i=0; i < dLength; i++){
								let key = myDomainKeys[i],
								length2 = donnees[key].preuveNames.length,
								file;

								dataResult[key].preuveNames = donnees[key].preuveNames;

								for(let y=0; y < length2; y++){
									file = await fs.readFile(donnees[key].preuve[y].path);
									donnees[key].preuveFiles.push(file);
								}

							}

							await fs.writeFile('/Users/alainkashoba/Node/e-temoins/src/textract/fullTable', JSON.stringify(r));

							console.log('form',r.dataReturn.presidentiel.form);

							let rr = await db.addPv({...r, idTemoin, userProvince, userCirconscriptionId}).catch((error)=>({error}));

							if(rr.error){
								let msg = (rr.error.toString)? rr.error.toString() : "Une erreur est survenue lors du traitment des fichiers. Veuillez vous assurer que les données envoyés sont correctes";
								console.log("Response sent","Bd error",msg,typeof msg)
								res.status(500).json({ success:'0', msg, error:rr.error });
							}
							else{
								S3 = new S3Dev();

								myDomainKeys.forEach((key,i)=>{
									let domain = dataResult[key],
									refFile = domain.refFile,
									refName = domain.refName,
									voixNames = domain.voixNames,
									voixFiles = domain.voixFiles,
									preuveNames = domain.preuveNames,
									preuveFiles = donnees[key].preuveFiles

									S3.putPv(getFileName(refName),refFile).catch((error)=>{
										console.error("Error while putting references file",error,donnees[key].reference[0].originalFilename)
									});

									voixNames.forEach((v,i)=>{
										S3.putVoix(getFileName(v),voixFiles[i]).catch((error)=>{
											console.error("Error while putting voiceFile",error, donnees[key].voix[i].originalFilename)
										});
									})

									preuveNames.forEach((v,i)=>{
										S3.putPreuve(getFileName(v), preuveFiles[i]).catch((error)=>{
											console.error("Error while putting preuveFile", error, donnees[key].preuve[i].originalFilename)
										});
									})
								})

								console.log("Response sent","ok");
								res.status(201).json({
									success:'1',
									msg:'Données inserées',
									data:'success.php'
								});
							}
						}
					}
					else{
						console.log("Response sent","Proof not found");
						res.status(400).json({
							success:'0',
							msg:"Il manque des donnees de preuves. Veuillez vous assurer d'envoyer les preuves."
						})
					}
				}
				else{
					console.log("Response sent");
					res.status(400).json({ success:'0', msg:"Aucun fichier reference national ou provincial trouvé" });
				}
			}
			else{
				console.log("Response sent");
				res.status(400).json({
					success:'0',
					msg:'Aucun fichier reference presidentiel trouvé'
				});
			}

			//console.log('refData',refData);
			//console.log('voixData',voixData);
			//console.log('preuveData',preuveData);

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