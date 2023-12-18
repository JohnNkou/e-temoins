import conn from '../../src/db/db.js'
import dbClass from '../../src/db/dbClass.js'
import { domainKeys } from '../../src/utils/helper.js'
import cookie from 'cookie'

let provinces = {
	'sud ubangi':'Sud-Ubangi',
	'sud kivu':'Sud-Kivu',
	'nord ubangi':'Nord-Ubangi',
	'nord kivu':'Nord-Kivu',
	'mai ndombe':'Mai-Ndombe',
	'haut uele':'Haut-Uele',
	'haut lomami':'Haut-Lomami',
	'haut katanga':'Haut-Katanga',
	'bas uele':'Bas-Uele'
},
circons = {
	'malemba nkulu':'Malemba-Nkulu',
	'kabeya kamwanga':'Kabeya-Kamwanga',
	'mbuji mayi ville':'Mbuji-Mayi Ville',
	'kasa vubu':'Kasa-Vubu',
	'mont ngafula':'Mont-Ngafula',
	'ngiri ngiri':'Ngiri-Ngiri',
	'kinshasa iii mont amba':'Kinshasa III Mont-Amba',
	'mbanza ngungu':'Mbanza-Ngungu',
	'seke banza':'Seke-Banza',
	'mbanza ngungu':'Mbanza-Ngungu',
	'kasongo lunda':'Kasongo-Lunda',
	'luilu mwene ditu':'Luilu (Mwene-Ditu)',
	'mwene ditu ville':'Mwene-Ditu Ville',
	'masi manimba':'Masi-Manimba',
	'mobayi mbongo':'Mobayi-Mbongo',
	'katako kombe':'Katako-Kombe'
}

function convertCir(name){
	if(circons[name]){
		return circons[name];
	}

	return name;
}

function convertProv(name){
	if(provinces[name]){
		return provinces[name];
	}

	return name;
}

export default async function Calcul(req,res){
	let cookies = cookie.parse(req.headers.cookie || ''),
	query = req.query,
	cir = query.cir,
	cirName = query.cirName,
	province = query.province,
	sessionId = cookies && cookies.sessionId,
	db,user;

	try{
		if(!sessionId){
			res.status(501).send('');
		}
		else{
			if(!cir || !cirName || !province){
				return res.status(400).json({msg:'missing data'});
			}

			db = new dbClass(conn);
			user = (await db.getSession(sessionId)).data[0];

			if(user){
				let candidats = (await db.getCandidates({cir})).data,
				data = {},
				tE = 'Total Electeurs sur la liste',
				tV = 'Total des Votants sur la liste',
				sE = 'Suffrages valablement Exprimés',
				tP = 'Taux de Participation',
				bN = 'Bulletins de vote non-valides',
				bB = 'Bulletins Blancs',
				tC = 'Total Candidats',
				cV = 'Candidats ayant obtenu au moins une voix',
				electeurs = 5000 + Math.ceil(Math.random() * 1000),
				pig;

				candidats.forEach((candidat)=>{
					let domain = candidat.domain,
					noms = candidat.noms,
					voix,
					currentDomain,
					Sum;

					if(!data[domain]){
						data[domain] = {
							headRef: {
								'Provinces': convertProv(province),
								'Territoires Villes': convertCir(cirName),
								'sect_chef_com': 'GAUATALA',
								'SV.bv': 'INSTITU DE TEST',
								'BV': 6000 + (Math.random() * 999) + 'D'
							},
							headSum:{
								[tE]:electeurs,
								[tV]:0,
								[sE]:0,
								[tP]:0,
								[bN]:0,
								[bB]:0,
								[tC]:0,
								[cV]:0
							},
							candidats:[]
						}
					}

					currentDomain = data[domain];
					Sum = currentDomain.headSum;

					voix = Math.ceil(Math.random() * 500);
					voix = Math.min(electeurs - Sum[tV],voix);

					if(Sum[tV] != electeurs){
						Sum[tV] = Math.min(Sum[tV] + voix, electeurs);
						Sum[sE] = Sum[tV];
						Sum[cV]++;

						candidat.voix = voix;
					}
					else{
						candidat.voix = 0;
					}
					currentDomain.candidats.push(candidat);

					Sum[tC]++;
				});

				Object.keys(data).forEach((domain)=>{
					let currentDomain = data[domain],
					Sum = currentDomain.headSum;

					Sum[tP] = ((Sum[sE] / Sum[tE]) * 100) + "%";
				})

				res.status(200).json(data);
			}
			else{
				res.status(501).send('');
			}
		}
	}
	catch(e){
		console.error('Error',e);
		res.status(500).json(e);
	}	
}