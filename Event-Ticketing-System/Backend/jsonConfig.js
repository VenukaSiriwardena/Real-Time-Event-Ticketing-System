const fs = require('fs');

class Configuration {
    #fileName;
    #data;

    constructor(fileName = 'config.json') {
        this.#fileName = fileName;
        this.#data = this.loadFromJSON();
    }

    // Method to load data from JSON
    loadFromJSON() {
        if (fs.existsSync(this.#fileName)) {
            const data = JSON.parse(fs.readFileSync(this.#fileName, 'utf-8'));
            console.log(`Configuration loaded from ${this.#fileName}`);
            return data;
        } else {
            console.error(`File ${this.#fileName} does not exist. Using default values.`);
            return {}; // Default empty object
        }
    }

    // Method to save data to JSON
    saveToJSON() {
        fs.writeFileSync(this.#fileName, JSON.stringify(this.#data, null, 2), 'utf-8');
        console.log(`Configuration saved to ${this.#fileName}`);
    }

    // Getters
    getTotalTickets() {
        return this.#data.totalTickets || 0;
    }

    // Setters
    setTotalTickets(value) {
        this.#data.totalTickets = value;
        this.saveToJSON();
    }

    // Additional getter and setter methods for other properties
    getTicketReleaseRate() {
        return this.#data.ticketReleaseRate || 0;
    }

    setTicketReleaseRate(value) {
        this.#data.ticketReleaseRate = value;
        this.saveToJSON();
    }

    getCustomerRetrievalRate() {
        return this.#data.customerRetrievalRate || 0;
    }

    setCustomerRetrievalRate(value) {
        this.#data.customerRetrievalRate = value;
        this.saveToJSON();
    }

    getMaxTicketCapacity() {
        return this.#data.maxTicketCapacity || 0;
    }

    setMaxTicketCapacity(value) {
        this.#data.maxTicketCapacity = value;
        this.saveToJSON();
    }

    getCustomerRetrievalInterval() {
        return this.#data.customerRetrievalInterval || 0;
    }

    setCustomerRetrievalInterval(value) {
        this.#data.customerRetrievalInterval = value;
        this.saveToJSON();
    }

    getVendorReleaseInterval() {
        return this.#data.vendorReleaseInterval || 0;
    }

    setVendorReleaseInterval(value) {
        this.#data.vendorReleaseInterval = value;
        this.saveToJSON();
    }
}

module.exports = Configuration;