const inquirer = require('inquirer');
require("console.table");
const connection = require('./db/connection');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, viewEmployeesByDepartment, viewEmployeesByRole } = require('./functions/viewFunctions');

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
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Add a Department',
        'Add a Role',
        'Add An Employee',
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Update Employee Role',
        'View Employees by Department',
        'View All Employees by Role',
        'Remove Employee',
        'Update Employee Manager',
        'Add Role',
        'Remove Role',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add a Department':
          addDepartment();
          break;
        case 'Add a Role':
          addRole();
          break;
        case 'Add An Employee':
          addAnEmployee();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'View Employees by Department':
          viewEmployeesByDepartment();
          break;
        case 'View All Employees by Role':
          viewEmployeesByRole();
          break;
        case 'Update Employee Role':
          updateRoles();
          break;
        case 'Remove Employee':
          removeEmployee();
          break;
        case 'Remove Role':
          removeRole();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

// ############################## Add An Employee ################################
// ############################## Add An Employee ################################
// ############################## Add An Employee ################################

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
        message: 'What is the manager id of the new employee (press enter if none)?',
        choices: [
          'NULL',
          '1',
          '2',
          '3'
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

// ################################### Add a Department ################################
// ################################### Add a Department ################################
// ################################### Add a Department ################################

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'What is the name of the department you would like to add?',
        default: 'Sales'
      },
    ]).then((answer) => {
      console.log(answer)

      const createDepartment = () => {
        console.log('Adding your new department...\n');
        const query = connection.query(
          'INSERT INTO department SET ?',
          {
            department_name: `${answer.name}`
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} Department Created!\n`);
            // logs the actual query being run
            console.log(query.sql);
            process.exit();
          }
        );
      };
      createDepartment();
    })
};


// ################################### Add a Role #####################################
// ################################### Add a Role #####################################
// ################################### Add a Role #####################################

const addRole = () => {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What is the role you would like to add?',
        default: 'Sales Manager'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary of this new role?',
        default: '92000'
      },
      {
        name: 'id',
        type: 'input',
        message: 'What will the role ID be for this role?',
        default: '4'
      },
    ]).then((answer) => {
      console.log(answer)

      const createRole = () => {
        console.log('Adding your new role...\n');
        const query = connection.query(
          'INSERT INTO role SET ?',
          {
            title: `${answer.title}`,
            salary: `${answer.salary}`,
            department_id: `${answer.id}`
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} Role Created!\n`);
            // logs the actual query being run
            console.log(query.sql);
            process.exit();
          }
        );
      };
      createRole();
    })
};

// ###################################### Update a Role #######################################
// ###################################### Update a Role #######################################
// ###################################### Update a Role #######################################

const updateRoles = () => {
  inquirer
    .prompt([
      {
        name: 'update',
        type: 'list',
        message: 'Which role would you like to update?',
        choices: [
          'HR Manager',
          'HR Employee',
          'Accounting Manager',
          'Accountant',
          'Engineering Manager',
          'Engineer'
        ]
      },
      {
        name: 'updateWhat',
        type: 'list',
        message: 'What would you like to update?',
        choices: [
          'Title',
          'Salary',
          'Department_ID',
        ]
      },
      {
        name: 'new',
        type: 'input',
        message: 'What would you like to change it to?',
        default: '200000'
      },
    ]).then((answer) => {
      console.log(answer.updateWhat);
      answer.updateWhat = answer.updateWhat.toLowerCase();
      console.log(answer.updateWhat);


      const createUpdate = () => {
        console.log('Updating role...\n');
        const query = connection.query(
          `UPDATE role SET ${answer.updateWhat} = ${answer.new} WHERE title= "${answer.update}"`,
          (err, res) => {
            if (err) throw err;
            console.table(`${res.affectedRows} Role Updated!\n`);
            // logs the actual query being run
            console.table(query.sql);
            process.exit();
          }
        )
      };
      createUpdate();
    })
};

// ################################## Delete an Employee ###################################
// ################################## Delete an Employee ###################################
// ################################## Delete an Employee ###################################

const removeEmployee = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT CONCAT (first_name, " ", last_name) AS "name" FROM employee', (err, res) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: 'choice',
            type: 'list',
            choices() {
              const choiceArray = [];
              res.forEach(({ name }) => {
                choiceArray.push(name);
              });
              return choiceArray;
            },
            message: 'Which employee would you like to Remove?',
          },
        ])
        .then((answer) => {
          console.log(answer.choice);
          resolve(answer);

          connection.query(`DELETE FROM employee WHERE CONCAT (first_name, " ", last_name) = "${answer.choice}";`,

            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} employee deleted!\n`);
              // Call readProducts AFTER the DELETE completes
              process.exit();
            }
          );

        }
        )
    }
    )
  }
  )
};

// ################################## Delete a Role ###################################
// ################################## Delete a Role ###################################
// ################################## Delete a Role ###################################

const removeRole = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT title AS "Title" FROM role;', (err, res) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: 'choice',
            type: 'list',
            choices() {
              const choiceArray = [];
              res.forEach(({ Title }) => {
                choiceArray.push(Title);
              });
              return choiceArray;
            },
            message: 'Which role would you like to Remove?',
          },
        ])
        .then((answer) => {
          console.log(answer.choice);
          resolve(answer);

          connection.query(`DELETE FROM role WHERE title = "${answer.choice}";`,

            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} role deleted!\n`);
              // Call readProducts AFTER the DELETE completes
              process.exit();
            }
          );
        }
        )
    }
    )
  }
  )
};
















