const toStrip = /[^a-z\s]/gi,
extraSpace = /\s{2,}/g,
standardize = [
	[/[àáâäæãåā]/gi,'a'],
	[/[èéêëēėę]/gi,'e'],
	[/[ôöòóœøōõ]/gi,'o'],
	[/[çćč]/gi,'c'],
	[/[îïíīįì]/gi,'i'],
	[/[ûüùúū]/gi,'u']
],
domainPattern = /(nationales|provinciales|presidentielles)/i;

export function sanitize(string){
	let newString = standardize.reduce((x,y)=>{
		x = x.replace(y[0],y[1]);
		return x;
	},string).replace(toStrip,' ').replace(extraSpace,' ');

	return newString.toLowerCase();
}

export function dePonctuate(string){
	let result = standardize.reduce((x,y)=>{
		return x.replace(y[0],y[1]);
	}, string);

	return result;
}

export const pvRef = {
	"provinces":{ name:'province' },
	"territoires villes": { name:'territoireVille' },
	"sect chef com":{ name:'sectChefCom' },
	"sv bv": { name:'svbv' },
	"bv":{ name:'bv', use:true },
	"legislative": { name:'typeElection', domain:true, conversion:(key)=> key.match(domainPattern)[1] },
	"total electeurs sur la liste":{ name:'totalElecteur' },
	"suffrages valablement exprimes": { name:'suffrage' },
	"taux de participation": { name:'tauxParticipation' },
	"bulletins de vote non valides":{ name:'bulletinNonValide' },
	"bulletins blancs": { name:'bulletinBlanc' },
	"total candidats": { name: 'totalCandidat'},
	"candidats ayant obtenu au moins une voix":{ name:'candidatVoixNonNull' },
	"total des votants sur la liste":{ name:'totalVotantListe' },
}

export function isDomain(key){
	return domainPattern.test(key);
}

console.log(sanitize('Bas-Uele'));