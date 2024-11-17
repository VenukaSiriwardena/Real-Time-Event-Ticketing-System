const { Worker, isMainThread } = require('worker_threads');

class Vendor {
    #vendorId;
    #ticketsPerRelease;
    #releaseInterval;

    constructor(vendorId, ticketsPerRelease, releaseInterval) {
        this.#vendorId = vendorId;
        this.#ticketsPerRelease = ticketsPerRelease;
        this.#releaseInterval = releaseInterval;
    }

    get getVendorId() {
        return this.#vendorId;
    }

    get getTicketsPerRelease() {
        return this.#ticketsPerRelease;
    }

    get getReleaseInterval() {
        return this.#releaseInterval;
    }

    set setVendorId(vendorId) {
        this.#vendorId = vendorId;
    }

    set setTicketsPerRelease(ticketsPerRelease) {
        this.#ticketsPerRelease = ticketsPerRelease;
    }

    set setReleaseInterval(releaseInterval) {
        this.#releaseInterval = releaseInterval;
    }
}

if (isMainThread) {
    const worker = new Worker('./VendorThread.js');

    // Listen for messages from the worker
    worker.on('message', (message) => {
        console.log(`Main thread received: ${message}`);
    });

    // Send a message to the worker
    worker.postMessage({ vendorId: 101, message: 'Release tickets' });

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