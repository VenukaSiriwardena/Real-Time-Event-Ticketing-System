const Configuration = require('./Configuration');

const config = new Configuration();
config.configData();

const ticketPool = require('./TicketPool');
const user = new ticketPool();

user.userType();