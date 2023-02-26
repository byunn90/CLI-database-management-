const inquirer = require("inquirer");
const connection = require("./db/config");
const printjs = require("./public/print");
// const myRoutes = require("./routes/index");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "What would you like?",
      choices: [
        "view All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All roles",
        "Add Role",
        "View All Departments",
        "Add department",
        "Quit",
      ],
    },
  ]);
};
console.log(printjs.myspongeBob);
const newIndustry = () => {
  // console.log("What would you like to do?");
  promptUser().then((data) => {
    console.log(data);
    if (data.role === "View All Departments") {
      viewDepartments();
    } else if (data.role === "Add department") {
      addDepartments();
    } else if (data.role === "view All Employees") {
      viewAllEmployees();
    } else if (data.role === "View All roles") {
      viewAllRoles();
    } else if (data.role === "Quit") {
      countDownAndQuit();
    } else if (data.role === "Add Employee") {
      addEmployee();
    } else if (data.role === "Add Role") {
      addRole();
    }
  });
};

function viewDepartments() {
  connection.query("SELECT * FROM department", (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      console.table(rows);
      newIndustry();
    }
  });
}
function viewAllEmployees() {
  connection.query(
    "SELECT emp.id, emp.first_name, emp.last_name, role.title, dept.name as department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee emp JOIN role ON emp.role_id = role.id JOIN department dept ON role.department_id = dept.id LEFT JOIN employee manager ON emp.manager_id = manager.id",
    (error, rows) => {
      if (error) {
        console.log(error);
      } else {
        console.table(rows);
        newIndustry();
      }
    }
  );
}
// Working progress UpdateEmployeeRole() {}

// Working progress
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the new role?",
        validate: function (input) {
          if (input.trim() === "") {
            return "Please provide a title for the new role.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for the new role?",
        validate: function (input) {
          if (isNaN(input) || input.trim() === "") {
            return "Please provide a valid number for the salary.";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the new role belong to?",
        choices: [
          { name: "Sales Manager", value: 1 },
          { name: "Marketing Coordinator", value: 2 },
          { name: "Data Analysis", value: 3 },
          { name: "Programmer", value: 4 },
        ],
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [answers.title, answers.salary, answers.department_id],
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`New role ${answers.title} added successfully!`);
            newIndustry();
          }
        }
      );
    });
}

function viewAllRoles() {
  connection.query(
    "SELECT role.id, role.title, department.name as department, role.salary FROM role JOIN department ON role.department_id = department.id",
    (error, rows) => {
      if (error) {
        console.log(error);
      } else {
        console.table(rows);
        newIndustry();
      }
    }
  );
}

const quit = () => {
  console.log("GoodBye");
  process.exit();
};

const countDownAndQuit = () => {
  let count = 3;
  console.log("Quitting");
  const timer = setInterval(() => {
    console.log(count);
    count--;
    if (count < 0) {
      clearInterval(timer);
      quit();
    }
  }, 1000);
};
function addDepartments() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the department Name?",
        name: "department",
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO department(name) values(?)",
        [data.department],
        (error, rows) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Department added");
            newIndustry();
          }
        }
      );
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter First name",
        name: "first_name",
      },
      {
        type: "input",
        message: "Enter last name",
        name: "last_name",
      },
      {
        type: "list",
        name: "role",
        message: "Which department does the new role belong to?",
        choices: [
          "software engineer",
          "Sales Manager",
          "Marketing coordinator",
          "Data Analysis",
          "programmer",
        ],
      },
      {
        type: "list",
        name: "manager",
        message: "Who is your manager?",
        choices: [
          "John Doe",
          "Jane Smith",
          "Bob Johnson",
          "Alice Lee",
          "Peter Kim",
          "Karen Chen",
        ],
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          data.first_name,
          data.last_name,
          data.role_id,
          data.manager_id || null,
        ],
        (error, rows) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Employee added");
            newIndustry();
          }
        }
      );
    });
}

newIndustry();
