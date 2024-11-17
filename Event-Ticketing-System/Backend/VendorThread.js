const { parentPort, workerData } = require('worker_threads');

// Worker thread logic
parentPort.on('message', (message) => {
    console.log(`Worker received: Vendor ID ${message.vendorId}, Task: ${message.message}`);

    // Simulate a task
    const result = `Processed ticket release for vendor ${message.vendorId}`;

    // Send result back to the main thread
    parentPort.postMessage(result);

    // Exit the worker
    parentPort.close();
});