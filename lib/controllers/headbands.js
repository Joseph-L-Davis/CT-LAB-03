const { Router } = require('express');
const Headband = require('../models/Headband');

module.exports = Router()
  .post('/api/v1/headbands', async (req, res) => {
    try {
      const headband = await Headband.insert(req.body);
      res.send(headband);
    } catch(err) {
      res.status(500).send(err);
    }
  })

  .get('/api/v1/headbands/:id', async (req, res) => {
    try {
      const headband = await Headband.findById(req.params.id);
      res.send(headband);
    } catch(err) {
      res.status(500).send(err);
    }
  })

  .get('/api/v1/headbands', async (req, res) => {
    try {
      const headbands = await Headband.findAllItems();
      res.send(headbands);
    } catch(err) {
      res.status(500).send(err);
    }
  });
