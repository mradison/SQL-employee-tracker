const inquirer = require('inquirer');
const fs = require('fs');
require('console.table')

const mysql = require('mysql2');


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Ecampus#100',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );


//   GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
async function promptManager() {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all positions",
                "View all employees",
                "Add department",
                "Add position",
                "Add employee",
                "Update an employee's position"
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

    if (answers.menu === "View all positions") {
        // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
        db.query('SELECT role.title, role.id, department.name AS departmentName, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;', (err, result) => {
            if (err) throw err
            console.table(result)
            promptManager();
        });
    }

    if (answers.menu === "View all employees") {
        // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS managerName FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id =  manager.id;', (err, result) => {
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
        db.query('INSERT INTO department (department_name) VALUES (?)', [answers.newDepartment], (err, result) => {
            if (err) throw err
            console.table(result)
            promptManager();
        });
    }

    if (answers.menu === "Add position") {
        db.query('SELECT * FROM department', (err, res)=> {
            if(err)throw err;
            const deptArr = res.map(({id, name})=> ({
                name: name,
                value: id
            }))
          
           
           inquirer.prompt([
                {
                    type: "input",
                    name: "newPosition",
                    message: "What is the new position?"
                },
                {
                    type: "input",
                    name: "newSalary",
                    message: "What is the salary?"
                },
                {
                    type: "list",
                    name: "newDepartID",
                    message: "What is the department?",
                    choices: deptArr
                }
            ]).then((answers)=> {
                
                db.query('INSERT INTO `role` (title, salary, department_id) VALUES (?, ?, ?)', [answers.newPosition, answers.newSalary, answers.newDepartID], (err, result) => {
                    if (err) throw err
                    console.log('new role added')
                    promptManager();
                });
            })
    
        })



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
                name: "newPosition",
                message: "what is the new employee's position ID?"
            }, 
            {
                type: "input",
                name: "managerID",
                message: "What is the new employee's manager ID?"
            }
        ])
        db.query('INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES (?, ?, ?, ?)', [answers.firstName, answers.lastName, answers.newPosition, answers.managerID], (err, result) => {
            if (err) throw err
            console.table(result)
            promptManager();
        });
    }

    if (answers.menu === "Update an employee's position") {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "updateEmployee",
                message: "What is the employee's ID?"
            },
            {
                type: "input",
                name: "updatePosition",
                message: "What is the position ID?"
            }
        ])
        db.query('UPDATE employee SET position_id = ? WHERE id = ?', [answers.updatePosition, answers.updateEmployee], (err, result) => {
            if (err) throw err
            console.table(result)
            promptManager();
        });
    }
}

    promptManager();

