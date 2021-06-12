const express = require('express');
const app = express();
const carController = require('./controllers/cars');
const headbandController = require('./controllers/headbands');

app.use(express.json());

app.use(carController);
app.use(headbandController);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
