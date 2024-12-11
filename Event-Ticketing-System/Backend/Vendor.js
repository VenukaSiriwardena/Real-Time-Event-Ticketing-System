const { Worker, isMainThread } = require('worker_threads');
const { Mutex } = require('async-mutex');

const mutex = new Mutex();

class Vendor {
    #vendorId;
    #ticketsPerRelease;
    #releaseInterval;

    constructor(vendorId, ticketsPerRelease, releaseInterval) {
        this.#vendorId = vendorId;
        this.#ticketsPerRelease = ticketsPerRelease;
        this.#releaseInterval = releaseInterval;
    }

    getVendorId() {
        return this.#vendorId;
    }

    getTicketsPerRelease() {
        return this.#ticketsPerRelease;
    }

    getReleaseInterval() {
        return this.#releaseInterval;
    }

    // Utility function to delay execution
    async delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async createVendor(addTicketQty) {
        if (isMainThread) {
            const vendorID = this.getVendorId();
            const releaseInterval = this.getReleaseInterval();
            const ticketsPerRelease = this.getTicketsPerRelease();

            console.log(`Vendor ${vendorID} will start after ${releaseInterval}ms.`);
            await this.delay(releaseInterval); // Delay before starting the worker thread

            const worker = new Worker('./VendorThread.js', {
                workerData: {
                    vendorID,
                    addTicketQty,
                    ticketsPerRelease,
                    releaseInterval
                },
            });

            // Listen for messages from the worker
            worker.on('message', (message) => {
                console.log(` `);
            });

            worker.postMessage({ action: 'start', ticketsPerRelease });

            worker.on('error', (error) => {
                console.error(`Worker error for Vendor ${vendorID}:`, error);
                worker.terminate();
            });

            worker.on('exit', (code) => {
                console.log(`Vendor ${vendorID} worker exited with code ${code}`);
            });
        }
    }
}

module.exports = Vendor;