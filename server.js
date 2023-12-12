const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require('dotenv').config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: process.env.dataBasePassword,
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

async function promptManager() {
    const answers = await inquirer.promt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees,",
                "Add department",
                "Add role",
                "Add employee",
                "Update an employee's role"
            ]
        }
    ]);

    if (answers.menu === "View all departments") {
        db.query('SELECT * FROM department', (err,result) => {
            if (err) throw err
            console.table(result)
            promptManager();
        });
    }

    if (answers.menu === "View all roles") {
        db.query('SELECT * FROM role', (err, result) => {
            if (err) throw err
            console.table(result)
            promptManager();
        });
    }

    if (answers.menu === "View all employees") {
        db.query('SELECT * FROM employee', (err, result) => {
            if (err) throw err
            console.table(result)
            promptManager();
        });
    }

    if (answers.menu === "Add department") {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "What is the new department?"
            }
        ])
        db.query('INSERT INTO department (department_name) VALUES (?)', [ansewers.newDepartment], (err, result) => {
            if (err) throw err
            console.table(result)
            promptManager();
        });
    }

    if (answers.menu === "Add role") {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "newRole",
                message: "What is the new role?"
            },
            {
                type: "input",
                name: "newSalary",
                message: "What is the salary?"
            },
            {
                type: "input",
                name: "newDepartID",
                message: "What is the department ID?"
            }
        ])
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answers.newRole, answers.newSalary, answers.newDepartID], (err, result) => {
            if (err) throw err
            console.table(result)
            promptManager();
        });
    }

    if (answers.menu === "Add employee") {
        const answers = await inquirer.prompt([
            {
                typer: "input",
                name: "firstName",
                message: "What is the new employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the new employee's last name?"
            },
            {
                type: "input",
                name: "newRole",
                message: "what is the new employee's role ID?"
            }, 
            {
                type: "input",
                name: "managerID",
                message: "What is the new employee's manager ID?"
            }
        ])
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?', [answer.firstName, answers.lastName, answers.newRole, answers.managerID], (err, result) {
            if (err) throw err
            console.table(result)
            promptManager();
        });
    }

    if (answers.menu === "Update an employee's role") {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "updateEmployee",
                message: "What is the employee's ID?"
            },
            {
                type: "input",
                name: "updateRole",
                message: "What is the role ID?"
            }
        ])
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.updateRole, answers.updateEmployee], (err, result) => {
            if (err) throw err
            console.table(result)
            promptManager();
        });
    }
}

db.connect(err => {
    if (err) throw err
    promptManager();
})

// function startPrompts() {
//   inquirer
//       .prompt([
//           {
//               type: 'list',
//               name: 'departments',
//               message: 'Would you like to view all departments?',
//               choices: ['Yes', 'No'],
//           },
//           {
//             type: 'list',
//             name: 'roles',
//             message: 'Would you like to view all roles?',
//             choices: ['Yes', 'No'],
//         },
//         {
//           type: 'list',
//           name: 'employees',
//           message: 'Would you like to view all employees?',
//           choices: ['Yes', 'No'],
//       },
//           {
//               type: 'input',
//               name: 'newDepartment',
//               message: 'Would you like to add a department?',
//               validate: (value) => {
//                   if (value) return true
//                    else return 'Please input a value to continue'
//               },
//           },
//           {
//               type: 'input',
//               name: 'departmentName',
//               message: 'What is the name of the department that you would like to add?',
//               validate: (value) => {
//                   if (value) return true
//                   else return 'Please input a value to continue'
//               },
//           },
//           {
//             type: 'input',
//             name: 'newRole',
//             message: 'Would you like to add a new role?',
//             validate: (value) => {
//                 if (value) return true
//                 else return 'Please input a value to continue'
//             },
//         },
//         {
//             type: 'input',
//             name: 'roleDetails',
//             message: 'What are the details of the role: name of role, salary for the role, and department for the role? (please separate answers with a comma)' ,
//             validate: (value) => {
//                 if (value) return true
//                 else return 'Please input a value to continue'
//             },
//         },
//         {
//           type: 'input',
//           name: 'newEmployee',
//           message: 'Would you like to add a new employee?',
//           validate: (value) => {
//               if (value) return true
//               else return 'Please input a value to continue'
//           },
//       },
//       {
//           type: 'input',
//           name: 'employeeDetails',
//           message: 'What are the details of the employee: first name of employee, last name of employee, role of employee, and manager of employee? (please separate answers with a comma)' ,
//           validate: (value) => {
//               if (value) return true
//               else return 'Please input a value to continue'
//           },
//       },
//       ])
// }

// function init() {
//   startPrompts();
// }

// init();