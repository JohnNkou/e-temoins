use Ceni;

#select c.id,domain,c.nom,prenom,numero,c.province,cc.nom as circonscription FROM Candidat as c, Circonscription as cc WHERE c.circonscriptionId = cc.id && c.id in (138821,138824,138836,504048,1346044,1346046);

#138821

#select * FROM Voix;

SELECT c.numero,c.nom,c.postnom,c.province,domain,cc.nom,t.nom,t.telephone,t.otpcode FROM relations as r, Temoin as t, Candidat as c, Circonscription as cc WHERE idtem = t.id && idcand = c.id && c.circonscriptionId = cc.id ORDER BY cc.nom,t.nom,c.domain,t.telephone;

#SELECT id,numero FROM Candidat ORDER BY numero;

#Select * from Candidat WHERE numero = 3 AND domain = 'Presidentielles';

#select * FROM relations;

#INSERT INTO relations(idtem,idcand,status) VALUES(3,138828,1),(3,504003,1),(3,504029,1),(3,504054,1),(3,1346025,1);