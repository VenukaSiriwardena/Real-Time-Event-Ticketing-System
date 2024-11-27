const Configuration = require('./Configuration');
const readlineSync = require('readline-sync');
const Customer = require('./Customer');

const config = new Configuration();
config.configData();

console.log(`User Type:
        1. Customer
        2. Vendor
        `);

const userTypeInput = readlineSync.question("Select User Type: ");

if (userTypeInput === "1") {
    const ticketQty = parseInt(readlineSync.question("Enter Ticket Quantity: "), 10);
    const intervalRetrieval = parseInt(readlineSync.question("Enter Retrieval Interval (ms): "), 10);

    const customer = new Customer(101, intervalRetrieval); // Example customerID is 101
    customer.createCustomer(ticketQty);

} else if (userTypeInput === "2") {
    user.addTickets();

} else {
    console.log("Invalid User Type");
}