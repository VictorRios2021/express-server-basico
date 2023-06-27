require('dotenv').config();

const Server = require('./models/models');


const server = new Server();


server.listen();