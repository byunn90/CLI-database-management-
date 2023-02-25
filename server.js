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

const newIndustry = () => {
  // console.log(printjs.myspongeBob);
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
  connection.query("SELECT * FROM employee", (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      console.table(rows);
      newIndustry();
    }
  });
}
function viewAllRoles() {
  connection.query(
    "SELECT id, title, department_id, salary FROM role",
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
// Working progress
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
        type: "input",
        message: "Enter role id",
        name: "role_id",
      },
      {
        type: "input",
        message: "Enter manager id",
        name: "manager_id",
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
