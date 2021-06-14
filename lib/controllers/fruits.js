const { Router } = require('express');
const Fruit = require('../models/Fruit');

module.exports = Router()
  .post('/api/v1/fruits', async (req, res) => {
    try {
      const fruit = await Fruit.insert(req.body);
      res.send(fruit);
    } catch(err) {
      res.status(500).send(err);
    }
  });
