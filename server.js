const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function startPrompts() {
  inquirer
      .prompt([
          {
              type: 'list',
              name: 'departments',
              message: 'Would you like to view all departments?',
              choices: ['Yes', 'No'],
          },
          {
            type: 'list',
            name: 'roles',
            message: 'Would you like to view all roles?',
            choices: ['Yes', 'No'],
        },
        {
          type: 'list',
          name: 'employees',
          message: 'Would you like to view all employees?',
          choices: ['Yes', 'No'],
      },
          {
              type: 'input',
              name: 'newDepartment',
              message: 'Would you like to add a department?',
              validate: (value) => {
                  if (value) return true
                   else return 'Please input a value to continue'
              },
          },
          {
              type: 'input',
              name: 'departmentName',
              message: 'What is the name of the department that you would like to add?',
              validate: (value) => {
                  if (value) return true
                  else return 'Please input a value to continue'
              },
          },
          {
            type: 'input',
            name: 'newRole',
            message: 'Would you like to add a new role?',
            validate: (value) => {
                if (value) return true
                else return 'Please input a value to continue'
            },
        },
        {
            type: 'input',
            name: 'roleDetails',
            message: 'What are the details of the role: name of role, salary for the role, and department for the role? (please separate answers with a comma)' ,
            validate: (value) => {
                if (value) return true
                else return 'Please input a value to continue'
            },
        },
        {
          type: 'input',
          name: 'newEmployee',
          message: 'Would you like to add a new employee?',
          validate: (value) => {
              if (value) return true
              else return 'Please input a value to continue'
          },
      },
      {
          type: 'input',
          name: 'employeeDetails',
          message: 'What are the details of the employee: first name of employee, last name of employee, role of employee, and manager of employee? (please separate answers with a comma)' ,
          validate: (value) => {
              if (value) return true
              else return 'Please input a value to continue'
          },
      },
      ])
}

function init() {
  startPrompts();
}

init();