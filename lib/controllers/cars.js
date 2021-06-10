const { Router } = require('express');
const Car = require('../models/Car');

module.exports = Router()
  .post('/api/v1/cars', async (req, res) => {
    try {
      const car = await Car.insert(req.body.make, req.body.model, req.model.year);
      res.send(car);
    } catch(err) {
      res.status(500).send(err);
    }
  });
