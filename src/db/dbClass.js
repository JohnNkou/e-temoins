import mysql from 'mysql';
import { pvRef } from '../conversion.js'
import Options from './db.js'
import fs from 'fs/promises';

//let data = JSON.parse((await fs.readFile('../textract/an.json')).toString());

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

	this.do = (sql,params=[])=>{
		return new Promise((resolve,reject)=>{
			conn.query(sql,params,(err,result)=>{
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

	this.addCandidat = ({nom,prenom,postnom,numero,domaine,image})=>{
		let sql = 'INSERT INTO Candidat(nom,prenom,postnom,numero,domain,image) VALUES(?,?,?,?,?,?)',
		params = [nom,prenom,postnom,numero,domaine,image];

		return this.do(sql,params).then(addResponse).catch((error)=>{
			throw addResponse({},error);
		})
	}

	this.getCandidates = ({total})=>{
		let sql = `SELECT id,CONCAT(nom,' ',prenom,' ',postnom) AS noms,numero,domain,image,id FROM Candidat`,
		sql2 = "SELECT count(*) as total FROM Candidat";

		if(total){
			sql = sql2;
		}

		return this.do(sql).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.addUser = ({nom,prenom,postnom,password,email,telephone,image, province,status=0,role,idCandidats})=>{
		let sql = 'INSERT INTO Temoin(nom,prenom,postnom,password,email,telephone,image,province,status,role) VALUES(?,?,?,?,?,?,?,?,?,?)',
		values,
		params = [nom,prenom,postnom,password,email,telephone,image,province,status,role];

		return new Promise((resolve,reject)=>{
			conn.beginTransaction(async (error)=>{
				if(error){
					return reject(error);
				}

				try{
					let response = await this.do(sql,params),
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

						response = await this.do(sql,params);

						if(response.affectedRows == idCandidats.length){
							resolve(addResponse(response));
						}
						else{
							console.error("THe number of row inserted is different than the number of candidats");
							console.error(response,idCandidats);
							conn.rollback(()=>{
								resolve(addResponse({affectedRows:0}));
							})
						}
					}
					else{
						resolve(addResponse(response));
					}
				}
				catch(e){
					console.error("Error",e);
					conn.rollback(()=>{
						reject(e);
					});
				}
			})
		})

		return this.do(sql,params).then(addResponse).catch((error)=>{
			throw addResponse({},error);
		})
	}

	this.getTemoins = ({total})=>{
		let sql = "SELECT nom,prenom,postnom, email,telephone,image,province FROM Temoin WHERE role = 'temoin'",
		sql2 = "SELECT count(*) as total FROM Temoin WHERE role='temoin'";

		if(total){
			sql = sql2;
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

	this.addPv = ({tables,forms,idTemoin})=>{
		let sql = 'INSERT INTO referencePV(--) VALUES(---)',
		puke = [],
		params = [],
		domaine,length,table,
		added = 0;

		forms.forEach((form)=>{
			let key = form[0],
			value = form[1],
			current = pvRef[key];

			if(current){
				if(current.conversion){
					value= current.conversion(key,value);
					domaine = value;
				}
				key = current.name;
				puke.push(key);
				params.push(value);
			}
		});

		sql = sql.replace('--',puke.join(','));
		sql = sql.replace('---', puke.map(()=> '?').join(','));

		console.log(sql);
		console.log('DOMAINE IS',domaine);

		return new Promise((resolve,reject)=>{
			conn.beginTransaction(async (error)=>{
				if(error){
					return reject(error);
				}

				try{
					let response = await this.do(sql,params),
					idPv = response.insertId;

					length = tables[1].length;

					for(let i=1; i < length; i++){
						table = tables[1][i];
						let numero = table[0];
						sql = 'INSERT INTO Voix(idCandidat,organisation,nombreVoix, idPv, idTem) SELECT Candidat.id,?,?,?,? FROM Candidat,Temoin,relations WHERE relations.idtem  = Temoin.id && Temoin.id = ? && relations.idcand = Candidat.id && Candidat.numero = ? && Candidat.domain = ?',
						params = [table[1],table[3],idPv,idTemoin, idTemoin, numero,domaine];

						try{
							let response = await this.do(sql,params);
							if(!response.affectedRows){
								console.log("Auncune donnée inserré");
							}
							else{
								added++;
							}
						}
						catch(e){
							console.error("Error inserting table",table);
							console.error(e);
							throw e;
						}

						console.log('');
						console.log(mysql.format(sql,params));
					}
				}
				catch(e){
					reject(e);
					return conn.rollback(()=>{});
				}

				conn.commit((err)=>{
					if(err){
						conn.rollback(()=>{});
						reject(err);
					}
					else{
						resolve({added});
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

/*let me = new dbClass(Options);

console.log(await me.addPv({...data, idTemoin:2}));
me.close();*/