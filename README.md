<div align ="center">

# Employee-Tracker

![License Badge](https://shields.io/badge/license-MIT-blue)
</div>

## Table of Contents
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshot](#screenshot)
- [Contributions](#contributions)
- [Tests](#tests)
- [Links](#links)
- [Contact Information](#contact-information)
- [License](#license)

## Description
Introducing my Employee Tracker Command-Line Application! In this week's challenge, as an aspiring web developer, I was tasked with creating an employee tracker command-line application using technologies such as Node.js, the Inquirer package, and MySQL. This command-line application is tailored for business owners seeking efficient organization and planning within their companies. It offers comprehensive functionalities to view and manage departments, roles, and employees, allowing users to easily navigate through detailed displays of department names, role details, and employee information. Likewise, this application simplifies the process of adding new entries or updating employees' roles through intuitive prompts. By harnessing the capabilities of modern technologies, this application simplifies database management, empowering businesses to streamline their operations and make informed decisions. In essence, the employee tracker serves as a go-to solution for effective organizational management, ensuring smooth business processes.  

## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

```

## Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Technologies
The technologies I used in this challenge includes:

1. Node.js
2. Express.js
3. Console.table
4. MySQL2
5. Dotenv 
6. Visual Studio Code(VS-code)
7. Github: Github was used to create a repository which includes the links to the projects, server.js, package.json, db folder containing schema.sql and seeds.sql, and the README file.
8. Gitlab: Gitlab was used to clone the project to our laptop.

## Installation
1. To install the challenge#12, first create a new repository in your Github account, and then clone this repository to your local computer. 
```
To clone: git clone https://github.com/your-username/repository-name.git   
```           
2. Install Express.js [v4.19.1], Console.table [v0.10.0].

3. Install MySQL2 [v3.9.2], Inquirer [v8.2.4], and Dotenv [v16.4.5].

4. Open the cloned repository in a visual studio code.

5. Open integrated terminal on server.js in order to run 'npm install' on the command line to install dependencies. In addition, create a gitignore file, which should includes node_modules, .env file, and .DS_Store. 

## Usage
1. Open the repository, run 'npm install' to install dependencies and update the '.env file'.

2. To initiate the database setup, utilize the schema.sql file located in the db folder by executing MySQL shell commands. Similarly, use the environment variable to store sensitive data like your MySQL username, password, and database name.

3. Use the command 'npm run seed' to populate the database with test data. Afterwards, open the intergrated terminal on the 'server.js' file and execute the command 'npm start'.

4. Upon initiating the Inquirer package, navigate the command line prompt questions using the 'Up' and 'Down' arrow keys. Press 'Enter' to select respective choices.

5. Simply follow the command line prompts to explore information on departments, roles, or employees.

## Screenshot
![Employee-Tracker img_1](/assets/images/E_tracker_img_1.png)

![Employee-Tracker img_2](/assets/images/E_tracker_img_2.png)

![Employee-Tracker img_3](/assets/gist_img_1.jpeg)

## Contributions
Contributions to the Employee Tracker are welcome and encouraged. Here are some ways you can contribute:

1. **Bug Reports and Feature Requests:**
  - If you encounter any issues or have suggestions for new features, please open an issue on the GitHub repository.
    
2. **Enhancements to Regex Tutorial Application:**
  -  We welcome contributions aimed at improving this application. If you find ways to enhance the application or identify any limitations, feel free to submit a pull request.

3. **Documentation Improvements:**
  - Help improve the clarity and completeness of this documentation. If you find areas that need clarification or additional information, submit a pull request with your suggested changes.     

## Tests
There are no tests required for this project.

## Links
- [Videolink]()
- [GitHub repository](https://github.com/MunibaP/Employee-Tracker.git)
  
## Questions
I appreciate and encourage any questions you may have. Feel free to reach out for further information.
  
## Contact Information
- GitHub: [MunibaP](https://github.com/MunibaP)
- Email: munibapervez596@gmail.com

## License
Please refer to [MIT]() to acquire details about this license 

### Copyright © 2024 Muniba Pervez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

