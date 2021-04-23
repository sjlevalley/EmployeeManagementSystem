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






module.exports = { };