DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT primary key auto_increment,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT primary key auto_increment,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    foreign key(department_id) references department(id)
);

CREATE TABLE employee (
    id INT primary key auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    foreign key(role_id) references role(id),
    manager_id INT,
    foreign key (manager_id) references employee(id)
);