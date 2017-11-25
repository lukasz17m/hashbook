const chalk = require('chalk');
const router = require('express').Router();

const log = require('../utils/log');
const Note = require('../mongoose/model/note');

/**
* Middleware
*/

router.use((req, res, next) => {
  log(
    chalk.bgBlue('API'),
    chalk.blue(`[${(new Date()).toLocaleString()}] ${req.method} ${req.url}`),
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
  new Note({
    content: req.body.content,
    tags: req.body.tags,
  }).save()
    .then((note) => {
      res.json({
        /* eslint-disable no-underscore-dangle */
        id: note._id,
        content: note.content,
        tags: note.tags,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Read
router.get('/notes', (req, res) => {
  Note.find({})
    .sort({ _id: 'asc' })
    .then((notes) => {
      res.json(notes.map(note => ({
        /* eslint-disable no-underscore-dangle */
        id: note._id,
        content: note.content,
        tags: note.tags,
      })));
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Update
router.put('/notes/:id', (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      note.set({
        content: req.body.content,
        tags: req.body.tags,
      });

      return note.save();
    })
    .then((note) => {
      res.json({
        /* eslint-disable no-underscore-dangle */
        id: note._id,
        content: note.content,
        tags: note.tags,
      });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(404).send('Note doesn’t exist');
      } else {
        res.status(500).send(error);
      }
    });
});

// Delete
router.delete('/notes/:id', (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (!note) {
        res.status(404).send('Note doesn’t exist');
      } else {
        note.remove().then(() => {
          res.json({
            /* eslint-disable no-underscore-dangle */
            id: note._id,
            content: note.content,
            tags: note.tags,
          });
        });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(404).send('Note doesn’t exist');
      } else {
        res.status(500).send(error);
      }
    });
});

module.exports = router;
