const mysql = require('mysql');
const inquirer = require('inquirer');
require("console.table");

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Password1!',
  database: 'employees_db',
});

connection.connect((err) => {
  if (err) throw err;
  initialPrompt();
});

// ############################### Initial Prompt ######################################
// ############################### Initial Prompt ######################################
// ############################### Initial Prompt ######################################


const initialPrompt = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View Employees by Department',
        'View All Employees by Role',
        'Add An Employee',
        'Remove Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'View All Roles',
        'Add Role',
        'Remove Role',
      ],
    })
    .then((answer) => {
      switch (answer.action) {

        case 'View All Employees':
          viewAllEmployees();
          break;

        case 'View Employees by Department':
          viewEmployeesByDepartment();
          break;

        case 'View All Employees by Role':
          viewEmployeesByRole();
          break;

        case 'Add An Employee':
          addAnEmployee();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};





// ############################### View All Employees ###########################
// ############################### View All Employees ###########################
// ############################### View All Employees ###########################

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


// ######################### View Employees By Department ######################
// ######################### View Employees By Department ######################
// ######################### View Employees By Department ######################


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
        query += `INNER JOIN department ON employee.department_id =  department.department_id where department.department_id = ${answer.department};` ;
        connection.query(query, (err, res) => {
          console.table(res);
          console.table('-----------------------------------');
          connection.end();
        })
      })
    };
   


// ######################### View Employees By Role ###########################
// ######################### View Employees By Role ###########################
// ######################### View Employees By Role ###########################

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
    })};

    // ###################################### Add An Employee #######################################
    // ###################################### Add An Employee #######################################
    // ###################################### Add An Employee #######################################

const addAnEmployee = () => {
      inquirer
      .prompt([
        {
       name: 'firstname',
       type: 'input',
       message: 'What is the first name of the employee you would like to add?',    
       default: 'Steve'
      },
      {
        name: 'lastname',
        type: 'input',
        message: 'What is the employee last name?',   
        default: 'LeSteve' 
      },
      {
        name: 'role',
        type: 'list',
        message: 'What is the role of this new employee?',
        choices: [
        'Human Resources Manager',
        'Human Resources Employee',
        'Accounting Manager',
        'Accountant',
        'Engineering Manager',
        'Engineer'
        ]
      },
      {
        name: 'managerId',
        type: 'list',
        message: 'What is the manager id of the new employee?',
        choices: [
        '1',
        '2',
        '3',
        'Null'
        ]
      },
      ]).then((answer) => {
        console.log(answer)
      
        if (answer.role === 'Human Resources Manager') {
          answer.role = 1;
          answer.department = 1
        } else if (answer.role === 'Human Resources Employee') {
          answer.role = 2;
          answer.department = 1
        } else if (answer.role === 'Accounting Manager') {
          answer.role = 3;
          answer.department = 2
        } else if (answer.role === 'Accountant') {
          answer.role = 4;
          answer.department = 2
        } else if (answer.role === 'Engineering Manager') {
          answer.role = 5;
          answer.department = 3
        } else {
          answer.role = 6;
          answer.department = 3
        }
        const createEmployee = () => {
          console.log('Adding a new employee...\n');
          const query = connection.query(
            'INSERT INTO employee SET ?',
            {
              first_name: `${answer.firstname}`,
              last_name: `${answer.lastname}`,
              role_id: `${answer.role}`,
              manager_id: `${answer.managerId}`,
              department_id: `${answer.department}`
            },
            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} Employee Created!\n`);
              // logs the actual query being run
              console.log(query.sql);
              process.exit();
            }
          );
        };
        createEmployee();
      })
    };
        
    // ###################################### Delete An Employee #######################################
    // ###################################### Delete An Employee #######################################
    // ###################################### Delete An Employee #######################################

    // const deleteEmployee = () => {
    //   inquirer
    //   .prompt({
    //   name: 'name',
    //   type: 'rawlist',
    //   message: 'Which employee would you like to delete?',
    //   choices: [
    //     'Human Resources Manager',
    //     'Human Resources Employee',
    //     'Accounting Manager',
    //     'Accountant',
    //     'Engineering Manager',
    //     'Engineer',
    //   ],   
    // }).then((answer) => {

    //   let query = 'SELECT employee_id AS "Employee ID", first_name AS "First Name", last_name AS "Last Name", '; 
    //   query += 'role.title AS "Position", role.salary AS "Salary" FROM employee ';
    //   query += 'INNER JOIN role ON employee.role_id = role.role_id WHERE role.role_id = 5';
    //   connection.query(query, (err, res) => {
    //       console.table(res);
    //       console.table('-----------------------------------');
    //       connection.end();
    //   })
    // })};

    //   console.log('Deleting Employee...\n');
    //   connection.query(
    //     'DELETE FROM employee WHERE ?',
    //     {
    //       employee: `${answer.name}`,
    //     },
    //     (err, res) => {
    //       if (err) throw err;
    //       console.log(`${res.affectedRows} employee deleted!\n`);
    //       // Call readProducts AFTER the DELETE completes
    //       initialPrompt();
    //     }
    //   );
    // };
