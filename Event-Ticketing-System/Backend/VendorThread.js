const { parentPort, workerData } = require('worker_threads');
const { Mutex } = require('async-mutex');
const TicketPool = require('./TicketPool');
const Configuration = require('./Configuration');
const JsonConfig = require('./jsonConfig');

const ticketPool = new TicketPool();
const configuration = new Configuration();
const mutex = new Mutex();
const jsonConfig = new JsonConfig();

// Utility function to delay execution
const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Main ticket release function
async function releaseTickets() {
    while (jsonConfig.getTotalTickets() > 0) {
        await mutex.runExclusive(async () => {
            if (configuration.getCustomerRetrievalRate < workerData.ticketsPerRelease) {
                parentPort.postMessage(`Ticket Quantity should be lower than ${configuration.getCustomerRetrievalRate + 1}`);
                return;
            }

            // Add tickets
            ticketPool.addTickets(workerData.addTicketQty, workerData.vendorID);

            // Log the ticket addition
            parentPort.postMessage(`Vendor ${workerData.vendorID} added ${workerData.addTicketQty} tickets. ${jsonConfig.getTotalTickets()} tickets left`);
        });

        // Wait for the next release interval
        await delay(workerData.releaseInterval);
    }

    // Close the parent port when done
    parentPort.postMessage(`Vendor ${workerData.vendorID} finished ticket releases`);
    parentPort.close();
}

// Start ticket release process when message is received
parentPort.on('message', async (message) => {
    if (message.action === 'start') {
        await releaseTickets();
    }
});