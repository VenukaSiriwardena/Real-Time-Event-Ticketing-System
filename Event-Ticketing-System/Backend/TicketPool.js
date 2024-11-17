const readlineSync = require('readline-sync');

class TicketPool {
    #userTypeInput;

    constructor(userTypeInput) {
        this.#userTypeInput = userTypeInput;
    }

    getUserTypeInput() {
        return this.#userTypeInput;
    }

    setUserTypeInput(userTypeInput) {
        this.#userTypeInput = userTypeInput;
    }

    userType(){
            console.log(`User Type:
            1. Customer
            2. Vendor
            `);

            const userTypeInput = readlineSync.question("Select User Type: ");
            this.setUserTypeInput(userTypeInput);

            if (userTypeInput === "1") {
                this.addTickets();

            } else if (userTypeInput === "2") {
                this.removeTickets();

            }else {
                console.log("Invalid User Type");
            }
    }
    
    addTickets() {
        console.log("Add Tickets");
    }

    removeTickets() {
        console.log("Remove Tickets");
    }
}

module.exports = TicketPool;