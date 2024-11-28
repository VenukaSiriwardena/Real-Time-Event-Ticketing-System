const { parentPort, workerData } = require('worker_threads');
const { Mutex } = require('async-mutex');
const TicketPool = require('./TicketPool');
const Configuration = require('./Configuration');

const ticketPool = new TicketPool();
const configuration = new Configuration();
const mutex = new Mutex();

// Handle ticket requests
parentPort.on('message', async (message) => {
    await mutex.runExclusive(() => {
        if (configuration.getCustomerRetrievalRate < workerData.ticketQty) {
            parentPort.postMessage(`Ticket Quantity should lower than ${configuration.getCustomerRetrievalRate + 1}`);
        }else{
            ticketPool.addTickets(workerData.addTicketQty);
        }
    });
    parentPort.close();
});