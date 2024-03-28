-- Adding Departments
INSERT INTO departments (department_name)
VALUES
('Marketing'),
('Finance'),
('Engineering'),
('Information Technology'),
('Customer Relations'),
('Legal'),
('Human Resources'),
('Sales'),
('Maintenance'),
('Research and Development');

-- Adding Roles
INSERT INTO roles (title, salary, department_id)
VALUES
('Senior-level Marketing Manager', 100000, 1),
('Finance Analyst', 70000, 2),
('Senior Engineering', 150000, 3),
('IT Manager', 180000, 4),
('Director of Customer Relations', 76000, 5),
('Attorney', 200000, 6),
('Chief HR Officer', 300000, 7),
('Sales Manager', 60000, 8),
('Maintenance Supervisor', 80000, 9),
('R&D Manager', 200000, 10);

-- Adding Employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Smith', 1, 1),
('Emily', 'Johnson', 2, 1),
('Michael', 'Williams', 3, NULL),
('Emma', 'Jones', 4, 2),
('Daniel', 'Brown', 5, 4),
('Sarah', 'Davis', 6, 5),
('David', 'Miller', 7, NULL),
('Olivia', 'Wilson', 8, 3),
('James', 'Taylor', 9, 6),
('Sophia', 'Moore', 10, 8);
