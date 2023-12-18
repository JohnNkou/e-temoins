import { StartDocumentAnalysisCommand, GetDocumentAnalysisCommand, TextractClient } from '@aws-sdk/client-textract'
import fs from 'fs/promises';
import { sanitize } from '/Users/alainkashoba/Node/e-temoins/src/conversion.js'

let config = {
   region:'us-east-1',
   credentials:{ accessKeyId:'AKIATNHOUSMIRJQXVKRI', secretAccessKey:'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' },
   collectionName:(process.env.TESTING)? 'FF':'Dev'
},
client = new TextractClient(config),
input = {
	DocumentLocation:{
		S3Object:{
			Bucket:'e-temoins',
		}
	},
	FeatureTypes:['TABLES'],
	NotificationChannel:{
		RoleArn:"arn:aws:iam::234576188177:role/textract_notify_parsed",
		SNSTopicArn:"arn:aws:sns:us-east-1:234576188177:pdf_analyzed"
	}
},
names = ['CENI RDC - Liste Definitive Deputation Nationale 2023 - BAS-UELE.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - EQUATEUR.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - HAUT-KATANGA.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - HAUT-LOMAMI.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - HAUT-UELE.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - ITURI.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - KASAI CENTRAL.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - KASAI ORIENTAL.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - KASAI.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - KINSHASA.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - KONGO CENTRAL.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - KWANGO.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - KWILU.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - LOMAMI.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - LUALABA.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - MAI-NDOMBE.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - MANIEMA.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - MONGALA.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - NORD-KIVU.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - NORD-UBANGI.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - SANKURU.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - SUD-KIVU.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - SUD-UBANGI.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - TANGANYIKA.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - TSHOPO.pdf',
  'CENI RDC - Liste Definitive Deputation Nationale 2023 - TSHUAPA.pdf'],
names2 = await fs.readdir('/Users/alainkashoba/Downloads').then((datas)=> datas.filter((data)=> data.indexOf('Deputation Provinciale') != -1)),
jobIds = {
	'bas uele': '689dad90370a1181c1b6fc1f5041c191be98165737ba2567d01b0b4c4899e73a',
  'equateur': '1735bbdad26d8de396b5c0915352790cd4c487ddcc47fe19cfd1cb6daa9dc69d',
  'haut katanga': '02cf2842a042be8ec1f2d745e4147ad1c16cb45f70405208830641b30f9883e6',
  'haut lomami': '5adcf6d1e505457aee8ca398f2346a5f7e78f8bac10a84c73349f82fddeb50a9',
  'haut uele': '188ea13a0f8eb97848be98eea4111eb20dc5d4ea0d85d2404e82e6da89363b47',
  'ituri': '00745236e2bc38744220408909a0705003252a61c229a869737327937122cf8d',
  'kasai central': '6ec200f2a8d7fd66f89c9e7a5bb52211ec57196ee7e2df0316d81bfc63205fdb',
  'kasai oriental': '10373a42b7d785678f425d61a533befd1f9b69ecea2eda6d6c9415e8ec735ab0',
  'kasai': '0439422fe5eb5b1055fb8c2b2d079fba7faace3fdbeaa7ff5a54331c4946380e',
  'kinshasa': '5887c5cbc9b68ccefbc2e8957bc723d1622fcfd1a0d1dd98dac71fdf55731359',
  'kongo central ': '9f87314e0294368a66895acafdb1cff48c10540032481c3abf102ad66a301a86',
  'kwango': '2215d7b59fbd57de73854a00148ebedf37eea4dbca17529dd412183f126f4814',
  kwilu: '50ca59e45483e6cd7b7bf20aa30ab2468709e676f08fd0421fc55a58c1357b70',
  lomami: '0fa42d760f1caf02e1e92fa5b9e11b65b9d7ef0ca36b39e0b6b8fb0734816cd4',
  lualaba: 'e4d3cc29377779a3e60b7f9d0ea670afd586bc69272cdab83c8cf10cb162192e',
  'mai ndombe': '3bde41afb8de566a4f0ae8d5a5239300a97e075c6b22c23df27d5be13a5120a1',
  maniema: 'f4ebfee3697dba0500932a98e10da0edceaa9ce8a3344f1f574a05d8cdafdc1b',
  'mongala': '86afe78d42f9dd47e52fa2d4fb153914a7cdb59cdedda0a12901db71fd6a72f4',
  'nord kivu': 'af1ac125cb3de4ad45ef7ac173cba152ed425517f03bb1169da19b490bce2f92',
  'nord ubangi': 'a3768a6818e1c53a19e741bdaa2b53ce8a3900dcccfb0aea894d62c09b9054fe',
  sankuru: '9f017d6f21aaa284af3b8187cd96867ccccf038db56e6eacd4061eae0e64a994',
  'sud kivu': 'a39a4b6770edd003c31b8156c40639dd383b3425a45514a77063af90ee9c0f9f',
  'sud ubangi': 'ac0257d3f16d32eb86c28d879d7a7f36134cbefcb137555b7ec7bf8d5a319e98',
  tanganyika: '684d991cfcc8f38737ae999034891da755a35106ab49d8993c75e5f9acff8e69',
  'tshopo': '8d87b9335f53e5dfa9106a73b9c90d8d93eedb2526defeda130c035033a197ab',
  tshuapa: 'c7dc770c39c16c6840fbf7d336d4e6ba0eadf3763628f53802f6592aaf690745'
},
length = names.length,
dirName = '/Users/alainkashoba/Node/e-temoins/src/textract/nationale',
provinces = Object.keys(jobIds),
length2 = provinces.length;


