DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

DROP TABLE IF EXISTS department;

CREATE TABLE department
(
    id int(11) NOT NULL
    AUTO_INCREMENT,
  name varchar
    (30) NOT NULL,
  PRIMARY KEY
    (id));

    DROP TABLE IF EXISTS role;

    CREATE TABLE role
    (
        id int(11) NOT NULL
        AUTO_INCREMENT,
  title varchar
        (30) NOT NULL,
  salary decimal
        (10,0) NOT NULL,
  department_id int
        (11) NOT NULL,
  PRIMARY KEY
        (id),
 
  CONSTRAINT role_ibfk_1 FOREIGN KEY
        (department_id) REFERENCES department
        (id));

        DROP TABLE IF EXISTS employee;

        CREATE TABLE employee
        (
            id int(11) NOT NULL
            AUTO_INCREMENT,
  first_name varchar
            (30) NOT NULL,
  last_name varchar
            (30) NOT NULL,
  role_id int
            (11) NOT NULL,
  manager_id int
            (11) DEFAULT NULL,
  PRIMARY KEY
            (id),

  CONSTRAINT employee_ibfk_1 FOREIGN KEY
            (role_id) REFERENCES role
            (id),
  CONSTRAINT employee_ibfk_2 FOREIGN KEY
            (manager_id) REFERENCES role
            (id));


            INSERT INTO department
                (id, name)
            VALUES
                (NULL, "Human Resources"),
                (NULL, "Operations"),
                (NULL, "Finance"),
                (NULL, "Marketing"),
                (NULL, "Sales"),
                (NULL, "Information Technology");

            INSERT INTO role
                (id, department_id, title, salary)
            VALUES
                (NULL, 1, "HR Manager", 60000),
                (NULL, 1, "HR Advisor", 25000),
                (NULL, 2, "Operations Lead", 70000),
                (NULL, 2, "Operations Analyst", 30000),
                (NULL, 3, "Internal Auditor", 70000),
                (NULL, 3, "Accountant", 50000),
                (NULL, 4, "Events Officer", 40000),
                (NULL, 4, "Marketing Assistant", 20000),
                (NULL, 5, "Sales Manager", 80000),
                (NULL, 5, "Sales Advisor", 40000),
                (NULL, 6, "Junior Developer", 25000),
                (NULL, 6, "Network Engineer", 40000);

            INSERT INTO employee
                (id, first_name, last_name, role_id, manager_id)
            VALUES
                (NULL, "Emanuil", "Vartanyan", 12, NULL),
                (NULL, "Jane", "Smith", 11, 3),
                (NULL, "John ", "Doe", 2, 10),
                (NULL, "Kenny", "Smith", 3, NULL),
                (NULL, "Owen", "Wilson", 4, 4),
                (NULL, "Bill", "Gates", 10, 9),
                (NULL, "Elon", "Musk", 7, NULL),
                (NULL, "Jane", "Lynch", 2, 10),
                (NULL, "Peter", "Piper", 9, NULL),
                (NULL, "Don", "Juan", 1, NULL),
                (NULL, "John", "Gotti", 12, NULL);





            SELECT
                employee.id,
                employee.first_name AS First,
                employee.last_name AS Last,
                employee.manager_id AS Manager,
                role.title,
                role.salary,
                department.name AS Department

            FROM employee_db.employee
                LEFT JOIN employee_db.role
                ON employee.role_id = role.id
                LEFT JOIN employee_db.department
                ON role.department_id = department.id
  