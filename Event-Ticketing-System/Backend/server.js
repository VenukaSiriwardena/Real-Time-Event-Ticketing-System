const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TicketPool = require('./TicketPool');
const Configuration = require('./jsonConfig');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let clients = [];
let systemStatus = true; // true means the system is running

app.post('/addTickets', (req, res) => {
    if (!systemStatus) {
        return res.status(403).send({ message: 'System is stopped. Cannot add tickets.' });
    }

    const { addTicketQty, vendorId } = req.body;
    const ticketPool = new TicketPool();

    try {
        ticketPool.addTickets(addTicketQty, vendorId);
        res.status(200).send({ message: 'Tickets added successfully' });
        notifyClients();
    } catch (error) {
        console.error('Error adding tickets:', error);
        res.status(500).send({ message: 'Failed to add tickets. Please try again.' });
    }
});

app.post('/buyTickets', (req, res) => {
    if (!systemStatus) {
        return res.status(403).send({ message: 'System is stopped. Cannot buy tickets.' });
    }

    const { ticketQty, customerId } = req.body;
    const ticketPool = new TicketPool();

    try {
        ticketPool.removeTickets(ticketQty, customerId);
        res.status(200).send({ message: 'Tickets purchased successfully' });
        notifyClients();
    } catch (error) {
        console.error('Error purchasing tickets:', error);
        res.status(500).send({ message: 'Failed to purchase tickets. Please try again.' });
    }
});

app.get('/totalTickets', (req, res) => {
    const ticketPool = new TicketPool();
    const totalTickets = ticketPool.getTotalTickets();
    res.json({ totalTickets });
});

app.get('/ticketsSold', (req, res) => {
    const ticketPool = new TicketPool();
    const ticketsSold = ticketPool.getTicketsSold();
    res.json({ ticketsSold });
});

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    clients.push(res);

    req.on('close', () => {
        clients = clients.filter(client => client !== res);
    });
});

app.get('/systemStatus', (req, res) => {
    res.json({ systemStatus });
});

app.post('/updateSystemStatus', (req, res) => {
    systemStatus = req.body.systemStatus;
    res.status(200).send({ message: 'System status updated successfully' });
});

app.post('/updateConfig', (req, res) => {
    const config = new Configuration();
    const { totalTickets, releaseRate, retrievalRate, maxCapacity, retrievalInterval, vendorReleaseInterval } = req.body;

    try {
        config.setTotalTickets(totalTickets);
        config.setTicketReleaseRate(releaseRate);
        config.setCustomerRetrievalRate(retrievalRate);
        config.setMaxTicketCapacity(maxCapacity);
        config.setCustomerRetrievalInterval(retrievalInterval);
        config.setVendorReleaseInterval(vendorReleaseInterval);

        res.status(200).send({ message: 'Configuration updated successfully' });
    } catch (error) {
        console.error('Error updating configuration:', error);
        res.status(500).send({ message: 'Failed to update configuration. Please try again.' });
    }
});

function notifyClients() {
    clients.forEach(client => client.write(`data: update\n\n`));
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});