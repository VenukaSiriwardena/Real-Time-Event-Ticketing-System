const { Worker, isMainThread } = require('worker_threads');
const { Mutex } = require('async-mutex');

const mutex = new Mutex();

class Customer {
    #customerID;
    #retrievalInterval;

    constructor(customerID, retrievalInterval) {
        this.#customerID = customerID;
        this.#retrievalInterval = retrievalInterval;
    }

    getCustomerID() {
        return this.#customerID;
    }

    getRetrievalInterval() {
        return this.#retrievalInterval;
    }

    async delay(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    async createCustomer(ticketQty) {
        if (isMainThread) {
            const customerID = this.getCustomerID();
            const retrievalInterval = this.getRetrievalInterval();

            console.log(`Customer ${customerID} will start after ${retrievalInterval}ms.`);
            await this.delay(retrievalInterval); // Delay before starting the worker thread

            const worker = new Worker('./CustomerThread.js', {
                workerData: { customerID, ticketQty },
            });

            worker.postMessage({ action: 'start', ticketQty });

            // Listen for the worker's response
            worker.once('message', (message) => {
                console.log(`Customer ${customerID} - Worker response: ${message}`);
                worker.terminate(); // Terminate the worker after processing
            });

            // Handle worker errors
            worker.on('error', (error) => {
                console.error(`Worker error for Customer ${customerID}:`, error);
                worker.terminate();
            });
        }
    }
}

module.exports = Customer;