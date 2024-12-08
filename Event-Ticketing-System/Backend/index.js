const Configuration = require('./Configuration');
const readlineSync = require('readline-sync');
const Customer = require('./Customer');
const Vendor = require('./Vendor');
const path = require("path");
const fs = require("fs");

const config = new Configuration();
config.configData();

const configFilePath = path.join(__dirname, 'config.json');
let configData;

try {
    const fileContents = fs.readFileSync(configFilePath, 'utf-8');
    configData = JSON.parse(fileContents);
} catch (error) {
    console.error("Error reading configuration file:", error);
    return;
}

console.log(`User Type:
        1. Customer
        2. Vendor
        3. Test
        `);

const userTypeInput = readlineSync.question("Select User Type: ");

if (userTypeInput === "1") {
    const ticketQty = parseInt(readlineSync.question("Enter Ticket Quantity: "), 10);
    const intervalRetrieval = parseInt(readlineSync.question("Enter Retrieval Interval (ms): "), 10);

    const customer = new Customer(1, intervalRetrieval);
    customer.createCustomer(ticketQty);

} else if (userTypeInput === "2") {
    const addTicketQty = parseInt(readlineSync.question("Enter Ticket Quantity: "), 10);
    const releaseInterval = parseInt(readlineSync.question("Enter Retrieval Interval (ms): "), 10);

    const vendor = new Vendor(101, releaseInterval);
    vendor.createVendor(addTicketQty);

} else if (userTypeInput === "3") {
    const ticketQty = parseInt(readlineSync.question("Enter Ticket Quantity: "), 10);
    const intervalRetrieval = parseInt(readlineSync.question("Enter Retrieval Interval (ms): "), 10);

    let number;

    do {
        const number = Math.floor(Math.random() * configData.customerRetrievalRate);

        if (number !== configData.maxTicketCapacity) {
            new Customer(101, intervalRetrieval).createCustomer(ticketQty);
        } else {
            console.log("Condition met: Exiting loop.");
        }
    } while (number !== configData.maxTicketCapacity);

    console.log("Generated the number 7!");
}