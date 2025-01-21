const winston = require('winston');
const express = require('express');
const app = new express();

console.log('Starting the server...');
require('./startup/logging')();
console.log('Logging initialized...');
require('./startup/routes')(app);
console.log('Routes initialized...');
require('./startup/db')();
console.log('Database initialized...');
// require('./startup/config')();
// console.log('Config initialized...');
require('./startup/validation')();
console.log('Validation initialized...');


const port = process.env.PORT || 3001;
const server = app.listen(port, ()=> winston.info(`Listening on port ${port}...`));

module.exports = server;