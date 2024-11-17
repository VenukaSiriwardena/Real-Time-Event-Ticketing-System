const { Worker, isMainThread } = require('worker_threads');

class Customer {
    #customerId;
    #retrievalInterval;

    constructor(customerId, retrievalInterval) {
        this.#customerId = customerId;
        this.#retrievalInterval = retrievalInterval;
    }

    get getCustomerId() {
        return this.#customerId;
    }

    get getRetrievalInterval() {
        return this.#retrievalInterval;
    }

    set setCustomerId(customerId) {
        this.#customerId = customerId;
    }

    set setRetrievalInterval(retrievalInterval) {
        this.#retrievalInterval = retrievalInterval;
    }
}

    if (isMainThread) {
        const worker = new Worker('./CustomerThread.js');

        // Listen for messages from the worker
        worker.on('message', (message) => {
            console.log(`Main thread received: ${message}`);
        });

        // Send a message to the worker
        worker.postMessage({vendorId: 101, message: 'Release tickets'});

        // Handle errors
        worker.on('error', (error) => {
            console.error(`Worker error: ${error}`);
        });

        // Handle worker exit
        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
            } else {
                console.log('Worker exited successfully.');
            }
        });
}