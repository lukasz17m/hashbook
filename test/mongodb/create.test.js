const chai = require('chai');
const Note = require('../../modules/mongoose/model/note');

const { expect } = chai;

describe('Create a note', () => {
  it('Saves a note to the database', async () => {
    const note = new Note({
      content: 'Test note.',
      tags: ['one', 'two'],
    });

    await note.save();

    expect(note).to.have.property('isNew', false);
  });

  it('Content and tags aren\'t required', async () => {
    const note = await new Note().save();

    expect(note).to.have.property('isNew', false);
  });
});