/*for(let i=0; i < length2; i++){
	let province = provinces[i],
	id = jobIds[province],
	input = { JobId:id, MaxResults:10000 },
	response,
	Blocks = [];

	do{
		let params = { JobId:id, MaxResults:1000 };

		if(response && response.NextToken){
			params.NextToken = response.NextToken;
		}

		response = await client.send(new GetDocumentAnalysisCommand(params));

		Blocks = Blocks.concat(response.Blocks);

	}while(response.NextToken);

	await fs.writeFile(`${dirName}/${province}`,JSON.stringify({Blocks}));
}*/




/*for(let i=0; i < length; i++){
	let filename = names2[i],
	province = sanitize(filename.split(' - ')[2].replace('.pdf','')),
	response;

	console.log(filename);

	input.DocumentLocation.S3Object.Name = `ProvincialesFiles/${filename}`;

	response = await client.send(new StartDocumentAnalysisCommand(input));
	jobIds[province] = response.JobId;
}

console.log(jobIds); */





/*do{
	let params = {
		JobId, MaxResults:1000
	}

	if(response && response.NextToken){
		params.NextToken = response.NextToken;
	}

	response = await client.send(new GetDocumentAnalysisCommand(params));

	Blocks = Blocks.concat(response.Blocks);

}while(response.NextToken);

console.log(response);

await fs.writeFile('/Users/alainkashoba/Node/e-temoins/src/textract/nationale',JSON.stringify({ Blocks }));*/

let details = {},
p = 'lomami';


let r = await getDetails(p),
pLower = p;
p = p.toUpperCase();

Object.keys(r[p]).forEach((key)=>{
	console.log(key);
	r[p][key].forEach((d)=> console.log(`INSERT IGNORE INTO Candidat(numero,nom,prenom,postnom,domain,image,province,circonscriptionId) SELECT ${d[0]},"${d[1]}","${d[3]}","${d[2]}",'Nationales','nationale.jpg',"${pLower}",id FROM Circonscription WHERE nom = '${key}';\n`)) 
})

	/*console.log(`INSERT IGNORE INTO Candidat(numero,nom,prenom,postnom,domain,image,province,circonscriptionId) SELECT ${d[0]},"${d[1]}","${d[3]}","${d[2]}",'Nationales','nationale.jpg',"${pLower}",id FROM Circonscription WHERE nom = '${key}';\n`)*/;

async function getDetails(currentProvince){

	let data = JSON.parse((await fs.readFile(`${dirName}/${currentProvince}`)).toString()),
	ids = {}, details = {},
	currentCir, tableIndex,head,indent = 0;

	currentProvince = currentProvince.toUpperCase();

	details[currentProvince] = {}

	//data.Blocks.forEach((bb)=>{ ids[bb.Id] = bb; })

	data.Blocks.forEach((bb)=>{
		ids[bb.Id] = bb;
		if(bb.BlockType == 'CELL'){
			let row = bb.RowIndex,
			column = bb.ColumnIndex;

			if(row){
				if(row == 1){
					let n = getText(ids,bb) || '';

					if(n.indexOf('SIEGE') != -1){
						let headString = head.join(' '),
						i1 = headString.indexOf('Circonscription:'),
						cip = headString.slice(i1);

						currentCir = sanitize(headString.slice(i1+16).trim());

						if(currentCir.indexOf('circonscription') != -1){
							currentCir = (currentCir.slice(currentCir.indexOf('circonscription') + 16)).trim(); 
						}

						if(currentCir.indexOf('mbuji may') != -1){
							currentCir = 'mbuji mayi ville';
						}
						else if(currentCir.indexOf('lubumbashiville') != -1){
							currentCir = 'lubumbashi ville';
						}
						else if(currentCir.indexOf('mwene dituville') != -1){
							currentCir = 'mwene ditu ville';
						}
							
						if(!details[currentProvince][currentCir]){
							details[currentProvince][currentCir] = [];
							tableIndex = null;
							indent = 0;
						}
					}

					if(!head){
						head = [];
					}
					head.push(n);
				}
				if(row >= 3){
					if((row % 3) != 0)
						return;
					head = [];
					if(column == 1){

						if(tableIndex != undefined){
							tableIndex++;
						}
						else{
							tableIndex = 0;
						}

						if(!details[currentProvince][currentCir][tableIndex]){
							details[currentProvince][currentCir][tableIndex] = [];
						}
					}

					if(p == 'lualaba'){

						switch(column){
						case 1:
						case 4:
						case 5:
						case 6:
						case 7:
							let text = getText(ids,bb);

							if(column == 1){
								text = tableIndex + 1;
							}

							if(column == 4 && text.indexOf('DP7') != -1){
								return ;
							}

							if(column == 7 && /M|F/i.test(text)){
								return;
							}

							/*if(!details[currentProvince][currentCir][tableIndex].length){
								details[currentProvince][currentCir][tableIndex].push(`-- ${tableIndex} --`);
							}*/

							details[currentProvince][currentCir][tableIndex].push(text);
							break;
						}
					}
					else{
						switch(column){
						case 1:
						case 5:
						case 6:
						case 7:
							let text = getText(ids,bb);

							details[currentProvince][currentCir][tableIndex].push(text);
							break;
						}
					}
				}
			}
		}
	})

	return details;
}

function getText(ids,bb){
	let text = '';

	if(bb.Relationships){
		bb.Relationships.forEach((rel)=>{
			rel.Ids.forEach((id)=>{
				text += ids[id].Text;
			})
		})
	}

	return text;
}