import mysql from 'mysql';

export default function dbClass(conn){

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
		let sql = 'INSERT INTO Vote (president,national,provincial,bulletinId) VALUES(?,?,?,?)',
		params = [president,national,provincial,bulletinId];

		return this.do(sql,params).then(addResponse).catch((error)=>{
			throw addResponse({}, error);
		})
	}

	this.getLeaderBoardAll = (o={})=>{
		let { column } = o,
		sql = `SELECT count(*) as total, CONCAT(nom,' ',prenom,' ',postnom) as noms,image, domaine FROM Candidat,Vote WHERE president=numero || national=numero || provincial=numero GROUP BY nom,numero ORDER BY total DESC`,
		domaine = (column == 'president')? 'presidentiel':column,
		params = [];

		if(column){
			sql = `SELECT count(*) as total, CONCAT(nom,' ',prenom,' ',postnom) as noms,image, domaine,numero FROM Candidat,Vote WHERE ${column}=numero AND domaine=? GROUP BY nom,numero ORDER BY total DESC`;
			params.push(domaine);
		}


		return this.do(sql,params).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.getResume = (numero,column)=>{ console.log("numero",numero,column);
		let sql = `SELECT count(*) as total, CONCAT(nom,' ',prenom,' ',postnom) as noms,image,numero, domaine FROM Candidat,Vote WHERE ${column}=numero AND ${column}=? GROUP BY nom,numero ORDER BY total DESC;
		SELECT img from Bulletin,Vote WHERE Bulletin.id = Vote.bulletinId AND ${column}=?
		`,
		params = [numero,numero];

		return this.do(sql,params).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}
}