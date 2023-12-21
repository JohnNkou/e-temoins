USE Ceni;

CREATE TABLE IF NOT EXISTS Province(
    nom varchar(100) not null PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Circonscription(
    id int not null primary key auto_increment,
    nom varchar(100) not null,
    province varchar(100) not null REFERENCES Province(name)
);

CREATE TABLE IF NOT EXISTS Candidat (
    id int primary key auto_increment,
    numero varchar(4) not null,
    nom varchar(50) not null,
    prenom varchar(50) not null,
    postnom varchar(50) not null,
    domain enum('Presidentielles', 'Nationales', 'Provinciales') NOT NULL,
    image varchar(200) not null,
    circonscriptionId int not null REFERENCES Circonscription(id),
    UNIQUE(numero,domain,province,circonscriptionId)
);

CREATE TABLE IF NOT EXISTS Temoin(
id int auto_increment primary key ,
nom varchar(50) not null,
prenom varchar(50) not null,
postnom varchar(50) not null,
password varchar(100) not null,
email varchar(200) not null,
role varchar(50) not null,
otpcode varchar(200),
statuscompte varchar(50) DEFAULT 'NO',
telephone varchar(10) not null,
image varchar(200) not null,
circonscriptionId int not null REFERENCES Circonscription(id),
status int not null,
dateOTP TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP(),
UNIQUE(email),
UNIQUE(telephone)
);

CREATE TABLE IF NOT EXISTS Session(
sessionId varchar(200) not null,
idCand int,
idTem int,
derniereDate TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP(),
FOREIGN KEY (idCand) REFERENCES Candidat(id),
FOREIGN KEY (idTem) REFERENCES Temoin(id),
UNIQUE(idCand),
UNIQUE(idTem)
);

CREATE TABLE IF NOT EXISTS referencePV(
idPv int not null auto_increment primary key ,
province varchar(500) NOT NULL REFERENCES Province(name),
territoireVille varchar(500) not null,
sectChefCom varchar(1000) NOT NULL,
svbv varchar(1000) NOT NULL,
bv varchar(1000) NOT NULL,
typeElection varchar(1000) NOT NULL,
totalElecteur varchar(100) NOT NULL,
suffrage varchar(1000) NOT Null,
tauxParticipation varchar(100) NOT NULL,
bulletinNonValide varchar(100) NOT NULL,
bulletinBlanc varchar(100) NOT NULL,
totalCandidat varchar(100) NOT NULL,
candidatVoixNonNull varchar(100) NOT NULL,
totalVotantListe varchar(100) NOT NULL,
img varchar(500) not null
);

CREATE TABLE IF NOT EXISTS relations(
id int not null primary key auto_increment,
idtem int not null,
idcand int not null,
status int not null DEFAULT '1',
FOREIGN KEY (idtem) REFERENCES Temoin(id),
FOREIGN KEY (idcand) REFERENCES Candidat(id),
UNIQUE(idtem,idcand)
);

CREATE TABLE IF NOT EXISTS pvFiles(
    id int not null primary key auto_increment,
    idPv int not null,
    file varchar(500) not null,
    role enum('voix','preuve') not null,
    FOREIGN KEY (idPv) REFERENCES referencePV(idPv)
);

CREATE TABLE IF NOT EXISTS Voix(
idVoix int not null auto_increment primary key ,
idCandidat int not null,
organisation varchar(100),
nombreVoix varchar(10000) not null,
idPv int not null,
idTem int not null,
statusRelation varchar(100) not null DEFAULT 'ON',
dateCreated datetime default CURRENT_TIMESTAMP(),
localisation varchar(1000),
status int not null DEFAULT '1',
bv varchar(100) not null,
FOREIGN KEY(idTem) REFERENCES Temoin(id),
UNIQUE(idCandidat,bv),
UNIQUE(idCandidat,idTem)
);

CREATE TABLE IF NOT EXISTS Limitation(
    name varchar(100) not null primary key,
    value varchar(100) not null
);

CREATE TABLE IF NOT EXISTS Tracking(
    id int not null auto_increment primary key,
    idTem int not null REFERENCES Temoin(id),
    analyzedDocument tinyint not null,
    dateAnalyzed TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE IF NOT EXISTS tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    access_token VARCHAR(5000) NOT NULL,
    expiration_time INT NOT NULL
);

INSERT INTO Province VALUES ('bas uele'),('equateur'),('haut katanga'),('haut lomami'),('haut uele'),('ituri'),('kasai'),('kasai central'),('kasai oriental'),('kinshasa'),('kongo central'),('kwango'),('kwilu'),('lomami'),('lualaba'),('mai ndombe'),('maniema'),('mongala'),('nord kivu'),('nord ubangi'),('sankuru'),('sud kivu'),('sud ubangi'),('tanganyika'),('tshopo'),('tshuapa'),('TOUS') ON DUPLICATE KEY UPDATE nom=nom;

INSERT INTO Limitation VALUES('AnalyzedDocumentLimit',5) ON DUPLICATE KEY UPDATE name=name;

INSERT INTO Circonscription(nom,province) VALUES ('aketi','bas uele'),('ango','bas uele'),('bambesa','bas uele'),('bondo','bas uele'),('buta','bas uele'),('buta ville','bas uele'),('poko','bas uele') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('basankusu','equateur'),('bikoro','equateur'),('bolomba','equateur'),('bomongo','equateur'),('ingende','equateur'),('lukolela','equateur'),('mankanza','equateur'),('mbandaka ville','equateur') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('kambove','haut katanga'),('kasenga','haut katanga'),('kipushi','haut katanga'),('likasi ville','haut katanga'),('lubumbashi ville','haut katanga'),('mitwaba','haut katanga'),('pweto','haut katanga'),('sakania','haut katanga') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('bukama','haut lomami'),('kabongo','haut lomami'),('kamina','haut lomami'),('kamina ville','haut lomami'),('kaniama','haut lomami'),('malemba nkulu','haut lomami') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('dungu','haut uele'),('faradje','haut uele'),('isiro ville','haut uele'),('niangara','haut uele'),('rungu','haut uele'),('wamba','haut uele'),('watsa','haut uele') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('aru','ituri'),('bunia ville','ituri'),('djugu','ituri'),('irumu','ituri'),('mahagi','ituri'),('mambasa','ituri') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('dekese','kasai'),('ilebo','kasai'),('luebo','kasai'),('mweka','kasai'),('tshikapa','kasai'),('tshikapa ville','kasai') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('demba','kasai central'),('dibaya','kasai central'),('dimbelenge','kasai central'),('kananga ville','kasai central'),('kazumba','kasai central'),('luiza','kasai central') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('kabeya kamwanga','kasai oriental'),('katanda','kasai oriental'),('lupatapata','kasai oriental'),('mbuji mayi ville','kasai oriental'),('miabi','kasai oriental'),('tshilenge','kasai oriental') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('bandalungwa','kinshasa'),('barumbu','kinshasa'),('bumbu','kinshasa'),('gombe','kinshasa'),('kalamu','kinshasa'),('kasa vubu','kinshasa'),('kimbanseke','kinshasa'),('kinshasa','kinshasa'),('kintambo','kinshasa'),('kisenso','kinshasa'),('lemba','kinshasa'),('limete','kinshasa'),('lingwala','kinshasa'),('makala','kinshasa'),('maluku','kinshasa'),('masina','kinshasa'),('matete','kinshasa'),('mont ngafula','kinshasa'),('ndjili','kinshasa'),('ngaba','kinshasa'),('ngaliema','kinshasa'),('ngiri ngiri','kinshasa'),('nsele','kinshasa'),('selembao','kinshasa'),('kinshasa i lukunga','kinshasa'),('kinshasa ii funa','kinshasa'),('kinshasa iii mont amba','kinshasa'),('kinshasa iv tshangu','kinshasa') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('boma ville','kongo central'),('kasangulu','kongo central'),('kimvula','kongo central'),('lukula','kongo central'),('luozi','kongo central'),('madimba','kongo central'),('matadi ville','kongo central'),('mbanza ngungu','kongo central'),('moanda','kongo central'),('seke banza','kongo central'),('songololo','kongo central'),('tshela','kongo central') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('feshi','kwango'),('kahemba','kwango'),('kasongo lunda','kwango'),('kenge','kwango'),('kenge ville','kwango'),('popokabaka','kwango') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('kabinda','lomami'),('kabinda ville','lomami'),('kamiji','lomami'),('lubao','lomami'),('luilu mwene ditu ','lomami'),('mwene ditu ville','lomami'),('ngandajika','lomami') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('bagata','kwilu'),('bandundu ville','kwilu'),('bulungu','kwilu'),('gungu','kwilu'),('idiofa','kwilu'),('kikwit ville','kwilu'),('masi manimba','kwilu') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('dilolo','lualaba'),('kapanga','lualaba'),('kolwezi ville','lualaba'),('lubudi','lualaba'),('mutshatsha','lualaba'),('sandoa','lualaba') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('bolobo','mai ndombe'),('inongo','mai ndombe'),('inongo ville','mai ndombe'),('kiri','mai ndombe'),('kutu','mai ndombe'),('mushie','mai ndombe'),('oshwe','mai ndombe'),('yumbi','mai ndombe') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('kabambare','maniema'),('kailo','maniema'),('kasongo','maniema'),('kibombo','maniema'),('kindu ville','maniema'),('lubutu','maniema'),('pangi','maniema'),('punia','maniema') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('bongandanga','mongala'),('bumba','mongala'),('lisala','mongala'),('lisala ville','mongala') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('beni','nord kivu'),('beni ville','nord kivu'),('butembo ville','nord kivu'),('goma ville','nord kivu'),('lubero','nord kivu'),('nyiragongo','nord kivu'),('walikale','nord kivu') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('bosobolo','nord ubangi'),('businga','nord ubangi'),('gbadolite ville','nord ubangi'),('mobayi mbongo','nord ubangi'),('yakoma','nord ubangi') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('katako kombe','sankuru'),('kole','sankuru'),('lodja','sankuru'),('lomela','sankuru'),('lubefu','sankuru'),('lumumba ville','sankuru'),('lusambo','sankuru'),('lusambo ville','sankuru') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('bukavu ville','sud kivu'),('fizi','sud kivu'),('idjwi','sud kivu'),('kabare','sud kivu'),('kalehe','sud kivu'),('mwenga','sud kivu'),('shabunda','sud kivu'),('uvira','sud kivu'),('walungu','sud kivu') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('budjala','sud ubangi'),('gemena','sud ubangi'),('gemena ville','sud ubangi'),('kungu','sud ubangi'),('libenge','sud ubangi'),('zongo ville','sud ubangi') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('kabalo','tanganyika'),('kalemie','tanganyika'),('kalemie ville','tanganyika'),('kongolo','tanganyika'),('manono','tanganyika'),('moba','tanganyika'),('nyunzu','tanganyika') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('bafwasende','tshopo'),('banalia','tshopo'),('basoko','tshopo'),('isangi','tshopo'),('kisangani ville','tshopo'),('opala','tshopo'),('ubundu','tshopo'),('yahuma','tshopo') ON DUPLICATE KEY UPDATE nom=nom;


INSERT INTO Circonscription(nom,province) VALUES ('befale','tshuapa'),('boende','tshuapa'),('boende ville','tshuapa'),('bokungu','tshuapa'),('djolu','tshuapa'),('ikela','tshuapa'),('monkoto','tshuapa') ON DUPLICATE KEY UPDATE nom=nom;

INSERT INTO Circonscription(nom,province) VALUES('TOUS','TOUS');

delimiter |

CREATE EVENT IF NOT EXISTS Session_Otp_Destroyer ON SCHEDULE EVERY 1 MINUTE
    DO 
        BEGIN
            DELETE FROM Session WHERE UNIX_TIMESTAMP() - UNIX_TIMESTAMP(derniereDate) > 1800;
            UPDATE Temoin SET otpcode = NULL WHERE UNIX_TIMESTAMP() - UNIX_TIMESTAMP(dateOTP) >= 300;
        END |

delimiter ;