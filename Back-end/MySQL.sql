CREATE DATABASE traveltours;

USE traveltours;

CREATE TABLE tours (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    continent VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    people INT(11) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    photo LONGBLOB,
    UNIQUE KEY unique_tour (name, start_date, end_date)
);

CREATE TABLE users (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO tours (name, location, continent, start_date, end_date, people, price, photo)
VALUES ('Kuba Absolut total', 'Kuba', 'Amerika', '2024-01-10', '2024-01-25', 20, 1500.00, '');
