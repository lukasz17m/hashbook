'use strict';

const assert = require('assert');
const Note = require('../../modules/mongoose/model/note');

describe('Create note', () => {
  it('Saves a note to the database', (done) => {
    const note = new Note({
      content: 'Test note.',
      tags: ['one', 'two']
    });

    note.save().catch((error) => {
      done(error);
    }).then(() => {
      assert(!note.isNew);

      done();
    });
  });

  it('Content and tags aren\'t required', (done) => {
    const note = new Note();

    note.save().catch((error) => {
      done(error);
    }).then(() => {
      assert(!note.isNew);

      done();
    });
  });
});
