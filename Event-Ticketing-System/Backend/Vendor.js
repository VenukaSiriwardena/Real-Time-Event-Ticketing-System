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

    get vendorId() {
        return this.#vendorId;
    }

    get ticketsPerRelease() {
        return this.#ticketsPerRelease;
    }

    get releaseInterval() {
        return this.#releaseInterval;
    }

    set vendorId(vendorId) {
        this.#vendorId = vendorId;
    }

    set ticketsPerRelease(ticketsPerRelease) {
        this.#ticketsPerRelease = ticketsPerRelease;
    }

    set releaseInterval(releaseInterval) {
        this.#releaseInterval = releaseInterval;
    }

    // Utility function to delay execution
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async createVendor(addTicketQty) {
        if (isMainThread) {
            const vendorID = this.vendorId;
            const releaseInterval = this.releaseInterval;
            const ticketsPerRelease = this.ticketsPerRelease;

            console.log(`Vendor ${vendorID} will start after ${releaseInterval}ms.`);
            await this.delay(releaseInterval); // Delay before starting the worker thread

            const worker = new Worker('./VendorThread.js', {
                workerData: { vendorID, addTicketQty, ticketsPerRelease },
            });

            // Listen for messages from the worker
            worker.on('message', (message) => {
                console.log(`Main thread received: ${message}`);
            });

            worker.postMessage({ action: 'start', ticketsPerRelease });

            worker.once('message', (message) => {
                console.log(`Vendor ${vendorID} - Worker response: ${message}`);
                worker.terminate(); // Terminate the worker after processing
            });

            worker.on('error', (error) => {
                console.error(`Worker error for Vendor ${vendorID}:`, error);
                worker.terminate();
            });
        }
    }
}

module.exports = Vendor;