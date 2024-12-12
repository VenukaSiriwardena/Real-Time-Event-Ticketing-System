const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_database'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database!');
});

class TicketPool {
    addTickets(addTicketQty, vendorID) {
        // Load existing configuration from JSON file
        const configFilePath = path.join(__dirname, 'config.json');
        let configData;

        try {
            const fileContents = fs.readFileSync(configFilePath, 'utf-8');
            configData = JSON.parse(fileContents);
        } catch (error) {
            console.error("Error reading configuration file:", error);
            return;
        }

        // Check if adding tickets exceeds the total capacity
        if (configData.totalTickets === 0) {
            console.log("Cannot add tickets: exceeds total capacity!");
            return;
        }

        if (configData.maxTicketCapacity === configData.ticketPool) {
            console.log("Cannot add tickets: exceeds ticketpool!");
            return;
        }

        // Update the total tickets
        configData.ticketPool += addTicketQty;
        configData.totalTickets -= addTicketQty;

        // Save the updated configuration back to the JSON file
        try {
            fs.writeFileSync(configFilePath, JSON.stringify(configData, null, 2));
            console.log(`Added ${addTicketQty} tickets. New total: ${configData.ticketPool}`);
        } catch (error) {
            console.error("Error writing to configuration file:", error);
        }

        const insertQuery = 'INSERT INTO vendor (VendorID, NumOfTicketsAdd) VALUES (?, ?)';
        const values = [vendorID, addTicketQty];

        // Insert data into the database
        connection.query(insertQuery, values, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
            } else {
                console.log('Ticket addition recorded in the database.');
            }
        });
    }

    removeTickets(ticketQty, CustomerID) {
        // Load existing configuration from JSON file
        const configFilePath = path.join(__dirname, 'config.json');
        let configData;

        try {
            const fileContents = fs.readFileSync(configFilePath, 'utf-8');
            configData = JSON.parse(fileContents);
        } catch (error) {
            console.error("Error reading configuration file:", error);
            return;
        }

        if (configData.totalTickets < ticketQty) {
            console.log("Not enough tickets to remove!");
            return;
        }

        // Check if there are enough tickets to remove
        if (configData.ticketPool < ticketQty) {
            console.log("Not enough tickets to remove!");
            return;
        }

        // Update the total tickets and calculate tickets sold
        configData.ticketPool -= ticketQty;
        configData.ticketsSold = (configData.ticketsSold || 0) + ticketQty;

        // Save the updated configuration back to the JSON file
        try {
            fs.writeFileSync(configFilePath, JSON.stringify(configData, null, 2));
            console.log(`Removed ${ticketQty} tickets. New total: ${configData.ticketPool}`);
        } catch (error) {
            console.error("Error writing to configuration file:", error);
        }

        // Generate a unique CustomerID using UUID
        const uniqueCustomerID = uuidv4();

        const insertQuery = 'INSERT INTO customer (CustomerID, NumOfTicketsBuy) VALUES (?, ?)';
        const values = [uniqueCustomerID, ticketQty];

        // Insert data into the database
        connection.query(insertQuery, values, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
            } else {
                console.log('Ticket purchase recorded in the database.');
            }
        });
    }

    getTotalTickets() {
        // Load existing configuration from JSON file
        const configFilePath = path.join(__dirname, 'config.json');
        let configData;

        try {
            const fileContents = fs.readFileSync(configFilePath, 'utf-8');
            configData = JSON.parse(fileContents);
        } catch (error) {
            console.error("Error reading configuration file:", error);
            return 0;
        }

        return configData.totalTickets;
    }

    getTicketsSold() {
        // Load existing configuration from JSON file
        const configFilePath = path.join(__dirname, 'config.json');
        let configData;

        try {
            const fileContents = fs.readFileSync(configFilePath, 'utf-8');
            configData = JSON.parse(fileContents);
        } catch (error) {
            console.error("Error reading configuration file:", error);
            return 0;
        }

        return configData.ticketsSold || 0;
    }
}

module.exports = TicketPool;