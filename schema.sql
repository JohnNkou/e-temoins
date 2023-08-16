CREATE TABLE IF NOT EXISTS Temoin(
	id int primary key auto_increment,
	nom varchar(50) not null,
	prenom varchar(50) not null,
	postnom varchar(50) not null,
	password varchar(100) not null,
	email varchar(200) not null,
	telephone varchar(10) not null,
	image varchar(200) not null,
	province varchar(70) not null,
	UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS Candidat(
	id int primary key auto_increment,
	nom varchar(50) not null,
	prenom varchar(50) not null,
	postnom varchar(50) not null,
	numero varchar(4) not null,
	domaine ENUM('Presidentiel','National','Provincial'),
	image varchar(200) not null,
	UNIQUE(numero,domaine)
);

CREATE TABLE IF NOT EXISTs Observateur(
	id int primary key auto_increment,
	email varchar(50) not null,
	password varchar(100) not null
);

CREATE TABLE IF NOT EXISTS Bulletin(
	id int primary key auto_increment,
	img varchar(200) not null,
	commentaire text,
	status enum('success','failed','failedVote') not null
);

CREATE TABLE IF NOT EXISTS Vote(
	candidatId integer,
	bulletinId int NOT NULL,
	FOREIGN KEY(candidatId) REFERENCES Candidat(id),
	FOREIGN KEY(bulletinId) REFERENCES Bulletin(id),
	UNIQUE(candidatId,bulletinId)
);