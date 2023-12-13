const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
        db.query('SELECT * FROM position', (err, result) => {
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
        db.query('INSERT INTO department (department_name) VALUES (?)', [answers.newDepartment], (err, result) => {
            if (err) throw err
            console.table(result)
            promptManager();
        });
    }

    if (answers.menu === "Add position") {
        const answers = await inquirer.prompt([
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
                type: "input",
                name: "newDepartID",
                message: "What is the department ID?"
            }
        ])
        db.query('INSERT INTO `position` (title, salary, department_id) VALUES (?, ?, ?)', [answers.newPosition, answers.newSalary, answers.newDepartID], (err, result) => {
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

db.connect(err => {
    if (err) throw err
    promptManager();
})
