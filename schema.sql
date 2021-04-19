drop database if exists employees_DB;
create database if not exists employees_DB;

use employees_db;

CREATE TABLE IF NOT EXISTS department (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS role (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(12, 3) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS employee (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    department_id INT, 
    manager_id INT,
    FOREIGN KEY(department_id) REFERENCES department(id)
    
);
