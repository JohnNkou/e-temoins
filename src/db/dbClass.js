import mysql from 'mysql';
import { pvRef, sanitize } from '../conversion.js'
import { domainKeys } from '../utils/helper.js'
import Options from './db.js'
import fs from 'fs/promises';

let instance;

export default function dbClass({conn,reconnect}){

	function errorHandler(error){
		let e = {};

		if('code' in error){
			e.code = error.code;
		}
		if('sqlMessage' in error){
			e.message = error.sqlMessage;
		}
		else if('message' in error){
			e.message = error.message;
		}
		if('name' in error){
			e.name = error.name;
		}
		if('stack' in error){
			e.stack = error.stack;
		}

		return e;
	}

	function addResponse(response, error=null){
		return {
			inserted: response.affectedRows > 0 ,
			error,
			id:response.insertId
		}
	}

	function getResponse(data,error=null){
		return {
			data,
			error
		}
	}

	function updResponse(response,error = null){
		return {
			updated: response.affectedRows > 0 ,
			error
		}
	}

	this.do = (sql,params=[], connection=conn)=>{
		return new Promise((resolve,reject)=>{
			connection.query(sql,params,(err,result)=>{
				if(err){
					if(err.fatal){
						reconnect();
					}
					reject(err);
				}
				else{
					resolve(result);
				}
			})
		})
	}

	this.addCandidat = ({nom,prenom,postnom,numero,domaine,image,circonscription})=>{
		let sql = 'INSERT INTO Candidat(nom,prenom,postnom,numero,domain,image,circonscriptionId) SELECT ?,?,?,?,?,?,?,id FROM Circonscription WHERE nom = ?',
		params = [nom,prenom,postnom,numero,domaine,image,circonscription];

		return this.do(sql,params).then(addResponse).catch((error)=>{
			throw addResponse({},error);
		})
	}

	this.getCandidates = ({total, cir, limit, domaine})=>{
		let sql = `SELECT id,CONCAT(nom,' ',prenom,' ',postnom) AS noms,numero,domain,image,id FROM Candidat`,
		filter = ' LIMIT ?',
		params = [];

		if(cir){
			sql += ` WHERE (circonscriptionId=? ${(!domaine)? "OR domain = 'Presidentielles'":'' })  `;
			params.push(cir);
			if(!limit){
				limit = 10000;
			}
		}
		if(domaine){
			if(cir){
				sql += ' && domain = ? ';
				params.push(domaine);
			}
			else{
				sql += ' WHERE domain=?';
				params.push(domaine);
			}
		}

		if(!limit){
			limit = 500;
		}
		
		params.push(limit);
		sql += filter;

		return this.do(sql,params).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.getSession = (sessionId)=>{
		let sql = 'SELECT sessionId,province,t.nom,idTem,idCand,C.nom as circonscription, C.id as circonscriptionId FROM Session,Temoin as t, Circonscription as C WHERE sessionId=? && idTem = t.id && C.id = t.circonscriptionId',
		params = [sessionId];

		return this.do(sql,params).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.getProvince = ()=>{
		let sql = 'SELECT * FROM Province';

		return this.do(sql).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.getCirconscription = ({ province })=>{
		let sql = 'SELECT id,nom FROM Circonscription',
		params = [];

		if(province){
			sql += ' WHERE province=?';
			params.push(province);
		}

		return this.do(sql,params).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.analyzedLimitBreached = (idTemoin)=>{
		let sql = `SELECT value FROM Limitation;
			SELECT SUM(analyzedDocument) as total FROM Tracking WHERE idTem = ?
		`,
		params = [idTemoin];

		return this.do(sql,params).then((data)=>{
			let limit = data[0][0].value,
			analyzedDocument = data[1][0].total;

			if(analyzedDocument >= limit){
				return true;
			}
			else{
				return false;
			}
		})
	}

	this.addUser = ({nom,prenom,postnom,password,email,telephone,image, circonscriptionId,status=1,role,idCandidats})=>{
		let sql = 'INSERT INTO Temoin(nom,prenom,postnom,password,email,telephone,image,circonscriptionId,status,role) VALUES(?,?,?,?,?,?,?,?,?,?)',
		values,
		params = [nom,prenom,postnom,password,email,telephone,image,circonscriptionId,status,role];

		return new Promise((resolve,reject)=>{
			let pool = conn;

			pool.getConnection((err,conn)=>{
				if(err){
					return reject(err);
				}
				
				conn.beginTransaction(async (error)=>{
					if(error){
						return conn.rollback(()=>{ conn.release((err)=>{
							console.error(err);
						})
							reject(error);
						})
					}

					let payload;

					try{
						let response = await this.do(sql,params,conn),
						inserted = response.affectedRows,
						idTem = response.insertId;
						
						if(inserted){
							sql = 'INSERT INTO relations(idtem,idcand,status) VALUES ';
							params = [];
							values = idCandidats.map((cand)=>{
								params.push(idTem,cand,1);
								return `(?,?,?)`
							}).join(',');

							sql += values;

							response = await this.do(sql,params,conn);
							
							if(response.affectedRows == idCandidats.length){
								payload = addResponse(response);
							}
							else{
								console.error("THe number of row inserted is different than the number of candidats");
								console.error(response,idCandidats);
								return conn.rollback(()=>{
									conn.release((err)=>{
										console.error(err);
									})
									resolve(addResponse({affectedRows:0}));
								})
							}
						}
						else{
							payload = addResponse(response);
						}

						conn.commit((err)=>{
							if(err){ 
								return reject(err);
							}
							

							conn.release((err)=>{
								console.error(err);
							});
							resolve(payload);
						})
					}
					catch(e){
						console.error("Error",e);
						conn.rollback(()=>{
							conn.release((err)=>{
								console.error(err);
							})
							reject(e);
						});
					}
				})
			})
		})
	}

	this.getTemoins = ({total,province})=>{
		let sql = "SELECT nom,prenom,postnom, email,telephone,image FROM Temoin WHERE role = 'temoin';",
		sql2 = "SELECT count(*) as total FROM Temoin WHERE role='temoin';",
		sql3 = "SELECT nom FROM Province;";

		if(total){
			sql = sql2;
		}

		if(province){
			sql += sql3;
		}

		return this.do(sql).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.getPvs = ()=>{
		let sql = 'SELECT * FROM referencePV;',
		sql2 = 'SELECT count(*) as total FROM referencePV';

		sql += sql2;

		return this.do(sql).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.updateTracking = (idTemoin,analyzedDocument)=>{
		let sql = 'INSERT INTO Tracking(idTem,analyzedDocument) VALUES(?,?)',
		params = [idTemoin,analyzedDocument];

		return this.do(sql,params).then(addResponse).catch((error)=>{
			throw addResponse({},error);
		})
	}

	this.addPv = ({dataReturn, idTemoin, userProvince,userCirconscriptionId ,analyzedDocument})=>{
		let length = domainKeys.length,
		added = 0;

		return new Promise((resolve,reject)=>{
			let pool = conn;

			pool.getConnection((err,conn)=>{
				if(err){
					return reject(err);
				}
				
				conn.beginTransaction(async (err)=>{
					if(err){
						return reject(err);
					}

					try{
						for(let i=0; i < length; i++){

							if(!dataReturn[domainKeys[i]]){
								continue;
							}
							let currentDomain = dataReturn[domainKeys[i]],
							sql = 'INSERT INTO referencePV(--) VALUES(---)',
							puke = [],
							params = [],
							tables = currentDomain.tables,
							voiceNames = currentDomain.voixNames,
							preuveNames = currentDomain.preuveNames,
							pvName = currentDomain.refName,
							forms = currentDomain.form,
							domaine,tablesLength,
							mustUse = [],
							badProvince = false;

							if(tables.length != voiceNames.length){
								console.error("Une erreur est survenue lors de l'analyze des voix. Veuillez vous assurer que la photo des voix ne contient que les tableaux de voix.",tables.length, voiceNames.length,domainKeys[i]);
								throw new Error("Une erreur est survenue lors de l'analyze des voix. Veuillez vous assurer que la photo des voix ne contient que les tableaux de voix.");
							}

							forms.forEach((form)=>{
								let key = form[0],
								value = form[1],
								current = pvRef[key];

								if(current){
									if(current.domain){
										domaine = value;
									}
									if(current.use){
										mustUse.push(value);
									}
									key = current.name;

									puke.push(key);
									params.push(value);
								}
							});
							puke.push('img');
							params.push(pvName);

							sql = sql.replace('--',puke.join(','));
							sql = sql.replace('---', puke.map(()=> '?').join(','));

							//console.log(mysql.format(sql,params));
							//console.log('');
							//console.log('DOMAINE IS',domaine);
							//console.log('');


							let response = await this.do(sql,params,conn),
							idPv = response.insertId;

							tablesLength = tables.length;

							for(let i=0; i < tablesLength; i++){
								let table = tables[i],
								length = table.length,
								voice = voiceNames[i];

								for(let y=0; y < length; y++){
									let row = table[y],
									numero = parseInt(row[0]);
									
									if(numero !== numero){
										console.error("Bad number given",row);
										continue;
									}
									
									sql = 'INSERT INTO Voix(idCandidat,organisation,nombreVoix, idPv, idTem,bv) SELECT Candidat.id,?,?,?,?,? FROM Candidat',
									params = [row[1],row[3],idPv,idTemoin, mustUse[0]];

									if(domaine.toLowerCase() != 'presidentielles'){
										console.log('domaine',domaine);
										sql += ',Temoin,relations WHERE relations.idtem  = Temoin.id && Temoin.id = ? && relations.idcand = Candidat.id && Candidat.numero = ? && Candidat.domain = ? && Candidat.circonscriptionId = ?';
										params.push(idTemoin, numero,domaine,userCirconscriptionId);

										//console.log(mysql.format(sql,params));
									}
									else{
										sql += ' WHERE numero=? && domain = ?';
										params.push(numero,domaine);
									}

									//console.log(mysql.format(sql,params));
									//console.log('');

									try{
										let response = await this.do(sql,params,conn);
										if(!response.affectedRows){
											console.log("Auncune donnée inserré");
										}
										else{
											added++;
										}
									}
									catch(e){
										if(e.code != 'ER_DUP_ENTRY'){
											console.error("Error inserting table",table);
											console.error(e);
											throw e;
										}
										else{
											console.error("Duplicate entry found",row);
										}
									}

									//console.log('');
									//console.log(mysql.format(sql,params));
								}

								sql = 'INSERT INTO pvFiles (idPv,file,role) VALUES(?,?,?)';
								params = [idPv, voiceNames[i],'voix'];

								await this.do(sql,params,conn);
							}

							params = [];
							sql = preuveNames.map((preuve)=>{
								params.push(idPv,preuve,'preuve');
								return `INSERT INTO pvFiles (idPv,file,role) VALUES(?,?,?)`;
							}).join(';');

							await this.do(sql,params,conn);
						}

						let sql = 'INSERT INTO Tracking (idTem,analyzedDocument) VALUES(?,?)',
						params = [idTemoin,analyzedDocument];

						await this.do(sql,params,conn);

						conn.commit((err)=>{
							if(err){
								reject(err);
							}
							else{
								resolve({ added });
							}
						})
					}
					catch(e){
						conn.rollback(()=>{
							reject(e);
						});
					}

				})
			})
		})

		/*return this.do(sql,params).then(addResponse).catch((error)=>{
			throw addResponse({},error);
		})*/
	}

	this.updateBulletin = (id,status)=>{
		let sql = 'UPDATE Bulletin SET status = ? WHERE id=?',
		params = [status,id];

		return this.do(sql,params).then(updResponse).catch((error)=>{
			throw updResponse({},error);
		})
	}

	this.addVote = ({president=null,national=null,provincial=null, bulletinId})=>{
		let sql = `INSERT INTO Vote SELECT id,? FROM Candidat WHERE numero = ? AND domaine = 'Presidentiel';
			INSERT INTO Vote SELECT id,? FROM Candidat WHERE numero = ? AND domaine = 'National';
			INSERT INTO Vote SELECT id,? FROM Candidat WHERE numero= ? AND domaine = 'Provincial'`,
		params = [bulletinId,president,bulletinId,national, bulletinId,provincial],
		err;

		return new Promise((resolve,reject)=>{
			conn.beginTransaction(async (err)=>{
				if(err){
					reject(err);
				}
				else{
					let r= await this.do(sql,params).catch((error)=>({error}));

					if(!r.error){
						for(let i=0; i < r.length; i++){
							if(!r[i].affectedRows){
								err = true;
								conn.rollback((err)=>{
									if(err){
										reject(err)
									}
									else{
										reject(errorHandler(new Error("Bulletin invalid")));
									}
								})
							}
						}

						if(!err){
							conn.commit((err)=>{
								if(err){
									reject(err);
								}
								else{
									resolve(addResponse(r));
								}
							})
						}
					}
					else{
						conn.rollback((err)=>{
							if(err){
								reject(err);
							}
							else{
								reject(addResponse({},r.error));
							}
						})
					}
				}
			})
		})
	}

	this.getLeaderBoardAll = (o={})=>{
		let { column } = o,
		sql = `SELECT count(*) as total, CONCAT(nom,' ',prenom,' ',postnom) as noms,image, domaine FROM Candidat,Vote WHERE candidatId=Candidat.id GROUP BY nom,numero ORDER BY total DESC`,
		domaine = (column == 'president')? 'presidentiel':column,
		params = [];

		if(column){
			sql = `SELECT count(*) as total, CONCAT(nom,' ',prenom,' ',postnom) as noms,image, domaine,numero FROM Candidat,Vote WHERE candidatId=Candidat.id AND domaine=? GROUP BY nom,numero ORDER BY total DESC`;
			params.push(domaine);
		}


		return this.do(sql,params).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.getResume = (numero,column)=>{
		let sql = `SELECT count(*) as total, CONCAT(nom,' ',prenom,' ',postnom) as noms,image,numero, domaine FROM Candidat,Vote WHERE ${column}=numero AND ${column}=? GROUP BY nom,numero ORDER BY total DESC;
		SELECT img from Bulletin,Vote WHERE Bulletin.id = Vote.bulletinId AND ${column}=?
		`,
		params = [numero,numero];

		return this.do(sql,params).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.close = ()=>{
		conn.end((err)=>{
			if(err){
				console.error(err);
			}
		})
	}
}

/*let data = JSON.parse((await fs.readFile('../textract/fullTable')).toString()),
me = new dbClass(Options);

try{
	console.log(data.dataReturn.presidentiel);
	//await me.addPv({...data, idTemoin:4, userProvince:'nord kivu', userCirconscriptionId:146});
}
catch(e){
	console.error(e);
}

me.close();*/