const connection = require('../db/connection');
const inquirer = require('inquirer');

// ############################### VIEW ALL DEPARTMENTS ####################################
// ############################### VIEW ALL DEPARTMENTS ####################################
// ############################### VIEW ALL DEPARTMENTS ####################################

const viewAllDepartments = () => {

    connection.query('SELECT department_name AS "DEPARTMENT NAME", department_id AS "DEPARTMENT ID" FROM department ORDER BY department_id;', (err, res) => {
        if (err) throw err;
        console.table(res)
        process.exit();
    })
};

// ################################## VIEW ALL ROLES #######################################
// ################################## VIEW ALL ROLES #######################################
// ################################## VIEW ALL ROLES #######################################

const viewAllRoles = () => {

    connection.query('SELECT title AS "Title", salary AS "SALARY", department_id AS "DEPARTMENT ID" FROM role ORDER BY department_id;', (err, res) => {
        if (err) throw err;
        console.table(res)
        process.exit();
    })
};

// ################################# View All Employees ############################
// ################################# View All Employees ############################
// ################################# View All Employees ############################

const viewAllEmployees = () => {

    let query = 'SELECT employee_id AS "Employee ID", first_name AS "First Name", last_name AS "Last Name",';
    query += 'role.title AS "Position", role.salary AS "Salary", department_name AS "Department"';
    query += 'FROM employee INNER JOIN role ON employee.role_id = role.role_id ';
    query += 'INNER JOIN department ON role.department_id = department.department_id';
    connection.query(query, (err, res) => {
        console.table(res);
        console.table('-----------------------------------');
        connection.end();
    })
};

// ########################### View Employees By Department #######################
// ########################### View Employees By Department #######################
// ########################### View Employees By Department #######################

const viewEmployeesByDepartment = () => {
    inquirer
        .prompt({
            name: 'department',
            type: 'rawlist',
            message: 'Which department would you like to view?',
            choices: [
                'Human Resources',
                'Accounting',
                'Engineering',
            ],
        }).then((answer) => {

            if (answer.department === 'Human Resources') {
                answer.department = 1;
            } else if (answer.department === 'Accounting') {
                answer.department = 2;
            } else {
                answer.department = 3;
            }
            let query = 'SELECT employee_id AS "Employee ID", first_name AS "First Name", last_name AS "Last Name", ';
            query += 'employee.department_id AS "Department ID" FROM employee ';
            query += `INNER JOIN department ON employee.department_id =  department.department_id where department.department_id = ${answer.department};`;
            connection.query(query, (err, res) => {
                console.table(res);
                console.table('-----------------------------------');
                connection.end();
            })
        })
};

// ########################### View Employees By Role ##############################
// ########################### View Employees By Role ##############################
// ########################### View Employees By Role ##############################

const viewEmployeesByRole = () => {
    inquirer
        .prompt({
            name: 'role',
            type: 'rawlist',
            message: 'Which role would you like to view?',
            choices: [
                'Human Resources Manager',
                'Human Resources Employee',
                'Accounting Manager',
                'Accountant',
                'Engineering Manager',
                'Engineer',
            ],
        }).then((answer) => {

            if (answer.role === 'Human Resources Manager') {
                answer.role = 1;
            } else if (answer.role === 'Human Resources Employee') {
                answer.role = 2;
            } else if (answer.role === 'Accounting Manager') {
                answer.role = 3;
            } else if (answer.role === 'Accountant') {
                answer.role = 4;
            } else if (answer.role === 'Engineering Manager') {
                answer.role = 5;
            } else {
                answer.role = 6;
            }

            let query = 'SELECT employee_id AS "Employee ID", first_name AS "First Name", last_name AS "Last Name", ';
            query += 'role.title AS "Position", role.salary AS "Salary" FROM employee ';
            query += `INNER JOIN role ON employee.role_id = role.role_id WHERE role.role_id = ${answer.role}`,

                connection.query(query, (err, res) => {
                    console.table(res);
                    console.table('-----------------------------------');
                    connection.end();
                })
        })
};

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, viewEmployeesByDepartment, viewEmployeesByRole };