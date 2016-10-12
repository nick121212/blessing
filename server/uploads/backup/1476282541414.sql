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
  `group` varchar(10) DEFAULT NULL,
  `textForm` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  UNIQUE KEY `schema_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema`
--

LOCK TABLES `schema` WRITE;
/*!40000 ALTER TABLE `schema` DISABLE KEYS */;
INSERT INTO `schema` VALUES (2,'resultActionData','DATA','{\"type\":\"object\",\"properties\":{\"data\":{\"type\":\"object\",\"title\":\"返回结果\"}}}','结果反馈的表单','2016-10-12 07:57:00','2016-10-12 08:23:06','common',NULL),(3,'resultActionForm','FORM',NULL,'结果反馈表单','2016-10-12 08:18:33','2016-10-12 08:25:35','common','[{\"key\":\"data\",\"type\":\"jeditor\"}]'),(4,'schemaActionData','DATA','{\"type\":\"object\",\"required\":[\"key\",\"type\"],\"properties\":{\"key\":{\"type\":\"string\",\"title\":\"KEY\"},\"type\":{\"type\":\"string\",\"title\":\"类型\"},\"group\":{\"type\":\"string\",\"title\":\"分组名称\"},\"text\":{\"type\":\"object\",\"title\":\"SCHEMA配置\"},\"textForm\":{\"type\":\"array\",\"title\":\"SCHEMA配置\",\"default\":[],\"items\":{\"type\":\"object\"}},\"description\":{\"type\":\"string\",\"maxLength\":200,\"title\":\"描述\"}}}','schema设置表单数据项','2016-10-12 08:42:50','2016-10-12 08:42:50','schema','[]'),(5,'schemaAddActionData','FORM',NULL,'schema新建操作表单','2016-10-12 09:02:47','2016-10-12 09:02:47','schema','[{\"key\":\"key\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"group\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"type\",\"type\":\"select\",\"titleMap\":[{\"name\":\"DATA\",\"value\":\"DATA\"},{\"name\":\"FORM\",\"value\":\"FORM\"}]},{\"key\":\"description\",\"type\":\"textarea\",\"htmlClass\":\"md-block\"},{\"key\":\"text\",\"condition\":\"model.type===\'DATA\'\",\"type\":\"jeditor\",\"htmlClass\":\"md-block\"},{\"key\":\"textForm\",\"condition\":\"model.type===\'FORM\'\",\"type\":\"jeditor\",\"htmlClass\":\"md-block\"}]'),(6,'schemaSearchActionData','FORM',NULL,'schema新建操作表单','2016-10-12 09:02:47','2016-10-12 09:40:16','schema','[{\"key\":\"key\",\"type\":\"text\",\"required\":false,\"copyValueTo\":[\"/key/$eq\"],\"htmlClass\":\"md-block\"},{\"key\":\"group\",\"type\":\"text\",\"required\":false,\"copyValueTo\":[\"/group/$eq\"],\"htmlClass\":\"md-block\"},{\"key\":\"type\",\"type\":\"select\",\"required\":false,\"copyValueTo\":[\"/type/$eq\"],\"titleMap\":[{\"name\":\"DATA\",\"value\":\"DATA\"},{\"name\":\"FORM\",\"value\":\"FORM\"}]}]'),(7,'crawlerActionData','DATA','{\"type\":\"object\",\"required\":[\"key\",\"host\",\"interval\"],\"properties\":{\"key\":{\"type\":\"string\",\"title\":\"KEY\"},\"host\":{\"type\":\"string\",\"title\":\"主HOST\"},\"domainWhiteList\":{\"type\":\"array\",\"title\":\"域名白名单\",\"default\":[],\"items\":{\"type\":\"string\",\"format\":\"url-ip\",\"title\":\"域名或者IP\"}},\"whitePathList\":{\"type\":\"array\",\"title\":\"路径白名单\",\"default\":[],\"items\":{\"type\":\"object\",\"title\":\"路径配置\",\"required\":[\"regexp\",\"scope\"],\"properties\":{\"enable\":{\"type\":\"boolean\",\"title\":\"是否启用\"},\"regexp\":{\"type\":\"string\",\"title\":\"正则规则\"},\"scope\":{\"type\":\"string\",\"title\":\"修饰符\"},\"description\":{\"type\":\"string\",\"title\":\"介绍\"}}}},\"interval\":{\"type\":\"number\",\"default\":1000,\"minimum\":1000,\"title\":\"下载间隔，单位ms\"},\"downloader\":{\"type\":\"string\",\"default\":\"superagent\",\"title\":\"下载策略\"},\"initDomain\":{\"type\":\"string\",\"title\":\"初始化域名\"},\"proxySettings\":{\"type\":\"object\",\"title\":\"基础设置\",\"properties\":{\"useProxy\":{\"type\":\"boolean\",\"title\":\"是否启用代理\"},\"timeout\":{\"type\":\"number\",\"title\":\"超时时间\"},\"charset\":{\"type\":\"string\",\"title\":\"字符编码\"},\"ua\":{\"type\":\"string\",\"title\":\"USERAGENT\"},\"ipInfo\":{\"type\":\"object\",\"title\":\"代理ip设置\",\"properties\":{\"host\":{\"type\":\"string\",\"format\":\"url-ip\",\"title\":\"代理ip或域名\"},\"port\":{\"type\":\"number\",\"title\":\"代理端口\"}}}}},\"pages\":{\"type\":\"array\",\"title\":\"分析页面配置\",\"items\":{\"type\":\"object\",\"required\":[\"key\",\"fieldKey\"],\"title\":\"分析页面配置\",\"properties\":{\"key\":{\"type\":\"string\",\"title\":\"页面的KEY\"},\"priority\":{\"type\":\"number\",\"default\":0,\"minimum\":0,\"maximum\":10,\"title\":\"爬取的优先级，数字越大越优先\"},\"areas\":{\"type\":\"array\",\"title\":\"页面区域\",\"items\":{\"type\":\"object\",\"required\":[\"selector\",\"dealStrategy\",\"key\"],\"properties\":{\"key\":{\"type\":\"string\",\"title\":\"区域KEY\"},\"selector\":{\"type\":\"string\",\"title\":\"选择器\"},\"dealStrategy\":{\"type\":\"string\",\"default\":\"jsdom\",\"title\":\"分析策略\"}}}},\"rule\":{\"type\":\"array\",\"title\":\"匹配规则\",\"default\":[],\"items\":{\"type\":\"object\",\"title\":\"路径配置\",\"required\":[\"regexp\",\"scope\"],\"properties\":{\"regexp\":{\"type\":\"string\",\"title\":\"正则规则\"},\"scope\":{\"type\":\"string\",\"title\":\"修饰符\"}}}},\"fieldKey\":{\"type\":\"string\",\"title\":\"主键字段\"},\"strict\":{\"type\":\"boolean\",\"title\":\"是否启用严格模式\"},\"strictFields\":{\"type\":\"array\",\"title\":\"严格模式下，验证字段\",\"default\":[],\"items\":{\"type\":\"string\",\"title\":\"验证字段\"}},\"fields\":{\"type\":\"object\",\"title\":\"分析字段配置\"}}}},\"description\":{\"type\":\"string\",\"title\":\"描述\",\"maxLength\":500}}}','爬虫相关的表单数据字段描述','2016-10-12 07:57:00','2016-10-12 09:48:01','crawler',NULL),(8,'crawlerAckActionData','DATA','{\"type\":\"object\",\"required\":[\"key\",\"action\"],\"properties\":{\"key\":{\"type\":\"string\",\"title\":\"配置文件KEY\"},\"action\":{\"type\":\"string\",\"title\":\"执行的命令\"},\"options\":{\"type\":\"object\",\"title\":\"可选项\",\"properties\":{\"url\":{\"type\":\"string\",\"title\":\"测试的地址\"},\"type\":{\"type\":\"string\",\"default\":\"forever\",\"title\":\"爬虫启动模式\"},\"startCrawler\":{\"type\":\"boolean\",\"default\":true,\"title\":\"开启爬取链接模块\"},\"startDeal\":{\"type\":\"boolean\",\"default\":true,\"title\":\"开启html处理模块\"},\"startDownload\":{\"type\":\"boolean\",\"default\":false,\"title\":\"开启图片下载模块\"},\"startChip\":{\"type\":\"boolean\",\"default\":false,\"title\":\"开启更换ip模块\"}}}}}','爬虫相关的表单数据字段描述','2016-10-12 07:57:00','2016-10-12 09:49:54','crawler',NULL),(9,'crawlerAddFirstActionForm','FORM',NULL,'爬虫相关的表单数据字段描述','2016-10-12 07:57:00','2016-10-12 09:53:15','crawler','[{\"key\":\"key\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"host\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"initDomain\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"interval\",\"type\":\"number\",\"htmlClass\":\"md-block\"},{\"key\":\"downloader\",\"type\":\"select\",\"titleMap\":[{\"name\":\"SUPERAGENT\",\"value\":\"superagent\"},{\"name\":\"PHANTOM\",\"value\":\"phantom\"}],\"htmlClass\":\"md-block\"},{\"key\":\"description\",\"type\":\"textarea\",\"htmlClass\":\"md-block\"}]'),(11,'crawlerAckActionForm','FORM',NULL,'爬虫相关的表单数据字段描述','2016-10-12 07:57:00','2016-10-12 09:54:41','crawler','[{\"key\":\"action\",\"type\":\"select\",\"titleMap\":[{\"value\":\"crawler:start\",\"name\":\"开始爬虫\",\"group\":\"\"},{\"value\":\"crawler:stop\",\"name\":\"停止爬虫\",\"group\":\"\"},{\"value\":\"crawler:create\",\"name\":\"开启一个新爬虫\",\"group\":\"\"},{\"value\":\"crawler:reset\",\"name\":\"重置一个数据库\",\"group\":\"\"},{\"value\":\"crawler:test\",\"name\":\"测试地址\",\"group\":\"\"},{\"value\":\"crawler:retrydeal\",\"name\":\"重新分析一个网址\",\"group\":\"\"}],\"htmlClass\":\"md-block\"},{\"key\":\"key\",\"type\":\"autocomplete-1\",\"condition\":\"model.action===\'crawler:start\' || model.action===\'crawler:retrydeal\' || model.action===\'crawler:reset\' || model.action===\'crawler:test\'\",\"acOptions\":{\"textField\":\"key\",\"dataField\":\"rows\",\"noCache\":false,\"search\":\"/where/key/$like\",\"actionKey\":\"crawlerSettingListAction\"},\"htmlClass\":\"md-block\"},{\"key\":\"options\",\"type\":\"card\",\"grid\":{\"flex\":\"\"},\"condition\":\"!!model.action\",\"items\":[{\"key\":\"options.type\",\"type\":\"select\",\"htmlClass\":\"md-block\",\"titleMap\":[{\"value\":\"forever\",\"name\":\"FOREVER启动\"},{\"value\":\"\",\"name\":\"NODE启动\"}]},{\"key\":\"options.url\",\"htmlClass\":\"md-block\",\"type\":\"text\"},{\"key\":\"options.startCrawler\",\"condition\":\"model.action===\'crawler:start\'\",\"htmlClass\":\"md-block\",\"type\":\"checkbox\"},{\"key\":\"options.startDeal\",\"condition\":\"model.action===\'crawler:start\'\",\"htmlClass\":\"md-block\",\"type\":\"checkbox\"},{\"key\":\"options.startDownload\",\"condition\":\"model.action===\'crawler:start\'\",\"htmlClass\":\"md-block\",\"type\":\"checkbox\"},{\"key\":\"options.startChip\",\"condition\":\"model.action===\'crawler:start\'\",\"htmlClass\":\"md-block\",\"type\":\"checkbox\"}]}]'),(12,'crawlerAddSecondActionForm','FORM',NULL,'爬虫相关的表单数据字段描述','2016-10-12 07:57:00','2016-10-12 09:55:31','crawler','[{\"key\":\"domainWhiteList\",\"type\":\"chips\",\"startEmpty\":true,\"description\":\"域名白名单，配置可以爬取的域名列表\",\"showHints\":true,\"htmlClass\":\"md-block\"},{\"key\":\"whitePathList\",\"type\":\"array\",\"fieldHtmlClass\":\"layout-row flex\",\"startEmpty\":true,\"description\":\"路径白名单，配置可以爬取的路径列表\",\"showHints\":true,\"items\":[{\"type\":\"section\",\"htmlClass\":\"layout-row flex\",\"items\":[{\"key\":\"whitePathList[].enable\",\"type\":\"select\",\"titleMap\":[{\"name\":\"启用\",\"value\":true},{\"name\":\"不启用\",\"value\":false}]},{\"key\":\"whitePathList[].regexp\",\"htmlClass\":\"md-block flex\",\"type\":\"text\"},{\"key\":\"whitePathList[].scope\",\"type\":\"text\"},{\"key\":\"whitePathList[].description\",\"type\":\"text\"}]}]}]'),(13,'crawlerAddThirdActionForm','FORM',NULL,'爬虫相关的表单数据字段描述','2016-10-12 07:57:00','2016-10-12 09:56:11','crawler','[{\"key\":\"proxySettings\",\"type\":\"card\",\"items\":[{\"key\":\"proxySettings.useProxy\",\"type\":\"checkbox\"},{\"key\":\"proxySettings.timeout\",\"type\":\"number\",\"htmlClass\":\"md-block\"},{\"key\":\"proxySettings.charset\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"proxySettings.ua\",\"type\":\"textarea\",\"maxLength\":300,\"htmlClass\":\"md-block\"},{\"key\":\"proxySettings.ipInfo\",\"type\":\"card\",\"items\":[{\"key\":\"proxySettings.ipInfo.host\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"proxySettings.ipInfo.port\",\"type\":\"number\",\"htmlClass\":\"md-block\"}]}],\"htmlClass\":\"md-block\"}]'),(14,'crawlerAddForthActionForm','FORM',NULL,'爬虫相关的表单数据字段描述','2016-10-12 07:57:00','2016-10-12 09:57:08','crawler','[{\"key\":\"pages\",\"type\":\"tabarray\",\"startEmpty\":true,\"fieldHtmlClass\":\"layout-column flex\",\"items\":[{\"type\":\"section\",\"grid\":{\"flex\":\"\"},\"items\":[{\"key\":\"pages[].key\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"pages[].priority\",\"type\":\"number\",\"htmlClass\":\"md-block\"},{\"key\":\"pages[].fieldKey\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"pages[].strict\",\"type\":\"switch\",\"htmlClass\":\"md-block\"},{\"key\":\"pages[].strictFields\",\"startEmpty\":true,\"type\":\"chips\",\"htmlClass\":\"md-block\"},{\"key\":\"pages[].rule\",\"type\":\"array\",\"startEmpty\":true,\"items\":[{\"type\":\"section\",\"htmlClass\":\"layout-row flex\",\"items\":[{\"key\":\"pages[].rule[].regexp\",\"htmlClass\":\"md-block flex\",\"type\":\"text\"},{\"key\":\"pages[].rule[].scope\",\"type\":\"text\"}]}]}]}]}]'),(15,'crawlerAddFifthActionForm','FORM',NULL,'爬虫相关的表单数据字段描述','2016-10-12 07:57:00','2016-10-12 09:57:54','crawler','[{\"key\":\"pages\",\"type\":\"tabarray\",\"items\":[{\"type\":\"section\",\"htmlClass\":\"column-row flex\",\"items\":[{\"key\":\"pages[].key\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"pages[].areas\",\"type\":\"array\",\"startEmpty\":true,\"description\":\"区域配置，用户优化分析性能，减少dom的查询。\",\"showHints\":true,\"items\":[{\"type\":\"section\",\"grid\":{\"flex\":\"\",\"layout\":\"row\"},\"items\":[{\"key\":\"pages[].areas[].key\",\"type\":\"text\"},{\"key\":\"pages[].areas[].selector\",\"htmlClass\":\"md-block flex\",\"type\":\"text\"},{\"key\":\"pages[].areas[].dealStrategy\",\"type\":\"text\"}]}]},{\"key\":\"pages[].fields\",\"type\":\"jeditor\",\"htmlClass\":\"md-block\"}]}]}]'),(16,'moduleActionData','DATA','{\"type\":\"object\",\"required\":[\"key\",\"title\",\"icon\"],\"properties\":{\"key\":{\"type\":\"string\",\"title\":\"KEY\"},\"title\":{\"type\":\"string\",\"title\":\"模块名称\"},\"link\":{\"type\":\"string\",\"title\":\"路由状态名\"},\"icon\":{\"type\":\"string\",\"title\":\"图标\"},\"parentKey\":{\"type\":\"string\",\"title\":\"父亲节点KEY\"},\"description\":{\"type\":\"string\",\"title\":\"描述\",\"maxLength\":\"500\"},\"showed\":{\"type\":\"boolean\",\"title\":\"是否显示\"}}}','模块管理的表单数据字段描述','2016-10-12 07:57:00','2016-10-12 14:19:11','module',NULL),(17,'moduleAddActionForm','FORM',NULL,'模块管理新建表单描述','2016-10-12 07:57:00','2016-10-12 14:21:10','module','[{\"key\":\"parentKey\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"key\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"title\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"link\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"icon\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"description\",\"type\":\"textarea\",\"htmlClass\":\"md-block\"},{\"key\":\"showed\",\"type\":\"checkbox\"}]'),(18,'moduleEditActionForm','FORM',NULL,'模块管理编辑表单描述','2016-10-12 07:57:00','2016-10-12 14:21:57','module','[{\"key\":\"parentKey\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"key\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"title\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"link\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"icon\",\"type\":\"text\",\"htmlClass\":\"md-block\"},{\"key\":\"description\",\"type\":\"textarea\",\"htmlClass\":\"md-block\"},{\"key\":\"showed\",\"type\":\"checkbox\"}]'),(19,'moduleSearchActionForm','FORM',NULL,'模块管理搜索表单描述','2016-10-12 07:57:00','2016-10-12 14:22:30','module','[{\"key\":\"key\",\"type\":\"text\",\"required\":false,\"placeHolder\":\"KEY\",\"description\":\"请输入key来进行搜索,不支持模糊查询\",\"showHints\":true,\"copyValueTo\":[\"/key/$eq\"],\"htmlClass\":\"md-block\"},{\"key\":\"showed\",\"type\":\"select\",\"copyValueTo\":[\"/showed/$eq\"],\"titleMap\":[{\"value\":null,\"name\":\"全部\"},{\"value\":true,\"name\":\"显示\"},{\"value\":false,\"name\":\"不显示\"}],\"htmlClass\":\"md-block\"}]');
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

-- Dump completed on 2016-10-12 22:29:01
