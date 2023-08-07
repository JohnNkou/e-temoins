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

	this.getCandidates = ()=>{
		let sql = `SELECT CONCAT(nom,' ',prenom,' ',postnom) AS noms,numero,domaine,image,id FROM Candidat`;

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

	this.getTemoins = ()=>{
		let sql = "SELECT CONCAT(nom,' ',prenom,' ',postnom) AS noms, email,telephone,image FROM Temoin";

		return this.do(sql).then(getResponse).catch((error)=>{
			throw getResponse([],error);
		})
	}

	this.addBulletin = ({img,commentaire})=>{
		let sql = 'INSERT INTO Bulletin(img,commentaire) VALUES(?,?)',
		params = [img,commentaire];

		return this.do(sql,params).then(addResponse).catch((error)=>{
			throw addResponse({},error);
		})
	}

	this.addVote = ({president=null,national=null,provincial=null, bulletinId})=>{
		let sql = 'INSERT INTO Vote (president,national,provincial,bulletinId) VALUES(?,?,?,?)',
		params = [president,national,provincial,bulletinId];

		return this.do(sql,params).then(addResponse).catch((error)=>{
			throw addResponse({}, error);
		})
	}
}