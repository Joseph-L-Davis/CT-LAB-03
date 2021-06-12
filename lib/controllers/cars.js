const { Router } = require('express');
const Car = require('../models/Car');

module.exports = Router()
  .post('/api/v1/cars', async (req, res) => {
    try {
      const car = await Car.insert(req.body);
      res.send(car);
    } catch(err) {
      res.status(500).send(err);
    }
  })

  .get('/api/v1/cars/:id', async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      res.send(car);
    } catch(err) {
      res.status(500).send(err);
    }
  });
