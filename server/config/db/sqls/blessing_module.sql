-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  UNIQUE KEY `crawlerSetting_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crawlerSetting`
--

LOCK TABLES `crawlerSetting` WRITE;
/*!40000 ALTER TABLE `crawlerSetting` DISABLE KEYS */;
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
  `key` varchar(50) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES (3,'root','DASHBOARD','dashboard',NULL,1,20,NULL,'DASHBOARD',1,'2016-09-04 04:32:31','2016-09-04 04:32:31'),(4,'settings','系统设置','settings',NULL,2,9,'root','系统设置',1,'2016-09-04 04:49:02','2016-09-04 04:49:02'),(5,'permission','权限设置','people_outline',NULL,10,11,'root','权限设置',1,'2016-09-04 13:48:31','2016-09-05 09:31:35'),(6,'user','用户设置','person',NULL,12,13,'root','用户设置\n\n\n\n\nhello world',1,'2016-09-04 14:09:44','2016-09-07 04:35:03'),(7,'schema','SCHEMA设置','chair-school',NULL,3,4,'settings','管理SCHEMA',1,'2016-09-05 09:27:03','2016-09-09 02:40:21'),(8,'interface','接口设置','extension',NULL,5,6,'settings','接口管理\n\n\nhelodf',1,'2016-09-05 09:42:01','2016-09-09 02:40:11'),(9,'cmdb','CMDB','web_asset',NULL,14,15,'root','资产管理模块',1,'2016-09-08 10:02:26','2016-09-08 10:02:26'),(10,'module','模块管理','file-tree',NULL,7,8,'settings','模块管理',1,'2016-09-09 02:39:55','2016-09-09 02:39:55'),(14,'crawler','爬虫管理','bug',NULL,16,19,'root','爬虫的相关设置',1,'2016-09-18 04:30:14','2016-09-18 04:30:38'),(15,'crawler_settings','爬虫配置文件管理','content-save-settings',NULL,17,18,'crawler','爬虫配置文件的管理',1,'2016-09-18 04:34:03','2016-09-18 04:34:03');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-18 13:35:04
