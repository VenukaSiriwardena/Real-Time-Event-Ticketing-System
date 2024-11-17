const readlineSync = require('readline-sync');
const fs = require('fs');

class Configuration {
    #totalTickets;
    #ticketReleaseRate;
    #customerRetrievalRate;
    #maxTicketCapacity;

    constructor(totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity) {
        this.setTotalTickets = totalTickets;
        this.setTicketReleaseRate = ticketReleaseRate;
        this.setCustomerRetrievalRate = customerRetrievalRate;
        this.setMaxTicketCapacity = maxTicketCapacity;
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
            maxTicketCapacity: this.getMaxTicketCapacity
        };

        console.log(`Configuration:
        Total Tickets: ${this.getTotalTickets}
        Ticket Release Rate: ${this.getTicketReleaseRate}
        Customer Retrieval Rate: ${this.getCustomerRetrievalRate}
        Max Ticket Capacity: ${this.getMaxTicketCapacity}
        `);

        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync('config.json', jsonData);
    }
}

module.exports = Configuration;