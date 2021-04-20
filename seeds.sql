use employees_db;

INSERT INTO department (name)
VALUES ('Human Resources'), ('Accounting'), ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES ('HR Manager', 90000, 1), ('HR Employee', 75000, 1), 
       ('Accounting Manager', 105000, 2), ('Accountant', 92000, 2),
       ('Engineering Manager', 125000, 3), ('Engineer', 105000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Joe', 'Rogan', 1, NULL), ('Megan', 'Fox', 2, 1), 
	   ('Taylor', 'Swift', 3, NULL), ('Betty', 'White', 4, 3), 
       ('Snoop', 'Dogg', 5, NULL), ('Martha', 'Stewart', 6, 5);
