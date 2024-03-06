const mysql = require ("mysql2");
const inquirer = require ("inquirer");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1254',
    database: 'employee_db'
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL database.');
    }
  });
//allowing a menu in the terminal
function menu() {
    inquirer.prompt(
        {
            name: "action",
            message: "What would you like to do?",
            choices: ["view department", "view roles", "view employees", "add department", "add role", "add employee"],
            type: "list"
        }
    ) .then(res => {
        if (res.action==="view department"){
            viewDepartment()
        }
        if (res.action==="view roles"){
            viewRole()
        }
        if (res.action==="view employees"){
            viewEmployee()
        }
        if (res.action==="add department"){
            addDepartment()
        }
        if (res.action==="add role"){
            addRole()
        }
        if (res.action==="add employee"){
            addEmployee()
        }
    })
};
//viewing departments
function viewDepartment() {
    db.query("SELECT * FROM department", (err, data)=>{
        console.table(data)
        menu() 
    })
};
//viewing roles
function viewRole() {
    db.query("SELECT * FROM role", (err, data)=>{
        console.table(data)
        menu() 
    })
};
//viewing employees
function viewEmployee() {
    db.query("SELECT * FROM employee", (err, data)=>{
        console.table(data)
        menu() 
    })
};
//adding department
function addDepartment() {
    inquirer.prompt(
        {
            type: "input",
            name: "name",
            message: "What is the name of the new department?"
        }
    ) .then(res=> {
        db.query("INSERT INTO department (name) values (?)", [res.name],
        (err, data)=>{
            console.log("department has been created");
            menu() 
        })
    })
};

//adding role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the new role:'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID for the new role:'
        }
    ]).then(res => {
        db.query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
            [res.title, res.salary, res.department_id],
            (err, data) => {
                console.log('Role has been created successfully.');
                menu();
            }
        );
    });
}

//adding employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the new employee:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the new employee:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role ID for the new employee:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID for the new employee (leave blank or enter NULL if N/A):'
        }
    ]).then(res => {
        // Convert role_id to an integer
        res.role_id = parseInt(res.role_id);

        // Convert manager_id to either an integer or null
        res.manager_id = res.manager_id.trim() !== '' ? parseInt(res.manager_id) : null;

        // Insert the new employee into the employee table
        db.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [res.first_name, res.last_name, res.role_id, res.manager_id],
            (err, data) => {
                if (err) throw err;
                console.log('Employee has been added successfully.');
                menu(); 
            }
        );
    });
}


menu()