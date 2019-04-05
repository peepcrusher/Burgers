DROP DATABASE IF EXISTS fictionalfood_db;
CREATE DATABASE fictionalfood_db;
USE fictionalfood_db;

CREATE TABLE food (
    id INT(50) AUTO_INCREMENT NOT NULL,
    food VARCHAR(255) NOT NULL,
    eaten BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(id)
);