'use strict';

const chai = require('chai');
const connection = require('../../modules/mongoose/connection');
const Note = require('../../modules/mongoose/model/note');

const expect = chai.expect;

describe('Update notes', () => {
  it('Update one note by ID', async () => {
    const note1 = new Note({
      content: 'Lorem ipsum.',
      tags: ['lorem', 'ipsum']
    });

    const note2 = new Note({
      content: 'Dolor sit amet.',
      tags: ['dolor', 'sit', 'amet']
    });

    await note1.save();
    await note2.save();

    const note = await Note.findById(note2.id);
    note.content = 'Dolor.'
    note.tags.pop();
    note.tags.pop();

    await note.save();

    const updatedNote = await Note.findById(note.id);

    expect(updatedNote.content).to.equal('Dolor.');
    expect(updatedNote.tags).to.have.length(1);
  });
});
