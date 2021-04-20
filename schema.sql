drop database if exists employees_DB;
create database if not exists employees_DB;

use employees_db;

CREATE TABLE IF NOT EXISTS department (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS role (
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(7) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS employee (
	id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, 
    manager_id INT,
    FOREIGN KEY(role_id) REFERENCES role(id)
);
