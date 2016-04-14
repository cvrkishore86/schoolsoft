-- MySQL Script generated by MySQL Workbench
-- 04/10/16 00:14:33
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema schoolsoft
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `schoolsoft` ;

-- -----------------------------------------------------
-- Schema schoolsoft
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `schoolsoft` DEFAULT CHARACTER SET latin1 ;
USE `schoolsoft` ;


-- -----------------------------------------------------
-- Table `schoolsoft`.`acl`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`acl` ;

CREATE TABLE IF NOT EXISTS `schoolsoft`.`acl` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `model` VARCHAR(512) NULL DEFAULT NULL,
  `property` VARCHAR(512) NULL DEFAULT NULL,
  `accessType` VARCHAR(512) NULL DEFAULT NULL,
  `permission` VARCHAR(512) NULL DEFAULT NULL,
  `principalType` VARCHAR(512) NULL DEFAULT NULL,
  `principalId` VARCHAR(512) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `schoolsoft`.`schooluser`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`schooluser` ;

CREATE TABLE IF NOT EXISTS `schoolsoft`.`schooluser` (
`userId` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `firstName` VARCHAR(100) NOT NULL,
  `lastName` VARCHAR(100) NULL DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `admin` TINYINT(4) NOT NULL,
  `student` TINYINT(4) NOT NULL,
  `employee` TINYINT(4) NOT NULL,
  `schoolId` INT(11) NULL DEFAULT NULL,
  `realm` VARCHAR(512) NULL DEFAULT NULL,
  `password` VARCHAR(512) NOT NULL,
  `credentials` TEXT NULL DEFAULT NULL,
  `challenges` TEXT NULL DEFAULT NULL,
  `emailVerified` TINYINT(1) NULL DEFAULT NULL,
  `verificationToken` VARCHAR(512) NULL DEFAULT NULL,
  `status` VARCHAR(512) NULL DEFAULT NULL,
  `created` DATETIME NULL DEFAULT NULL,
  `lastUpdated` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`userId`),
  INDEX `email` (`email` ASC),
  INDEX `schoolindex` (`schoolId` ASC),
  CONSTRAINT `userschoolfk`
    FOREIGN KEY (`schoolId`)
    REFERENCES `schoolsoft`.`school` (`schoolId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `schoolsoft`.`school`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`school` ;

CREATE TABLE IF NOT EXISTS `schoolsoft`.`school` (
  `schoolId` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `code` VARCHAR(45) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`schoolId`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `schoolsoft`.`parent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`parent` ;

CREATE TABLE IF NOT EXISTS `schoolsoft`.`parent` (
  `paretnId` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `relation` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `officePhone1` VARCHAR(45) NULL DEFAULT NULL,
  `officePhone2` VARCHAR(45) NULL DEFAULT NULL,
  `mobilePhone` VARCHAR(45) NULL DEFAULT NULL,
  `officeAddress` VARCHAR(100) NULL DEFAULT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  `state` VARCHAR(45) NULL DEFAULT NULL,
  `country` VARCHAR(100) NULL DEFAULT NULL,
  `dob` DATE NULL DEFAULT NULL,
  `occupation` VARCHAR(45) NULL DEFAULT NULL,
  `education` VARCHAR(100) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `schoolId` INT(11) NOT NULL, /* what is this column do we require schoolid and user id , i think studnet id is sufficinet TODO*/
  `userId` INT(11)  NULL DEFAULT NULL,
  `studentId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`paretnId`),
  INDEX `studentIdx` (`studentId` ASC),
  INDEX `userIdx` (`userId` ASC),
  INDEX `schoolIdx` (`schoolId` ASC),
  CONSTRAINT `school`
    FOREIGN KEY (`schoolId`)
    REFERENCES `schoolsoft`.`school` (`schoolId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `student`
    FOREIGN KEY (`studentId`)
    REFERENCES `schoolsoft`.`student` (`studentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user`
    FOREIGN KEY (`userId`)
    REFERENCES `schoolsoft`.`schooluser` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `schoolsoft`.`batch`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`batch` ;

CREATE TABLE IF NOT EXISTS `schoolsoft`.`batch` (
  `batchId` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `isActive` TINYINT(4) NOT NULL DEFAULT '1',
  `schoolId` INT(11) NOT NULL,
  `gradingType` VARCHAR(45) NULL DEFAULT NULL, /* what is this column grading type TODO*/
  PRIMARY KEY (`batchId`),
  INDEX `batchschoolIdx` (`schoolId` ASC),
  CONSTRAINT `batchschool`
    FOREIGN KEY (`schoolId`)
    REFERENCES `schoolsoft`.`school` (`schoolId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `schoolsoft`.`student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`student` ;

CREATE TABLE IF NOT EXISTS `schoolsoft`.`student` (
 `studentId` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(4100) NOT NULL,
  `admissionNo` varchar(100) NOT NULL,
  `admissionDate` date NOT NULL,
  `rollNo` varchar(100) NOT NULL,
  `batchId` int(11) DEFAULT NULL,
  `dateOfBirth` date NOT NULL,
  `gender` tinyint(4) NOT NULL,
  `bloodGroup` varchar(10) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone1` varchar(45) NOT NULL,
  `phone2` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `photoFilename` varchar(45) DEFAULT NULL,
  `isSmsEnabled` tinyint(4) DEFAULT '1',
  `status` varchar(45) DEFAULT 'ACTIVE',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `schoolId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`studentId`),
  UNIQUE KEY `studentId_UNIQUE` (`studentId`),
  KEY `schoolId` (`schoolId`),
  KEY `firstname` (`firstName`,`lastName`(767)),
  KEY `userid_idx` (`userId`),
  KEY `student_batch_pk_idx` (`batchId`),
  CONSTRAINT `schoolstundent` FOREIGN KEY (`schoolId`) REFERENCES `school` (`schoolId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `student_batch_pk` FOREIGN KEY (`batchId`) REFERENCES `batch` (`batchId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userid` FOREIGN KEY (`userId`) REFERENCES `schooluser` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


-- -----------------------------------------------------
-- Table `schoolsoft`.`attendance`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`attendance` ;

/* Does attendance table need reference to batch id or only studnet id is enough? does it require schoolid as student table any how has school id */
CREATE TABLE IF NOT EXISTS `schoolsoft`.`attendance` (
  `attendanceId` INT(11) NOT NULL  AUTO_INCREMENT,
  `studentId` INT(11) NOT NULL,
  `dayDate` DATE NOT NULL,
  `schoolId` INT(11) NOT NULL,
  `morning` TINYINT(4) NOT NULL,
  `afternoon` TINYINT(4) NOT NULL,
  PRIMARY KEY (`attendanceId`),
  INDEX `studentfk_idx` (`studentId` ASC),
  INDEX `attschoolfk_idx` (`schoolId` ASC),
  CONSTRAINT `attschoolfk`
    FOREIGN KEY (`schoolId`)
    REFERENCES `schoolsoft`.`school` (`schoolId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `attstudentfk`
    FOREIGN KEY (`studentId`)
    REFERENCES `schoolsoft`.`student` (`studentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
 AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `schoolsoft`.`subject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`subject` ;

CREATE TABLE IF NOT EXISTS `schoolsoft`.`subject` (
  `subjectId` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `code` VARCHAR(45) NULL DEFAULT NULL,
  `schoolId` INT(11) NOT NULL,
  `isActive` TINYINT(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`subjectId`),
  INDEX `subjectschoolId_idx` (`schoolId` ASC),
  CONSTRAINT `subjectschoolId`
    FOREIGN KEY (`schoolId`)
    REFERENCES `schoolsoft`.`school` (`schoolId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
 AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `schoolsoft`.`batch_subject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`batchsubject` ;
/* should batch subject table have a school id */
CREATE TABLE IF NOT EXISTS `schoolsoft`.`batchsubject` (
  `batchSubjectId` INT(11) NOT NULL AUTO_INCREMENT,
  `batchId` INT(11) NOT NULL,
  `subjectId` INT(11) NOT NULL,
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  PRIMARY KEY (`batchSubjectId`),
  INDEX `batchfk_idx` (`batchId` ASC),
  INDEX `subjectfk_idx` (`subjectId` ASC),
  CONSTRAINT `batchfk`
    FOREIGN KEY (`batchId`)
    REFERENCES `schoolsoft`.`batch` (`batchId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `subjectfk`
    FOREIGN KEY (`subjectId`)
    REFERENCES `schoolsoft`.`subject` (`subjectId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `schoolsoft`.`exam_group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`examgroup` ;

CREATE TABLE IF NOT EXISTS `schoolsoft`.`examgroup` (
  `examGroupId` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `batchId` INT(11) NULL DEFAULT NULL,
  `examType` VARCHAR(45) NULL DEFAULT NULL,
  `examGroupStartDate` DATE NOT NULL,
  `examGroupEndDate` DATE NOT NULL,
  `schoolId` INT(11) NULL DEFAULT NULL,
  `isFinalExam` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`examGroupId`),
  INDEX `examgroup_schoolIdx` (`schoolId` ASC),
  INDEX `examgroupbatchIdx` (`batchId` ASC),
  CONSTRAINT `examgroupbatch`
    FOREIGN KEY (`batchId`)
    REFERENCES `schoolsoft`.`batch` (`batchId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `examgroup_school`
    FOREIGN KEY (`schoolId`)
    REFERENCES `schoolsoft`.`school` (`schoolId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `schoolsoft`.`exam`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`exam` ;
/*Should this table have fk to Batch*/
CREATE TABLE IF NOT EXISTS `schoolsoft`.`exam` (
  `examId` INT(11) NOT NULL AUTO_INCREMENT,
  `examGroupId` INT(11) NOT NULL,
  `subjectId` INT(11) NOT NULL,
  `startTime` DATETIME NULL DEFAULT NULL,
  `endTime` DATETIME NULL DEFAULT NULL,
  `maximumMarks` DOUBLE NOT NULL,
  `minimum_marks` DOUBLE NOT NULL,
  `gradingLevelId` INT(11) NOT NULL,
  `weightage` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `schoolId` INT(11) NOT NULL,
  PRIMARY KEY (`examId`),
  INDEX `schoolIdx` (`schoolId` ASC),
  INDEX `examgroup_idx` (`examGroupId` ASC),
  INDEX `examsubjectfk_idx` (`subjectId` ASC),
  CONSTRAINT `examgroup`
    FOREIGN KEY (`examGroupId`)
    REFERENCES `schoolsoft`.`examgroup` (`examGroupId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `examsubjectfk`
    FOREIGN KEY (`subjectId`)
    REFERENCES `schoolsoft`.`subject` (`subjectId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `school_exam`
    FOREIGN KEY (`schoolId`)
    REFERENCES `schoolsoft`.`school` (`schoolId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `schoolsoft`.`grading_levels`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`gradinglevels` ;

CREATE TABLE IF NOT EXISTS `schoolsoft`.`gradinglevels` (
  `gradingId` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `batchId` INT(11) NOT NULL,
  `minScore` INT(11) NOT NULL,
  `gradingOrder` INT(11) NULL DEFAULT NULL,
  `isDeleted` TINYINT(4) NOT NULL DEFAULT '0',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `schoolId` INT(11) NOT NULL,
  `creditPoints` DOUBLE NOT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`gradingId`),
  INDEX `grading_schoolIdx` (`schoolId` ASC),
  INDEX `gradbatchfk_idx` (`batchId` ASC),
  CONSTRAINT `gradbatchfk`
    FOREIGN KEY (`batchId`)
    REFERENCES `schoolsoft`.`batch` (`batchId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `grading_school`
    FOREIGN KEY (`schoolId`)
    REFERENCES `schoolsoft`.`school` (`schoolId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `schoolsoft`.`exam_score`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`examscore` ;

CREATE TABLE IF NOT EXISTS `schoolsoft`.`examscore` (
  `examScoreId` INT(11) NOT NULL AUTO_INCREMENT,
  `studentId` INT(11) NOT NULL,
  `examId` INT(11) NOT NULL,
  `marks` DOUBLE NOT NULL,
  `gradingLevelId` INT(11) NOT NULL,
  `remarks` VARCHAR(45) NULL DEFAULT NULL,
  `isPassed` TINYINT(4) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `schoolId` INT(11) NOT NULL,
  PRIMARY KEY (`examScoreId`),
  INDEX `schoolexamscore_idx` (`schoolId` ASC),
  INDEX `student_exam_score_idx` (`studentId` ASC),
  INDEX `exam_examscore_idx` (`examId` ASC),
  INDEX `gradingfk_idx` (`gradingLevelId` ASC),
  CONSTRAINT `exam_examscore`
    FOREIGN KEY (`examId`)
    REFERENCES `schoolsoft`.`exam` (`examId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `gradingfk`
    FOREIGN KEY (`gradingLevelId`)
    REFERENCES `schoolsoft`.`grading_levels` (`gradingId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `schoolexamscore`
    FOREIGN KEY (`schoolId`)
    REFERENCES `schoolsoft`.`school` (`schoolId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `student_exam_score`
    FOREIGN KEY (`studentId`)
    REFERENCES `schoolsoft`.`student` (`studentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;
-- -----------------------------------------------------
-- Table `schoolsoft`.`teacher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`teacher` ;

CREATE TABLE IF NOT EXISTS `schoolsoft`.`teacher` (
  `teacherId` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `gender` TINYINT(4) NOT NULL DEFAULT '1',
  `qualification` VARCHAR(100) NOT NULL,
  `experienceDetail` VARCHAR(200) NULL DEFAULT NULL,
  `experienceInYears` DOUBLE NOT NULL,
  `isActive` TINYINT(4) NOT NULL DEFAULT '1',
  `dateOfBirth` DATE NOT NULL,
  `bloodGroup` VARCHAR(10) NOT NULL,
  `homeAddress` VARCHAR(100) NOT NULL,
  `photoFilename` VARCHAR(45) NULL DEFAULT NULL,
  `mobile` VARCHAR(45) NOT NULL,
  `mobile2` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  `schoolId` INT(11) NOT NULL,
  `userId` INT(11) NOT NULL,
  PRIMARY KEY (`teacherId`),
  INDEX `teacherschoolpk_idx` (`schoolId` ASC),
  INDEX `teacheruserfk_idx` (`userid` ASC),
  CONSTRAINT `teacherschoolpk`
    FOREIGN KEY (`schoolId`)
    REFERENCES `schoolsoft`.`school` (`schoolId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `teacheruserfk`
    FOREIGN KEY (`userid`)
    REFERENCES `schoolsoft`.`schooluser` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `schoolsoft`.`timetable`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `schoolsoft`.`timetable` ;

CREATE TABLE IF NOT EXISTS `schoolsoft`.`timetable` (
  `timeTableId` INT(11) NOT NULL AUTO_INCREMENT,
  `weekday` VARCHAR(45) NOT NULL,
  `startTime` VARCHAR(45) NOT NULL,
  `endTime` VARCHAR(45) NOT NULL,
  `subjectId` INT(11) NOT NULL,
  `teacherId` INT(11) NOT NULL,
  `batchId` INT(11) NOT NULL,
  `schoolId` INT(11) NOT NULL,
  PRIMARY KEY (`timetableid`),
  INDEX `timetableschoolIdfk_idx` (`schoolId` ASC),
  INDEX `timetablebatchfk_idx` (`batchId` ASC),
  INDEX `timetablesubjectfk_idx` (`subjectId` ASC),
  INDEX `timetableteacherfk_idx` (`teacherId` ASC),
  CONSTRAINT `timetablebatchfk`
    FOREIGN KEY (`batchId`)
    REFERENCES `schoolsoft`.`batch` (`batchId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `timetableschoolIdfk`
    FOREIGN KEY (`schoolId`)
    REFERENCES `schoolsoft`.`school` (`schoolId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `timetablesubjectfk`
    FOREIGN KEY (`subjectId`)
    REFERENCES `schoolsoft`.`subject` (`subjectId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `timetableteacherfk`
    FOREIGN KEY (`teacherId`)
    REFERENCES `schoolsoft`.`teacher` (`teacherId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;







SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
