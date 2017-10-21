'use strict';

const chalk = require('chalk');
const router = require('express').Router();

const Note = require('../mongoose/model/note');

/**
* Middleware
*/

router.use((req, res, next) => {
  console.log(
    chalk.bgBlue('API'),
    chalk.blue(`[${(new Date()).toLocaleString()}] ${req.method} ${req.url}`)
  );

  next();
});

router.all('/', (req, res) => {
  res.json({ method: req.method, route: req.url });
});

/**
* CRUD
*/

// Create
router.post('/notes', (req, res) => {
  res.json({ method: req.method, route: req.url });
});

// Read
router.get('/notes', (req, res) => {
  Note.find({}, (error, notes) => {
    if (error) {
      res.status(500).send(error);
    }

    res.json({ method: req.method, route: req.url, notes });
  });
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
