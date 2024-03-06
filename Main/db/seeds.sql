USE employee_db;

INSERT INTO department (name)
VALUES ("Marketing"),
("Sales"),
("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("Associate", 70000.00, 1),
("Lead", 35000.00, 2),
("Representative", 45000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Crowley", 1, NULL),
("Rachel", "Jones", 2, 1),
("Ralph", "Steadman", 3, NULL);

