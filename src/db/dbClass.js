import mysql from 'mysql';

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
			inserted: Number.isInteger(response.insertId),
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
			updated: Boolean(response.affectedRows),
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
		let sql = 'INSERT INTO Candidat(nom,prenom,postnom,numero,domaine,image) VALUES(?,?,?,?,?,?)',
		params = [nom,prenom,postnom,numero,domaine,image];

		return this.do(sql,params).then(addResponse).catch((error)=>{
			throw addResponse({},error);
		})
	}

	this.getCandidates = ({total})=>{
		let sql = `SELECT CONCAT(nom,' ',prenom,' ',postnom) AS noms,numero,domaine,image,id FROM Candidat`,
		sql2 = "SELECT count(*) as total FROM Candidat";

		if(total){
			sql = sql2;
		}

		return this.do(sql).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.addTemoin = ({nom,prenom,postnom,password,email,telephone,image, province})=>{
		let sql = 'INSERT INTO Temoin(nom,prenom,postnom,password,email,telephone,image,province) VALUES(?,?,?,?,?,?,?,?)',
		params = [nom,prenom,postnom,password,email,telephone,image,province];

		return this.do(sql,params).then(addResponse).catch((error)=>{
			throw addResponse({},error);
		})
	}

	this.getTemoins = ({total})=>{
		let sql = "SELECT CONCAT(nom,' ',prenom,' ',postnom) AS noms, email,telephone,image,province FROM Temoin",
		sql2 = "SELECT count(*) as total FROM Temoin";

		if(total){
			sql = sql2;
		}

		return this.do(sql).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.getBulletins = ({total})=>{
		let sql = 'SELECT count(*) as total FROM Bulletin',
		sql2 = 'SELECT * FROM Bulletin';

		if(!total){
			sql = sql2;
		}

		return this.do(sql).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.addBulletin = ({img,commentaire,status})=>{
		let sql = 'INSERT INTO Bulletin(img,commentaire,status) VALUES(?,?,?)',
		params = [img,commentaire,status];

		return this.do(sql,params).then(addResponse).catch((error)=>{
			throw addResponse({},error);
		})
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
}