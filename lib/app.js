const express = require('express');
const app = express();
const carController = require('./controllers/cars');

app.use(express.json());

app.use(carController);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
