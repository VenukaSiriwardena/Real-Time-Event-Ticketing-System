const readlineSync = require('readline-sync');
const fs = require('fs');

class Configuration {
    #totalTickets;
    #ticketReleaseRate;
    #customerRetrievalRate;
    #maxTicketCapacity;
    #customerRetrievalInterval;
    #VendorReleaseInterval;

    constructor(totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity, customerRetrievalInterval, VendorReleaseInterval) {
        this.setTotalTickets = totalTickets;
        this.setTicketReleaseRate = ticketReleaseRate;
        this.setCustomerRetrievalRate = customerRetrievalRate;
        this.setMaxTicketCapacity = maxTicketCapacity;
        this.setCustomerRetrievalInterval = customerRetrievalInterval;
        this.setVendorReleaseInterval = VendorReleaseInterval;
    }

    // Getters
    get getTotalTickets() {
        return this.#totalTickets;
    }

    get getTicketReleaseRate() {
        return this.#ticketReleaseRate;
    }

    get getCustomerRetrievalRate() {
        return this.#customerRetrievalRate;
    }

    get getMaxTicketCapacity() {
        return this.#maxTicketCapacity;
    }

    get getCustomerRetrievalInterval() {
        return this.#customerRetrievalInterval;
    }

    get getVendorReleaseInterval() {
        return this.#VendorReleaseInterval;
    }

    // Setters
    set setTotalTickets(totalTickets) {
        this.#totalTickets = totalTickets;
    }

    set setTicketReleaseRate(ticketReleaseRate) {
        this.#ticketReleaseRate = ticketReleaseRate;
    }

    set setCustomerRetrievalRate(customerRetrievalRate) {
        this.#customerRetrievalRate = customerRetrievalRate;
    }

    set setMaxTicketCapacity(maxTicketCapacity) {
        this.#maxTicketCapacity = maxTicketCapacity;
    }

    set setCustomerRetrievalInterval(customerRetrievalInterval) {
        this.#customerRetrievalInterval = customerRetrievalInterval;
    }

    set setVendorReleaseInterval(VendorReleaseInterval) {
        this.#VendorReleaseInterval = VendorReleaseInterval;
    }

    // Methods
    configData() {
        const totalTicketsInput = readlineSync.question("Total Number of Tickets: ");
        const ticketReleaseRateInput = readlineSync.question("Ticket Release Rate: ");
        const customerRetrievalRateInput = readlineSync.question("Customer Retrieval Rate: ");
        const maxTicketCapacityInput = readlineSync.question("Max Ticket Capacity: ");

        this.setTotalTickets = Number(totalTicketsInput);
        this.setTicketReleaseRate = Number(ticketReleaseRateInput);
        this.setCustomerRetrievalRate = Number(customerRetrievalRateInput);
        this.setMaxTicketCapacity = Number(maxTicketCapacityInput);

        const data = {
            totalTickets: this.getTotalTickets,
            ticketReleaseRate: this.getTicketReleaseRate,
            customerRetrievalRate: this.getCustomerRetrievalRate,
            maxTicketCapacity: this.getMaxTicketCapacity,
            ticketPool: this.getMaxTicketCapacity // Ensure ticketPool matches maxTicketCapacity
        };

        console.log(`Configuration:
        Total Tickets: ${this.getTotalTickets}
        Ticket Release Rate: ${this.getTicketReleaseRate}
        Customer Retrieval Rate: ${this.getCustomerRetrievalRate}
        Max Ticket Capacity: ${this.getMaxTicketCapacity}
        Ticket Pool: ${data.ticketPool}
        `);

        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync('config.json', jsonData);
    }
}

module.exports = Configuration;