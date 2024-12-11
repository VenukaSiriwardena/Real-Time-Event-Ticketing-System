const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const Vendor = require('./Vendor');
const Configuration = require('./jsonConfig');
const TicketPool = require('./TicketPool');
const Customer = require('./Customer');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Adjust to your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Create the HTTP server first
const server = http.createServer(app);

// Then create the WebSocket server
const wss = new WebSocket.Server({
    server,
    clientTracking: true,
    verifyClient: (info, cb) => {
        cb(true);
    }
});

const configuration = new Configuration();

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);

            switch(data.type) {
                case 'UPDATE_CONFIGURATION':
                    try {
                        // Update each configuration property
                        configuration.setTotalTickets(data.config.totalTickets);
                        configuration.setTicketReleaseRate(data.config.releaseRate);
                        configuration.setCustomerRetrievalRate(data.config.retrievalRate);
                        configuration.setMaxTicketCapacity(data.config.maxCapacity);
                        configuration.setCustomerRetrievalInterval(data.config.retrievalInterval);
                        configuration.setVendorReleaseInterval(data.config.vendorReleaseInterval);

                        ws.send(JSON.stringify({
                            type: 'CONFIGURATION_RESPONSE',
                            status: 'success',
                            message: 'Configuration updated successfully'
                        }));
                    } catch (error) {
                        ws.send(JSON.stringify({
                            type: 'CONFIGURATION_RESPONSE',
                            status: 'error',
                            message: error.toString()
                        }));
                    }
                    break;

                // ... (keep existing cases for PURCHASE_TICKET and ADD_TICKETS)
                case 'PURCHASE_TICKET':
                    const { ticketQty } = data;

                    if (configuration.getTotalTickets() < ticketQty) {
                        return ws.send(JSON.stringify({
                            type: 'PURCHASE_RESPONSE',
                            status: 'error',
                            message: 'Not enough tickets available'
                        }));
                    }

                    const customer = new Customer(
                        `${Date.now()}`,
                        configuration.getCustomerRetrievalInterval()
                    );

                    try {
                        const result = await customer.createCustomer(ticketQty);
                        ws.send(JSON.stringify({
                            type: 'PURCHASE_RESPONSE',
                            status: 'success',
                            message: `Successfully purchased ${ticketQty} tickets`
                        }));
                    } catch (error) {
                        ws.send(JSON.stringify({
                            type: 'PURCHASE_RESPONSE',
                            status: 'error',
                            message: error.message
                        }));
                    }
                    break;

                case 'ADD_TICKETS':
                    const { vendorId, addTicketQty, event: ticketEvent } = data;

                    if (!vendorId || !addTicketQty || addTicketQty <= 0) {
                        return ws.send(JSON.stringify({
                            type: 'ADD_TICKETS_RESPONSE',
                            status: 'error',
                            message: 'Invalid vendor ID or ticket quantity'
                        }));
                    }

                    try {
                        const vendor = new Vendor(
                            vendorId,
                            addTicketQty,
                            1000
                        );

                        await vendor.createVendor(addTicketQty);

                        ws.send(JSON.stringify({
                            type: 'ADD_TICKETS_RESPONSE',
                            status: 'success',
                            message: `Successfully added ${addTicketQty} tickets for Vendor ${vendorId} to event ${ticketEvent}`
                        }));
                    } catch (error) {
                        console.error('Ticket addition error:', error);
                        ws.send(JSON.stringify({
                            type: 'ADD_TICKETS_RESPONSE',
                            status: 'error',
                            message: error.toString()
                        }));
                    }
                    break;

                default:
                    console.log('Unknown message type:', data.type);
                    ws.send(JSON.stringify({
                        type: 'ERROR',
                        message: 'Unknown message type'
                    }));
            }
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('close', (code, reason) => {
        console.log(`WebSocket closed. Code: ${code}, Reason: ${reason}`);
    });
});

// Error handling for the server
server.on('error', (error) => {
    console.error('HTTP Server error:', error);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`WebSocket server running on port ${PORT}`);
});