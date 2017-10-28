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
  const note = new Note({
    content: req.body.content,
    tags: req.body.tags,
  });

  note.save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Read
router.get('/notes', (req, res) => {
  Note.find()
    .then((notes) => {
      res.json(notes);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(404).send('Note doesn’t exist');
      } else {
        res.status(500).send(error);
      }
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
      res.json(note);
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
        note.remove().then(() => res.json(note));
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
