const { Router } = require('express');
const Order = require('../models/Order');

// export default Router.......
module.exports = Router() // app.post(....)
  .post('/api/v1/orders', async (req, res) => {
    try {
      const order = await Order.insert(req.body.quantity);
      res.send(order);
    } catch(err) {
      res.status(500).send(err);
    }
  })
  .get('/api/v1/orders', async (req, res) => {
    try {
      const orders = await Order.getOrders();
      res.send(orders);
    } catch(err) {
      res.status(500).send(err);
    }
  })

  .put('/api/v1/orders/:id', async (req, res) => {
    try {
      const orders = await Order.putOrder(req.body.quantity, req.params.id);
      res.send(orders);
    } catch(err) {
      res.status(500).send(err);
    }
  })
  
  .delete('/api/v1/orders/:id', async (req, res) => {
    try {
      const orders = await Order.deleteOrder(req.params.id);
      res.send(orders);
    } catch(err) {
      res.status(500).send(err);
    }
  });

