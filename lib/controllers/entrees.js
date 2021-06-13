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
  })

  .get('/api/v1/entrees', async (req, res) => {
    try {
      const entrees = await Entree.findAllItems();
      res.send(entrees);
    } catch(err) {
      res.status(500).send(err);
    }
  })

  .put('/api/v1/entrees/:id', async (req, res) => {
    try {
      const entree = await Entree.updateItem(req.params.id);
      res.send(entree);
    } catch(err) {
      res.status(500).send(err);
    }
  })

  .delete('/api/v1/entrees/:id', async (req, res) => {
    try {
      const entree = await Entree.deleteItem(req.params.id);
      res.send(entree);
    } catch(err) {
      res.status(500).send(err);
    }
  });
