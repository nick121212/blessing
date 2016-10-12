-- MySQL dump 10.13  Distrib 5.7.13, for osx10.11 (x86_64)
--
-- Host: localhost    Database: blessing
-- ------------------------------------------------------
-- Server version	5.7.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `crawlerSetting`
--

DROP TABLE IF EXISTS `crawlerSetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crawlerSetting` (
  `key` varchar(50) DEFAULT NULL,
  `host` varchar(30) NOT NULL,
  `domainWhiteList` text NOT NULL,
  `whitePathList` text NOT NULL,
  `interval` int(11) DEFAULT NULL,
  `downloader` varchar(10) DEFAULT NULL,
  `initDomain` varchar(30) DEFAULT NULL,
  `proxySettings` text,
  `pages` text,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  UNIQUE KEY `key` (`key`),
  UNIQUE KEY `crawlerSetting_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crawlerSetting`
--

LOCK TABLES `crawlerSetting` WRITE;
/*!40000 ALTER TABLE `crawlerSetting` DISABLE KEYS */;
INSERT INTO `crawlerSetting` VALUES ('anjuke','www.anjuke.com','[\"sh.anjuke.com\",\"shanghai.anjuke.com\"]','[{\"regexp\":\"s\",\"scope\":\"s\"},{\"regexp\":\"s\",\"scope\":\"s\"}]',5000,'superagent','sh.anjuke.com','{\"useProxy\":false}','[]','安居客配置文件','2016-09-19 03:15:02','2016-09-21 04:29:52'),('lianjia','www.lianjia.com','[\"sh.lianjia.com\",\"sh.fang.lianjia.com\"]','[{\"regexp\":\"/^\\\\/xiaoqu(?:\\\\/[a-z]*\\\\/?(?:d\\\\d+\\\\/?|\\\\/?)|\\\\/?|\\\\/\\\\d+.html)$/\",\"scope\":\"i\",\"enable\":true},{\"regexp\":\"/^\\\\/list\\\\/pg\\\\d+/\",\"scope\":\"i\",\"enable\":false}]',5000,'phantom','sh.fang.lianjia.com/home','{\"useProxy\":false,\"timeout\":5000,\"charset\":\"utf-8\",\"ipInfo\":{\"host\":\"114.55.146.215\",\"port\":8083}}','[{\"strict\":true,\"rule\":[{\"regexp\":\"/\\\\/xiaoqu\\\\/\\\\d+.html/\",\"scope\":\"i\"}],\"strictFields\":[\"name\"],\"key\":\"community\",\"fieldKey\":\"name\",\"areas\":[{\"dealStrategy\":\"jsdom\",\"key\":\"pictures\",\"selector\":\".album-box .smart-img\"},{\"dealStrategy\":\"jsdom\",\"key\":\"position\",\"selector\":\".intro .container .fl a\"},{\"dealStrategy\":\"jsdom\",\"key\":\"priceInfo\",\"selector\":\".res-info .iceInfo .item:eq(0) p:eq(1)\"},{\"dealStrategy\":\"jsdom\",\"key\":\"refPriceInfo\",\"selector\":\".res-info .priceInfo .item:eq(1) p:eq(1)\"},{\"dealStrategy\":\"jsdom\",\"key\":\"geoInfo\",\"selector\":\".zone-map.js_content\"},{\"dealStrategy\":\"jsdom\",\"key\":\"baseInfo\",\"selector\":\".res-info .col-2 ol\"}],\"fields\":{\"none\":{\"data\":[{\"key\":\"name\",\"selector\":[\".detail-block .res-top .title .t h1\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"address\",\"selector\":[\".adr\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"plate\",\"selector\":[\".detail-block .title .t span:eq(0)\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}]},\"pictures\":{\"data\":[{\"key\":\"pictures\",\"selector\":[\"li\"],\"removeSelector\":[],\"data\":[{\"key\":\"title\",\"selector\":[\"img\"],\"removeSelector\":[],\"methodInfo\":{\"attr\":[\"title\"]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"url\",\"selector\":[\"img\"],\"removeSelector\":[],\"methodInfo\":{\"attr\":[\"src\"]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"array\"}]},\"position\":{\"data\":[{\"key\":\"city\",\"selector\":[{\"eq\":[1]}],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]},{\"replace\":{\"regexp\":\"/小区/\",\"scope\":\"i\",\"repStr\":\"\"}}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"area\",\"selector\":[{\"eq\":[2]}],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]},{\"replace\":{\"regexp\":\"/小区/\",\"scope\":\"i\",\"repStr\":\"\"}}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}]},\"priceInfo\":{\"data\":[{\"key\":\"averagePriceUnit\",\"selector\":[\".u\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"averagePrice\",\"selector\":[\".p\"],\"removeSelector\":[\"img\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}]},\"refPriceInfo\":{\"data\":[{\"key\":\"refPriceUnit\",\"selector\":[\".u\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"refPrice\",\"selector\":[\".p\"],\"removeSelector\":[\"img\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}]},\"geoInfo\":{\"data\":[{\"key\":\"geoBaidu\",\"selector\":[],\"htmlStrategy\":\"jsdom\",\"data\":[{\"key\":\"lat\",\"selector\":[],\"removeSelector\":[],\"methodInfo\":{\"attr\":[\"latitude\"]},\"formats\":[{\"num\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"lon\",\"selector\":[],\"removeSelector\":[],\"methodInfo\":{\"attr\":[\"longitude\"]},\"formats\":[{\"num\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}],\"dealStrategy\":\"object\"}]},\"baseInfo\":{\"data\":[{\"key\":\"buildingTime\",\"selector\":[\"li:eq(0) .other\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"propertyFee\",\"selector\":[\"li:eq(1) .other\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"propertyCompany\",\"selector\":[\"li:eq(2) .other\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"developerName\",\"selector\":[\"li:eq(3) .other\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"buildingAmount\",\"selector\":[\"li:eq(4) .other\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"roomAmount\",\"selector\":[\"li:eq(5) .other\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"volumeRate\",\"selector\":[\"li:eq(6) .other\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"greeningRate\",\"selector\":[\"li:eq(7) .other\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}]}}},{\"rule\":[{\"regexp\":\"/\\\\/list\\\\/pg\\\\d+/\",\"scope\":\"i\"},{\"regexp\":\"/\\\\/list\\\\/pg\\\\d+/\",\"scope\":\"i\"}],\"strictFields\":[\"name\"],\"areas\":[],\"key\":\"loupan\",\"fieldKey\":\"name\",\"strict\":true,\"fields\":{\"none\":{\"data\":[{\"key\":\"list\",\"selector\":[\".house-lst li\"],\"removeSelector\":[],\"data\":[{\"key\":\"name\",\"selector\":[\".info-panel .col-1 > h2 a\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"plate\",\"selector\":[\".info-panel .where .region span\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"address\",\"selector\":[\".info-panel .where .region\"],\"removeSelector\":[\"span\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"array\"}]}}},{\"rule\":[{\"regexp\":\"/\\\\/ershoufang\\\\/\\\\D+\\\\d+.html/\",\"scope\":\"i\"}],\"strictFields\":[\"community\"],\"areas\":[{\"dealStrategy\":\"jsdom\",\"key\":\"album\",\"selector\":\".esf-top .album-box .album-panel .album-view-wrap ul\"},{\"dealStrategy\":\"jsdom\",\"key\":\"baseInfo\",\"selector\":\".esf-top .cj-cun .content\"},{\"dealStrategy\":\"jsdom\",\"key\":\"moreInfo\",\"selector\":\".esf-top .cj-cun .content .aroundInfo\"},{\"dealStrategy\":\"jsdom\",\"key\":\"basicInfo\",\"selector\":\".introContent .base .content ul\"},{\"dealStrategy\":\"jsdom\",\"key\":\"basicTransactionInfo\",\"selector\":\".introContent .transaction .content ul\"}],\"key\":\"ershoufang\",\"fieldKey\":\"random\",\"strict\":true,\"fields\":{\"none\":{\"data\":[{\"key\":\"tags\",\"selector\":[\".featureTag span\"],\"removeSelector\":[],\"data\":[{\"key\":\"\",\"selector\":[],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"array\"},{\"key\":\"sellingPoint\",\"selector\":[\"h1.main\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}]},\"album\":{\"data\":[{\"key\":\"pictures\",\"selector\":[\"li\"],\"removeSelector\":[],\"data\":[{\"key\":\"title\",\"selector\":[\"img\"],\"removeSelector\":[],\"methodInfo\":{\"attr\":[\"img-title\"]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"url\",\"selector\":[\"img\"],\"removeSelector\":[],\"methodInfo\":{\"attr\":[\"data-large\"]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"array\"}]},\"baseInfo\":{\"data\":[{\"key\":\"sumPrice\",\"selector\":[\".houseInfo .price\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"sumArea\",\"selector\":[\".houseInfo .area\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}]},\"moreInfo\":{\"data\":[{\"key\":\"price\",\"selector\":[\"tr:eq(0) td:eq(0)\"],\"removeSelector\":[\".title\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"floor\",\"selector\":[\"tr:eq(1) td:eq(0)\"],\"removeSelector\":[\".title\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"completingTime\",\"selector\":[\"tr:eq(1) td:eq(1)\"],\"removeSelector\":[\".title\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"decoration\",\"selector\":[\"tr:eq(2) td:eq(0)\"],\"removeSelector\":[\".title\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"toward\",\"selector\":[\"tr:eq(2) td:eq(1)\"],\"removeSelector\":[\".title\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"downPayment\",\"selector\":[\"tr:eq(3) td:eq(0)\"],\"removeSelector\":[\".title\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"monthPayment\",\"selector\":[\"tr:eq(3) td:eq(1)\"],\"removeSelector\":[\".title\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"community\",\"selector\":[\"tr:eq(4) td:eq(0) a\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"plate\",\"selector\":[\"tr:eq(4) td:eq(0) .areaEllipsis\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"address\",\"selector\":[\"tr:eq(5) td:eq(0) .addrEllipsis\"],\"removeSelector\":[],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}]},\"basicInfo\":{\"data\":[{\"key\":\"layout\",\"selector\":[\"li:eq(0)\"],\"removeSelector\":[\".label\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"floorScale\",\"selector\":[\"li:eq(4)\"],\"removeSelector\":[\".label\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}]},\"basicTransactionInfo\":{\"data\":[{\"key\":\"prevTrade\",\"selector\":[\"li:eq(0)\"],\"removeSelector\":[\".label\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"type\",\"selector\":[\"li:eq(1)\"],\"removeSelector\":[\".label\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"yearLimit\",\"selector\":[\"li:eq(2)\"],\"removeSelector\":[\".label\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"},{\"key\":\"isOnly\",\"selector\":[\"li:eq(3)\"],\"removeSelector\":[\".label\"],\"methodInfo\":{\"text\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}]}}},{\"rule\":[],\"strictFields\":[],\"key\":\"error\",\"areas\":[{\"dealStrategy\":\"jsdom\",\"key\":\"error\",\"selector\":\".errorMessageInfo\"}],\"fields\":{\"error\":{\"data\":[{\"key\":\"btn_goHome\",\"selector\":[],\"removeSelector\":[],\"methodInfo\":{\"size\":[]},\"formats\":[{\"str\":[]}],\"htmlStrategy\":\"jsdom\",\"dealStrategy\":\"normal\"}]}},\"fieldKey\":\"random\"}]','链家网的配置文件','2016-09-21 04:29:26','2016-09-26 08:18:40');
/*!40000 ALTER TABLE `crawlerSetting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL,
  `title` varchar(20) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `lft` int(11) DEFAULT NULL,
  `rgt` int(11) DEFAULT NULL,
  `parentKey` varchar(255) DEFAULT NULL,
  `description` text,
  `showed` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  UNIQUE KEY `module_title_unique` (`title`),
  UNIQUE KEY `key` (`key`),
  UNIQUE KEY `module_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES (2,'root','DASHBOARD','dashboard',NULL,1,22,NULL,'DASHBOARD',1,'2016-09-04 04:32:31','2016-09-04 04:32:31'),(3,'schemaListAction','SCHEMA设置','chair-school','home.page',3,4,'settings','管理SCHEMA',1,'2016-09-05 09:27:03','2016-10-12 07:17:51'),(4,'interface','接口设置','extension',NULL,5,6,'settings','接口管理\n\n\nhelodf',1,'2016-09-05 09:42:01','2016-10-11 08:57:09'),(5,'permission','权限设置','people_outline',NULL,12,13,'root','权限设置',1,'2016-09-04 13:48:31','2016-10-11 08:56:35'),(6,'module','模块管理','file-tree','home.page',7,8,'settings','模块管理',1,'2016-09-09 02:39:55','2016-09-23 09:15:52'),(7,'crawler','爬虫管理','bug',NULL,16,21,'root','爬虫的相关设置',1,'2016-09-18 04:30:14','2016-09-18 04:30:38'),(8,'crawler-tty','爬虫进程管理','power-socket','home.tty',19,20,'crawler','爬虫进程管理',1,'2016-09-23 08:57:45','2016-09-23 09:15:31'),(9,'crawlerSettingListAction','爬虫配置文件管理','content-save-settings','home.page',17,18,'crawler','爬虫配置文件的管理',1,'2016-09-18 04:34:03','2016-09-23 09:16:04'),(10,'user','用户设置','person',NULL,14,15,'root','用户设置',1,'2016-09-04 14:09:44','2016-10-11 08:56:05'),(11,'settings','系统设置','settings',NULL,2,11,'root','系统设置',1,'2016-09-04 04:49:02','2016-09-04 04:49:02'),(12,'backupListAction','数据库备份','backup','home.page',9,10,'settings','数据库备份',1,'2016-10-11 09:08:39','2016-10-11 09:09:22');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) DEFAULT NULL,
  `title` varchar(20) NOT NULL,
  `crawlerKey` varchar(50) DEFAULT NULL,
  `period` varchar(50) DEFAULT NULL,
  `description` text,
  `enabled` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  UNIQUE KEY `schedule_title_unique` (`title`),
  UNIQUE KEY `key` (`key`),
  UNIQUE KEY `schedule_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema`
--

DROP TABLE IF EXISTS `schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `text` text,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  UNIQUE KEY `schema_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema`
--

LOCK TABLES `schema` WRITE;
/*!40000 ALTER TABLE `schema` DISABLE KEYS */;
INSERT INTO `schema` VALUES (1,'tewt','DATA',NULL,'dfadf','2016-10-12 07:39:56','2016-10-12 07:39:56');
/*!40000 ALTER TABLE `schema` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-12 15:40:14
