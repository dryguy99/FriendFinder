CREATE DATABASE friendfinder_db;
USE friendfinder_db;

CREATE TABLE friends(
	`id` INTEGER(11) auto_increment NOT NULL,
    `name` varchar(128) Not Null,
    `photo` varchar(128) Not Null,
    `q1`  INTEGER(10) NOT NULL,
    `q2`  INTEGER(10) NOT NULL,
    `q3`  INTEGER(10) NOT NULL,
    `q4`  INTEGER(10) NOT NULL,
    `q5`  INTEGER(10) NOT NULL,
    `q6`  INTEGER(10) NOT NULL,
    `q7`  INTEGER(10) NOT NULL,
    `q8`  INTEGER(10) NOT NULL,
    `q9`  INTEGER(10) NOT NULL,
    `q10`  INTEGER(10) NOT NULL,
    `total` INTEGER(10) NOT Null,
    PRIMARY KEY (`id`)
);

SELECT * FROM friends;