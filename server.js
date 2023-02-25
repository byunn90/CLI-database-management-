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
        name: "firstname",
      },
      {
        type: "input",
        message: "Enter last name",
        name: "lastname",
      },
      {
        type: "input",
        message: "Enter role id",
        name: "role_id",
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO employee(first_name, last_name, role_id) values(?, ?, ?)",
        [data.firstname, data.lastname, data.role_id],
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
