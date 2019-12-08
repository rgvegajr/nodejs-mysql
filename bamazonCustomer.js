//require packages and set global variables
const mysql = require("mysql");
const inquirer = require("inquirer");
//would normally use dotenv to handle keys, pws, etc

//user should edit and save the following database connection code with appropriate host,port,user,password, and database specifics
const connection = mysql.createConnection({ //creatConnection function takes in object with host, port, un, pw, db name, etc
    host: "localhost", //url where databse lives
    // your port; if not 3306
    port: 3306,
    // your username
    user: "root",
    //yourpassword
    password: "",
    database: "storeItems_db"
});

//declare functions
function updateItem(item_id, stock_quantity, numberToBuy) {
    let updatedQuantity = stock_quantity - numberToBuy;
    const query = connection.query(
        "UPDATE items SET stock_quantity=" + updatedQuantity + " WHERE item_id = " + item_id + ";",
        function(err, res) {
            if (err) throw err;
        }
    );
}

function askBuyerItem(itemArr) {
    inquirer
        .prompt([
            // prompt user for desired item id.
            {
                type: "input",
                message: "What is the id of the item you would like to purchase?[Quit with Q]",
                name: "itemId"
            }
        ])
        .then(function(inquirerResponse) {
            if ((inquirerResponse.itemId == "q") || (inquirerResponse.itemId == "Q")) {
                console.log("Goodbye!");
                connection.end();
                return;
            } else if (inquirerResponse.itemId > itemArr.length) {
                console.log("Sorry, item does not exist.  Please choose an existing item.");
                askBuyerItem(itemArr);
            } else {
                const index = inquirerResponse.itemId - 1;
                askBuyerNumber(itemArr, index);
            }
        });
}

function askBuyerNumber(itemArr, index) {
    inquirer
        .prompt([
            // prompt user for number to buy.
            {
                type: "input",
                message: "How many would you like to purchase?[Quit with Q]",
                name: "numberToBuy"
            }
        ])
        .then(function(inquirerResponse) {
            if ((inquirerResponse.numberToBuy == "q") || (inquirerResponse.numberToBuy == "Q")) {
                console.log("Goodbye!");
                connection.end();
                return;
            } else
            if (inquirerResponse.numberToBuy <= itemArr[index].stock_quantity) {
                console.log("--------------------------------------------------------------------");
                console.log("\nSuccessfully purchased " + inquirerResponse.numberToBuy + " of " + itemArr[index].product_name + " for a total cost of $" + ((itemArr[index].price * inquirerResponse.numberToBuy)).toFixed(2) + ".");
                updateItem(itemArr[index].item_id, itemArr[index].stock_quantity, inquirerResponse.numberToBuy);
            } else {
                console.log("--------------------------------------------------------------------");
                console.log("\nInsufficient quantity!");
            };
            console.log("\n--------------------------------------------------------------------");
            afterConnection();
        });
}

function afterConnection() {
    connection.query("SELECT * FROM items", function(err, res) {
        if (err) throw err;
        console.table(res);
        const itemArr = Object.values(res);
        askBuyerItem(itemArr);
    });
}

//establish connection and call functions
connection.connect(function(err) { //before calling any other functions to query database, etc, must ensure a connection
    if (err) throw err;
    afterConnection();
});