Le Schema SQL se trouve dans le fichier schemaSql

Les endpoints utilisés et leurs methodes:
	- /api/candidat:{
		- GET: 'retourne la liste des candidat',
		- POST: "Permet d'ajouter un candidat. Le formulaire doit contenir toutes les informations sur les colonnes requit dans la base de donnée (sauf la colonne id)"
	},
	- /api/temoins:{
		- GET: 'retroune la liste des temoins',
		- POST: "Permet d'ajouter un temoin. Le formulaire doit contenir toutes les  informations sur les colonnes requit dans la base de donnée (sauf la colonne id)"
	}
	- /api/bulletin:{
		- GET ' rettourne la liste des bulletins '
		- POST: "Permet d'ajouter les bulletins. Le formulaire doit contenir toutes les informations sur les colonnes requit dans la base de donnée (sauf la colonne id) "
	}

	Toutes le GET method retourne un response suivante:
	{
		data:[],  //array
		error:{} || null  //object ou null
	}

	Toutes le POST method retourne une response suivante:
	{
		inserted: true || false //boolean,
		error:{} || null // object ou null
	}
