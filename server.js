const inquirer = require("inquirer");
const mysql = require("mysql2");

require('dotenv').config();


// Connect to database//
const connection = mysql.createConnection(
    {
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port:3306
    },
  
    console.log("Connected to the SQL database.")
);
  
connection.connect(err => {
    if (err) throw err;
    console.log('Database connected');
    start();
});

// inquirer prompts
function start() {
    console.log('Starting Inquirer prompts...');
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Add a Manager',
                'Update an employee role',
                'View Employees by Manager',
                'View Employees by Department',
                'Delete Departments | Roles | Employees',
                'View the total utilized budget of a department',
                'Exit',
            ],
        }
    ])
    .then((answer) => {
        switch (answer.action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a Manager':
                addManager();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'View Employees by Manager':
                viewEmployeesByManager();
                break;
            case 'View Employees by Department':
                viewEmployeesByDepartment();
                break;
            case 'Delete Departments | Roles | Employees':
                deleteDepartmentRolesEmployees();
                break;
            case 'View the total utilized budget of a department':
                viewTotalUtilizedBudgetOfDepartment();
                break;
            case 'Exit':
                connection.end();
                console.log('Bye!');
                break;
        }
    });
}

// Function to view all departments
function viewAllDepartments() {
    const query = 'SELECT * FROM departments';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        start();
    });
}

// Function to view all roles
function viewAllRoles() {
    const query = 'SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.department_id = departments.id';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        start();
    });
}

// Function to view all employees
function viewAllEmployees() {
    const query = `
    SELECT employees.id, 
    employees.first_name, 
    employees.last_name,
    roles.title,
    roles.salary AS salary,
    departments.department_name,
    CONCAT (manager.first_name, ' ', manager.last_name) AS manager_name
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON employees.manager_id = manager.id`;

    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        start();
    });
}

// Function to add a department
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:',
        }
    ])
    .then((answer) => {
        console.log(answer.name);
        const query = `INSERT INTO departments (department_name) VALUES ('${answer.name}')`;
        connection.query(query, (err, res) => {
            if(err) throw err;
            console.log(`Added department ${answer.name} to database.`);
            start();
            console.log(answer.name);
        });
    });
}

// Function to add role
function addRole() {
    const query = 'SELECT * FROM departments';
    connection.query(query, (err, res) => {
        if(err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the new role:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary of the new role:',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Select the department for the new role:',
                choices: res.map(
                    (department) => department.department_name
                ),
            },
        ])
        .then((answer) => {
            const department = res.find(
                (department) => department.name === answer.department
            );
            const query = 'INSERT INTO roles SET?';
            connection.query(
                query,
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: department,
                },
                (err, res) => {
                    if(err) throw err;
                    console.log(`Added role${answer.title} with salary ${answer.salary} to the ${answer.department} department in the database.`);
                    start();
                }
            );
        });
    });
}

