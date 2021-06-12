const express = require('express');
const app = express();
const carController = require('./controllers/cars');
const headbandController = require('./controllers/headbands');
const spiritController = require('./controllers/spirits');
const entreeController = require('./controllers/entrees');

app.use(express.json());

app.use(carController);
app.use(headbandController);
app.use(spiritController);
app.use(entreeController);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
