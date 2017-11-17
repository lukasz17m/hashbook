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

  describe('Content is required, tags are not', () => {
    it('throws ValidationError', async () => {
      try {
        await new Note({ tags: ['foo'] }).save();
        expect(true).to.be.false;
      } catch (e) {
        expect(e).to.have.property('name', 'ValidationError');
      }
    });

    it('saves note correctly', async () => {
      const note = await new Note({ content: 'Foobar' }).save();

      expect(note).to.have.property('isNew', false);

      expect(note.content).to.be.a('string');
      expect(note.tags).to.be.an('array');
    });
  });
});
