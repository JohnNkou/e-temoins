import pdf from 'pdf-parse'
import fs from 'fs';
import { sanitize } from '/Users/alainkashoba/Node/e-temoins/src/conversion.js'

let datas = [
	['bas uele', ['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - BAS-UELE.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - BAS-UELE.pdf']],
	['equateur', ['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - EQUATEUR_0.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - EQUATEUR.pdf']],
	['haut katanga',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - HAUT-KATANGA.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - HAUT-KATANGA.pdf']],
	['haut lomami', ['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - HAUT-LOMAMI.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - HAUT-LOMAMI.pdf']],
	['haut uele', ['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - HAUT-UELE.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - HAUT-UELE.pdf']],
	['ituri',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - ITURI_0.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - ITURI.pdf']],
	['kasai',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - KASAI_0.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - KASAI.pdf']],
	['kasai central',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - KASAI CENTRAL.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - KASAI CENTRAL.pdf']],
	['kasai oriental',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - KASAI ORIENTAL.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - KASAI ORIENTAL.pdf']],
	['kinshasa',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - KINSHASA_0.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - KINSHASA.pdf']],
	['kongo central',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - KONGO CENTRAL_0.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - KONGO CENTRAL.pdf']],
	['kwango',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - KWANGO_0.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - KWANGO.pdf']],
	['lomami',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - LOMAMI.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - LOMAMI.pdf']],
	['kwilu',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - KWILU.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - KWILU.pdf']],
	['lualaba',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - LUALABA.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - LUALABA.pdf']],
	['mai ndombe',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - MAI-NDOMBE.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - MAI-NDOMBE.pdf']],
	['maniema',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - MANIEMA.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - MANIEMA.pdf']],
	['mongala',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - MONGALA_0.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - MONGALA.pdf']],
	['nord kivu',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - NORD-KIVU.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - NORD-KIVU.pdf']],
	['nord ubangi',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - NORD-UBANGI.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - NORD-UBANGI.pdf']],
	['sankuru',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - SANKURU.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - SANKURU.pdf']],
	['sud kivu',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - SUD-KIVU.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - SUD-KIVU.pdf']],
	['sud ubangi',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - SUD-UBANGI.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - SUD-UBANGI.pdf']],
	['tanganyika', ['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - TANGANYIKA.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - TANGANYIKA.pdf']],
	['tshopo',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - TSHOPO_0.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - TSHOPO.pdf']],
	['tshuapa',['CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - TSHUAPA.pdf','CENI RDC - Liste Definitive Deputation Nationale 2023 - TSHUAPA.pdf']]
],
matcher = /Circonscription:\s*[\w \-()]+/g,
length = datas.length,
dir = '/Users/alainkashoba/Downloads',
odd = /[^\s\w]/;

for(let i=0; i < length; i++){
	let d = datas[i],
	province = d[0],
	filename = `${dir}/${d[1][0]}`,
	filename2 = `${dir}/${d[1][1]}`,
	file = fs.readFileSync(filename),
	file2 = fs.readFileSync(filename2),
	circque = {},
	bug = [file,file2];

	for(let i=0; i < 2; i++){
		let file = bug[i];

		await pdf(file).then((data)=>{
			let c = data.text.match(matcher);

			if(c){
				c.forEach((cc)=>{
					let kipu = cc.split(':')[1].trim().replace('SIEGE','');
					if(odd.test(kipu)){
						console.log(kipu);
					}
					cc = sanitize(cc.split(':')[1].trim()).replace('siege','');

					if(!circque[cc]){
						circque[cc] = true;
					}
				})
			}
		})
	}

	//console.log('INSERT INTO Circonscription(nom,province) VALUES '+Object.keys(circque).map((key)=> `('${key}','${province}')`).join(',') + " ON DUPLICATE KEY UPDATE nom=nom;");
	//console.log("");
	//console.log("");
}

/*let file = fs.readFileSync('/Users/alainkashoba/Downloads/CENI RDC - Listes Definitives Candidatures Deputation Provinciale 2023 - HAUT-UELE.pdf'),
matcher = ,
province = 'ituri',
circque = {};

await pdf(file).then((data)=>{
	let c = data.text.match(matcher);

	if(c){
		c.forEach((cc)=>{
			cc = sanitize(cc.split(':')[1].trim());

			if(!circque[cc]){
				circque[cc] = true;
			}
		})
	}
})*/
