const { Router } = require('express');
const Spirit = require('../models/Spirit');

module.exports = Router()
  .post('/api/v1/spirits', async (req, res) => {
    try {
      const spirit = await Spirit.insert(req.body);
      res.send(spirit);
    } catch(err) {
      res.status(500).send(err);
    }
  })

  .get('/api/v1/spirits/:id', async (req, res) => {
    try {
      const spirit = await Spirit.findById(req.params.id);
      res.send(spirit);
    } catch(err) {
      res.status(500).send(err);
    }
  })

  .get('/api/v1/spirits', async (req, res) => {
    try {
      const spirits = await Spirit.findAllItems();
      res.send(spirits);
    } catch(err) {
      res.status(500).send(err);
    }
  });
