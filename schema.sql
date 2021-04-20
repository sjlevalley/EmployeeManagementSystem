drop database if exists employees_DB;
create database if not exists employees_DB;

use employees_db;

CREATE TABLE IF NOT EXISTS department (
	department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS role (
	role_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(7) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE IF NOT EXISTS employee (
	employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, 
    manager_id INT,
    FOREIGN KEY(role_id) REFERENCES role(role_id)
);

