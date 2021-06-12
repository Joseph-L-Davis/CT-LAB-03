const { Router } = require('express');
const Entree = require('../models/Entree');

module.exports = Router()
  .post('/api/v1/entrees', async (req, res) => {
    try {
      const entree = await Entree.insert(req.body);
      res.send(entree);
    } catch(err) {
      res.status(500).send(err);
    }
  })

  .get('/api/v1/entrees/:id', async (req, res) => {
    try {
      const entree = await Entree.findById(req.params.id);
      res.send(entree);
    } catch(err) {
      res.status(500).send(err);
    }
  });