// Function to add an employee
function addEmployee() {
    connection.query('SELECT id, title FROM roles', (error, results) => {
        if(error) {
            console.error(error);
            return;
        }
        const roles = results.map(({id, title}) => ({
            name: title,
            value: id,
        }));

        connection.query(
            'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
            (error, results) => {
                if(error) {
                    console.error(error);
                    return;
                }

                const managers = results.map(({id, name}) => ({
                    name,
                    value: id,
                }));

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'Enter the employees first name:',
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'Enter the employees last name:',
                    },
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'Select the employee role:',
                        choices: roles,
                    },
                    {
                        type: 'list',
                        name: 'managerId',
                        message: 'Select the employee manager:',
                        choices: [
                            {name: 'None', value: null},
                            ...managers,
                        ],
                    },
                ])
                .then((answer) => {
                    const sql =
                        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                    const values = [
                        answer.firstName,
                        answer.lastName,
                        answer.roleId,
                        answer.managerId,
                    ];
                    connection.query(sql, values, (error) => {
                        if(error) {
                            console.error(error);
                            return;
                        }

                        console.log('Employee is added successfully');
                        start();
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        );
    });
}

// Function to add a manager
function addManager() {
    const queryDepartments = 'SELECT * FROM departments';
    const queryEmployees = 'SELECT * FROM employees';

    connection.query(queryDepartments, (err, resDepartments) => {
        if(err) throw err;
        connection.query(queryEmployees, (err, resEmployees) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'Select the department:',
                    choices: resDepartments.map(
                        (department) => department.department_name
                    ),
                },
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Select the employee to add as a manager:',
                    choices: resEmployees.map(
                        (employee) => `${employee.first_name} ${employee.last_name}`
                    ),
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Select the employees manager:',
                    choices: resEmployees.map(
                        (employee) => `${employee.first_name} ${employee.last_name}`
                    ),
                },
            ])
            .then ((answer) => {
                const department = resDepartments.find(
                    (department) => department.department_name === answer.department
                );
                const employee = resEmployees.find(
                    (employee) => `${employee.first_name} ${employee.last_name}` === answer.employee
                );
                const manager = resEmployees.find(
                    (employee) => `${employee.first_name} ${employee.last_name}` === answer.manager
                );
                const query =
                'UPDATE employee SET manager_id = ? WHERE id = ? AND role_id IN (SELECT id FROM roles WHERE department_id = ?)';
                connection.query(
                    query,
                    [manager.id, employee.id, department.id],
                    (err, res) => {
                        if(err) throw err;
                        console.log(`Added manager ${manager.first_name} ${manager.last_name} to employee ${employee.first_name} ${employee.last_name} in department ${department.department_name}`);
                        start();
                    }
                );
            });
        });
    });
}

// Function to update an employee role
function updateEmployeeRole() {
    const queryEmployees = 
    'SELECT employees.id, employees.first_name, employees.last_name, roles.title FROM employees LEFT JOIN roles ON employees.role_id = roles.id';
    const queryRoles = 'SELECT * FROM roles';
    connection.query(queryEmployees, (err, resEmployees) => {
        if(err) throw err;
        connection.query(queryRoles, (err, resRoles) => {
            if(err) throw err;
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Select the employee to update:',
                    choices: resEmployees.map(
                        (employee) => `${employee.first_name} ${employee.last_name}`
                    ),
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Select the new role:',
                    choices: resRoles.map((role) => role.title),
                },
            ])
            .then((answer) => {
                const employee = resEmployees.find(
                    (employee) => `${employee.first_name} ${employee.last_name}` === answer.employee
                );
                const role = resRoles.find(
                    (role) => role.title === answer.role
                );
                const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
                connection.query(
                    query,
                    [role.id, employee.id],
                    (err, res) => {
                        if(err) throw err;
                        console.log(`Updated ${employee.first_name} ${employee.last_name} role to ${role.title} in the database`);
                        start();
                    }
                );
            });
        });
    });
}

// Function to view employee by manager
function viewEmployeesByManager() {
    const query = `
      SELECT 
        e.id, 
        e.first_name, 
        e.last_name, 
        r.title, 
        d.department_name, 
        CONCAT(m.first_name, ' ', m.last_name) AS manager_name
      FROM 
        employees e
        INNER JOIN roles r ON e.role_id = r.id
        INNER JOIN departments d ON r.department_id = d.id
        LEFT JOIN employees m ON e.manager_id = m.id
      ORDER BY 
        manager_name, 
        e.last_name, 
        e.first_name
    `;

    connection.query(query, (err, res) => {
        if(err) throw err;

        console.table(res);

        const employeesByManager = res.reduce((acc, cur) => {
            const managerName = cur.manager_name;
            if(acc[managerName]) {
                acc[managerName].push(cur);
            } else {
                acc[managerName] = [cur];
            }
            return acc;
        }, {});
        // this commented section DOES NOT display results in table form
        // console.log('Employees by manager:');
        // for(const managerName in employeesByManager) {
        //     console.log(`\n${managerName}:`);
        //     const employees = employeesByManager[managerName];
        //     employees.forEach((employees) => {
        //         console.log(`${employees.first_name} ${employees.last_name} | ${employees.title} | ${employees.department_name}`);
        //     });
        // }

        start();
    });
}   

// Function to view employees by department
function viewEmployeesByDepartment() {
    const query = `
    SELECT 
        departments.department_name,
        employees.first_name,
        employees.last_name
    FROM 
    employees 
        INNER JOIN roles ON employees.role_id = roles.id 
        INNER JOIN departments ON roles.department_id = departments.id 
    ORDER BY 
        departments.department_name ASC
    `;

    connection.query(query, (err, res) => {
        if(err) throw err;
        console.log('\nEmployees by department:');
        console.table(res);
        start();
    });
}

