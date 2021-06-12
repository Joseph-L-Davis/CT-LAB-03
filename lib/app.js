const express = require('express');
const app = express();
const carController = require('./controllers/cars');
const headbandController = require('./controllers/headbands');
const spiritController = require('./controllers/spirits');

app.use(express.json());

app.use(carController);
app.use(headbandController);
app.use(spiritController);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
