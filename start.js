var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Lakers323",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    startApp();

})


function startApp() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Dept",
                "View All Employees By Manager",
                "Add Employee",
                'Update Employee Role',
                "Add Department",

                "Remove Employee"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    viewEmployees(); break;

                case "View All Employees By Dept":
                    employeesDept();
                    break;

                case "View All Employees By Manager":
                    managerView();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Update Employee Role":
                    updateEmloyeeRole();
                    break;

                case "Remove Employee":
                    deleteEmployee();
                    break;
            }
        })
}

const viewEmployees = () => {
    connection.query("SELECT employee.id,employee.first_name AS First,employee.last_name AS Last,role.title,role.salary,department.name AS Department FROM employee_db.employee LEFT JOIN employee_db.role ON employee.role_id = role.id LEFT JOIN employee_db.department ON role.department_id = department.id ", function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });

}

const employeesDept = () => {
    connection.query("SELECT employee.id,employee.first_name AS First, employee.last_name AS Name,department.name AS Department FROM employee_db.employee LEFT JOIN employee_db.role ON employee.role_id = role.id LEFT JOIN employee_db.department ON role.department_id = department.id", function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });

}

const managerView = () => {
    connection.query("SELECT employee.manager_id As Manager,employee.first_name AS First, employee.last_name AS Name FROM employee_db.employee INNER JOIN employee_db.role ON employee.role_id = role.id WHERE manager_id IS NOT NULL ORDER BY manager_id", function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });

}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the new employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the new employee's last name?"
            },
            {
                name: "role",
                type: "input",
                message: "What is the new employee's role? (Please enter the role ID)"
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role
                },
                function (err) {
                    if (err) throw err;
                    console.log("The new employee has been created successfully!");
                    startApp();
                }
            );
        });


}

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What department would you like to add?"
            },

        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.department,

                },
                function (err) {
                    if (err) throw err;
                    console.log("The new department has been created successfully!");
                    startApp();
                }
            );
        });


}

const updateEmloyeeRole = () => {
    inquirer
        .prompt([
            {
                name: "employee",
                type: "input",
                message: "Which employee's role would you like to update? (Enter the employee ID)"
            },

            {
                name: "newRole",
                type: "input",
                message: "What would you like to set the new role? (Enter Role Id)"
            },

        ])
        .then(function (answer) {
            connection.query(
                "UPDATE employee SET ? where ?",
                [
                    {
                        role_id: answer.newRole
                    },
                    {
                        id: answer.employee
                    }
                ],
                function (err) {
                    if (err) throw err;
                    console.log("The employee's role has been updated successfully!");
                    startApp();
                }
            );
        });
}


function deleteEmployee() {
    inquirer
        .prompt({
            name: "employee",
            type: "input",
            message:
                "Which employee would you like to delete? (Please enter the employee's ID)"
        })
        .then(function (answer) {
            connection.query(
                "DELETE from employee where ?",
                {
                    id: answer.employee
                },
                function (err, result) {
                    if (err) throw err;
                    console.log("Employee has been deleted successfully!");
                    startApp();
                }
            );
        });
}