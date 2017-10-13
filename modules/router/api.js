'use strict';

const log = require('npmlog');
const router = require('express').Router();

const Note = require('../mongoose/model/note');

/**
* Middleware
*/

router.use((req, res, next) => {
  log.info('API', `[${(new Date()).toLocaleString()}] ${req.method} ${req.url}`);

  next();
});

router.all('/', (req, res) => {
  res.json({ method: req.method, route: req.url });
});

/**
* CRUD
*/

// Read
router.get('/notes', (req, res) => {
  Note.find({}, (error, notes) => {
    if (error) {
      res.status(500).send(error);
    }

    res.json({ method: req.method, route: req.url, notes });
  });
});

// Create
router.post('/notes', (req, res) => {
  res.json({ method: req.method, route: req.url });
});

// Update
router.put('/notes/:id', (req, res) => {
  res.json({ method: req.method, route: req.url, params: req.params });
});

// Delete
router.delete('/notes/:id', (req, res) => {
  res.json({ method: req.method, route: req.url, params: req.params });
});

module.exports = router;