// Function to delete departments, roles, & employees
function deleteDepartmentRolesEmployees() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'data',
            message: 'What would you like to delete?',
            choices: ['Departments', 'Roles', 'Employees'],
        }
    ])
    .then((answer) => {
        switch (answer.data) {
            case 'Departments':
                deleteDepartment();
                break;
            case 'Roles':
                deleteRole();
                break;
            case 'Employees':
                deleteEmployee();
                break;
            default:
                console.log(`Invalid data: ${answer.data}`);
                start();
                break;
        }
    });
}

// Function to delete employees
function deleteEmployee() {
    const query = 'SELECT * FROM employees';
    connection.query(query, (err, res) => {
        if(err) throw err;
        const employeeList = res.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));
        employeeList.push({name: 'Go Back', value: 'back'});
        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Select the employee you want to delete:',
                choices: employeeList,
            }
        ])
        .then((answer) => {
            if(answer.id === 'back') {
                deleteDepartmentRolesEmployees();
                return;
            }
            const query = 'DELETE FROM employee WHERE id = ?';
            connection.query(query, [answer.id], (err, res) => {
                if(err) throw err;
                console.log(`Delete employee with id ${answer.id} from the database`);
                start();
            });
        });
    });
}

// Function to delete role
function deleteRole() {
    const query = 'SELECT * FROM roles';
    connection.query(query, (err, res) => {
        if(err) throw err;
        const choices = res.map((role) => ({
            name: `${role.title} (${role.id}) - ${role.salary}`,
            value: role.id,
        }));
        choices.push({name: 'Go Back', value: null});
        inquirer.prompt([
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the role you want to delete:',
                choices: choices,
            }
        ])
        .then((answer) => {
            if(answer.roleId === null) {
                deleteDepartmentRolesEmployees();
                return;
            }
            const query = 'DELETE FROM roles WHERE id = ?';
            connection.query(query, [answer.roleId], (err, res) => {
                if(err) throw err;
                console.log(`Deleted role with if ${answer.roleId} from the database`);
                start();
            });
        });
    });
}

// Function to delete department
function deleteDepartment() {
    const query = 'SELECT * FROM departments';
    connection.query(query, (err, res) => {
        if(err) throw err;
        const departmentChoices = res.map((department) => ({
            name: department.department_name,
            value: department.id,
        }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'Which department do you want to delete?',
                choices: [
                    ...departmentChoices,
                    { name: 'Go Back', value: 'back' },
                ],
            }
        ])
        .then((answer) => {
            if(answer.departmentId === 'back') {
                deleteDepartmentRolesEmployees();
                return;
            } else {
                const query = 'DELETE FROM departments WHERE id = ?';
                connection.query(
                    query,
                    [answer.departmentId],
                    (err, res) => {
                        if(err) throw err;
                        console.log(`Deleted department with id ${answer.departmentId} from the database`);
                        start();
                    }
                );
            }
        });
    });
}

// Function to view total budget of department
function viewTotalUtilizedBudgetOfDepartment() {
    const query = 'SELECT * FROM departments';
    connection.query(query, (err, res) => {
        if (err) throw err;
        const departmentChoices = res.map((department) => ({
            name: department.department_name,
            value: department.id,
        }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'Which department do you want to calculate the total salary for?',
                choices: departmentChoices,
            }
        ])
        .then((answer) => {
            const query = `SELECT departments.department_name AS departments, SUM (roles.salary) AS total_salary
            FROM
            departments
            INNER JOIN roles ON departments.id = roles.department_id
            INNER JOIN employees ON roles.id = employees.role_id
            WHERE
            departments.id = ?
            GROUP BY
            departments.id;`;
            connection.query(query, [answer.departmentId], (err, res) => {
                if(err) throw err;
                const totalSalary = res[0].total_salary;
                console.log(`The total salary for employees in this department is $${totalSalary}`);
                console.table([{ "Total Salary": totalSalary }]);
                start();
            });
        });
    });
}

process.on('exit', () => {
    connection.end();
});
