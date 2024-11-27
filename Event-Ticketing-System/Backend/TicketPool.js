const Configuration = require('./Configuration');
const fs = require('fs');
const path = require('path');

class TicketPool {

    addTickets() {

    }

    removeTickets(ticketQty) {
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

        // Check if there are enough tickets to remove
        if (configData.maxTicketCapacity < ticketQty) {
            console.log("Not enough tickets to remove!");
            return;
        }

        // Update the total tickets
        configData.maxTicketCapacity -= ticketQty;

        // Save the updated configuration back to the JSON file
        try {
            fs.writeFileSync(configFilePath, JSON.stringify(configData, null, 2));
            console.log(`Removed ${ticketQty} tickets. New total: ${configData.maxTicketCapacity}`);
        } catch (error) {
            console.error("Error writing to configuration file:", error);
        }
    }
}

module.exports = TicketPool;