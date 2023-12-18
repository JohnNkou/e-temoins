-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: Ceni
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `Ceni`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Ceni` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `Ceni`;

--
-- Table structure for table `Candidat`
--

DROP TABLE IF EXISTS `Candidat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Candidat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(4) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `postnom` varchar(50) NOT NULL,
  `domain` enum('Presidentielles','Nationales','Provinciales') NOT NULL,
  `image` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero` (`numero`,`domain`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Candidat`
--

LOCK TABLES `Candidat` WRITE;
/*!40000 ALTER TABLE `Candidat` DISABLE KEYS */;
INSERT INTO `Candidat` (`id`, `numero`, `nom`, `prenom`, `postnom`, `domain`, `image`) VALUES (1,'169','Makolo','kotambola','junior','Nationales','i1.webp'),(2,'129','katumbi','kotokale','urvin','Nationales','i2.webp'),(3,'1','kibasa','julien','Kabamba','Nationales','i3.webp');
/*!40000 ALTER TABLE `Candidat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `sessionId` varchar(200) NOT NULL,
  `idCand` int DEFAULT NULL,
  `idTem` int DEFAULT NULL,
  `derniereDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `idCand` (`idCand`),
  KEY `idTem` (`idTem`),
  CONSTRAINT `Session_ibfk_1` FOREIGN KEY (`idCand`) REFERENCES `Candidat` (`id`),
  CONSTRAINT `Session_ibfk_2` FOREIGN KEY (`idTem`) REFERENCES `Temoin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
INSERT INTO `Session` (`sessionId`, `idCand`, `idTem`, `derniereDate`) VALUES ('1701083851',NULL,1,'2023-11-27 11:22:14');
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Temoin`
--

DROP TABLE IF EXISTS `Temoin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Temoin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `postnom` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `role` varchar(50) NOT NULL,
  `otpcode` varchar(200) DEFAULT NULL,
  `statuscompte` varchar(50) DEFAULT 'NO',
  `telephone` varchar(10) NOT NULL,
  `image` varchar(200) NOT NULL,
  `province` varchar(70) NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `telephone` (`telephone`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Temoin`
--

LOCK TABLES `Temoin` WRITE;
/*!40000 ALTER TABLE `Temoin` DISABLE KEYS */;
INSERT INTO `Temoin` (`id`, `nom`, `prenom`, `postnom`, `password`, `email`, `role`, `otpcode`, `statuscompte`, `telephone`, `image`, `province`, `status`) VALUES (1,'Tshibangu','Fabrice','Kabamba','$2b$10$.G4M0Xx518hPWnjZ1pbSoeeImq0Yths1pCeKTO5Y5us9yPJxxGXsG','julien@gmail.com','temoin','5483A0','YES','0844427518','i4.webp','Kinshasa',0),(3,'jolen','joleni','jolema','$2b$10$b9WT9BRNVfp2o83/Mo5JpOs8qRXBz8Iylvmk81PJpvWXsRPKeBuIi','jolen@gmail.com','temoin','B403B7','YES','0858658248','i4.webp','Equateur',0);
/*!40000 ALTER TABLE `Temoin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Voix`
--

DROP TABLE IF EXISTS `Voix`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Voix` (
  `idVoix` int NOT NULL AUTO_INCREMENT,
  `idCandidat` int NOT NULL,
  `organisation` varchar(100) DEFAULT NULL,
  `nombreVoix` varchar(10000) NOT NULL,
  `idPv` int NOT NULL,
  `idTem` int NOT NULL,
  `statusRelation` varchar(100) NOT NULL DEFAULT 'ON',
  `dateCreated` datetime DEFAULT CURRENT_TIMESTAMP,
  `localisation` varchar(1000) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idVoix`),
  UNIQUE KEY `idCandidat` (`idCandidat`,`idTem`),
  KEY `idTem` (`idTem`),
  CONSTRAINT `Voix_ibfk_1` FOREIGN KEY (`idTem`) REFERENCES `Temoin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Voix`
--

LOCK TABLES `Voix` WRITE;
/*!40000 ALTER TABLE `Voix` DISABLE KEYS */;
INSERT INTO `Voix` (`idVoix`, `idCandidat`, `organisation`, `nombreVoix`, `idPv`, `idTem`, `statusRelation`, `dateCreated`, `localisation`, `status`) VALUES (1,1,'UNC MAKOLO KOTAMBOLA','100',4,1,'ON','2023-11-23 20:09:30',NULL,1),(2,2,'APC KATUMBI KOTOKALE','70',4,1,'ON','2023-11-23 20:09:30',NULL,1),(9,1,'UNC','MAKOLO KOTAMBOLA',8,3,'ON','2023-11-27 11:55:48',NULL,1);
/*!40000 ALTER TABLE `Voix` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pvFiles`
--

DROP TABLE IF EXISTS `pvFiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pvFiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idPv` int NOT NULL,
  `file` varchar(500) NOT NULL,
  `role` enum('voix','preuve') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPv` (`idPv`),
  CONSTRAINT `pvFiles_ibfk_1` FOREIGN KEY (`idPv`) REFERENCES `referencePV` (`idPv`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pvFiles`
--

LOCK TABLES `pvFiles` WRITE;
/*!40000 ALTER TABLE `pvFiles` DISABLE KEYS */;
INSERT INTO `pvFiles` (`id`, `idPv`, `file`, `role`) VALUES (1,4,'arn:aws:s3:::e-temoins/voix/Z-ffROfCwFUe_8FQ8vvdPxAy','voix'),(2,4,'arn:aws:s3:::e-temoins/preuve/rpNt8U3ZYlS2pdfCaQV31dJS','preuve'),(3,5,'arn:aws:s3:::e-temoins/voix/ZRDsK4EXIV2JOT7I3SB9wbxs','voix'),(4,5,'arn:aws:s3:::e-temoins/preuve/D2qUzjQGibX5EyOaQd25oyRF','preuve'),(5,6,'arn:aws:s3:::e-temoins/voix/FYcpzCXJiQ023pHqdiv1m5JF','voix'),(6,6,'arn:aws:s3:::e-temoins/preuve/uU1Nr5aOJ5_td1rIaUQEf42C','preuve'),(7,7,'arn:aws:s3:::e-temoins/voix/p0PqzUo1wTb0HoqA6IbiFCK_','voix'),(8,7,'arn:aws:s3:::e-temoins/preuve/McVbl_jkcApG46Z-7aAZJf0C','preuve'),(9,8,'arn:aws:s3:::e-temoins/voix/w2_Ypu95XXrXwy0SVh9vFOEf','voix'),(10,8,'arn:aws:s3:::e-temoins/preuve/A8x3ueuBnJs3_13zUqMrZzHX','preuve'),(11,8,'arn:aws:s3:::e-temoins/preuve/eJxvlu5eUg1E2cSr_f2aFExW','preuve'),(12,8,'arn:aws:s3:::e-temoins/preuve/VroOqjRsZl6hw_Bo6attL2Cu','preuve');
/*!40000 ALTER TABLE `pvFiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `referencePV`
--

DROP TABLE IF EXISTS `referencePV`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `referencePV` (
  `idPv` int NOT NULL AUTO_INCREMENT,
  `province` varchar(500) NOT NULL,
  `territoireVille` varchar(500) NOT NULL,
  `sectChefCom` varchar(1000) NOT NULL,
  `svbv` varchar(1000) NOT NULL,
  `bv` varchar(1000) NOT NULL,
  `typeElection` varchar(1000) NOT NULL,
  `totalElecteur` varchar(100) NOT NULL,
  `suffrage` varchar(1000) NOT NULL,
  `tauxParticipation` varchar(100) NOT NULL,
  `bulletinNonValide` varchar(100) NOT NULL,
  `bulletinBlanc` varchar(100) NOT NULL,
  `totalCandidat` varchar(100) NOT NULL,
  `candidatVoixNonNull` varchar(100) NOT NULL,
  `img` varchar(500) NOT NULL,
  PRIMARY KEY (`idPv`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referencePV`
--

LOCK TABLES `referencePV` WRITE;
/*!40000 ALTER TABLE `referencePV` DISABLE KEYS */;
INSERT INTO `referencePV` (`idPv`, `province`, `territoireVille`, `sectChefCom`, `svbv`, `bv`, `typeElection`, `totalElecteur`, `suffrage`, `tauxParticipation`, `bulletinNonValide`, `bulletinBlanc`, `totalCandidat`, `candidatVoixNonNull`, `img`) VALUES (1,'Nord-Kivu','Goma','KARISIMBI','INSTITUT','610018-D','Nationales','578','270','46,71%','0','0','177','63',''),(2,'Nord-Kivu','Goma','KARISIMBI','INSTITUT','610018-D','Nationales','578','270','46,71%','0','0','177','63',''),(3,'Nord-Kivu','Goma','KARISIMBI','INSTITUT','610018-D','Nationales','578','270','46,71%','0','0','177','63',''),(4,'Nord-Kivu','Goma','KARISIMBI','INSTITUT','610018-D','Nationales','578','270','46,71%','0','0','177','63','WkUlhBzbyDD8if5nF2I51l7F'),(5,'Nord-Kivu','Goma','KARISIMBI','INSTITUT','610018-D','Nationales','578','270','46,71%','0','0','177','63','mOKFYdErM_o2Cut9yAyiWLsJ'),(6,'Nord-Kivu','Goma','KARISIMBI','INSTITUT','610018-D','Nationales','578','270','46,71%','0','0','177','63','ygN4qEROcX8eJ4KfU8fEou7S'),(7,'Nord-Kivu','Goma','KARISIMBI','INSTITUT','610018-D','Nationales','578','270','46,71%','0','0','177','63','I-77cNCa4qCDlHgDdWRL9CWz'),(8,'Nord-Kivu','Goma','KARISIMBI','INSTITUT','610018-D','Nationales','578','270','46,71%','0','0','177','63','wM5zPTbFf_5QKC9Xkf-5NQRQ');
/*!40000 ALTER TABLE `referencePV` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relations`
--

DROP TABLE IF EXISTS `relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idtem` int NOT NULL,
  `idcand` int NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idtem` (`idtem`,`idcand`),
  KEY `idcand` (`idcand`),
  CONSTRAINT `relations_ibfk_1` FOREIGN KEY (`idtem`) REFERENCES `Temoin` (`id`),
  CONSTRAINT `relations_ibfk_2` FOREIGN KEY (`idcand`) REFERENCES `Candidat` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relations`
--

LOCK TABLES `relations` WRITE;
/*!40000 ALTER TABLE `relations` DISABLE KEYS */;
INSERT INTO `relations` (`id`, `idtem`, `idcand`, `status`) VALUES (1,1,1,1),(2,1,2,1),(4,3,1,1);
/*!40000 ALTER TABLE `relations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-27 13:00:17
