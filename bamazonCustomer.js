const mysql = require("mysql");
const inquirer = require("inquirer");
//would normally use dotenv to handle keys, pws, etc

// const connection = mysql.createConnection({ //creatConnection function takes in object with host, port, un, pw, db name, etc
//     host: "localhost", //url where databse lives

//     // your port; if not 3306
//     port: 3306,

//     // your username
//     user: "root",

//     //yourpassword
//     password: "",

//     database: "ice_creamDB"
// });

// connection.connect(function(err) {    //before calling any other functions to query database, etc, must ensure a connection
//     if (err) throw err;
//     console.log(`connected as id ${connection.threadId}`);
//     connection.end(); //closes connection to db, critical to always do...or replace this with desired function and ensure this line is included at the end of the function

// });

// Create a "Prompt" with a series of questions.
inquirer
    .prompt([
    // prompt user for desired item id.
        {
            type: "input",
            message: "What is the id of the item you would like to purchase?",
            name: "itemId"
    },
        {
            type: "input",
            message: "How many would you like to purchase?",
            name: "numberToBuy"
    }
    // Here we create a basic password-protected text prompt.
    // {
    //   type: "password",
    //   message: "Set your password",
    //   name: "password"
    // },
    // // Here we give the user a list to choose from.
    // {
    //   type: "list",
    //   message: "Which Pokemon do you choose?",
    //   choices: ["Bulbasaur", "Squirtle", "Charmander"],
    //   name: "pokemon"
    // },
    // // Here we ask the user to confirm.
    // {
    //   type: "confirm",
    //   message: "Are you sure:",
    //   name: "confirm",
    //   default: true
    // }
  ])
    .then(function(inquirerResponse) {
        console.log("\nYou chose to purchase " + inquirerResponse.numberToBuy + " of " + inquirerResponse.itemId);
    });
