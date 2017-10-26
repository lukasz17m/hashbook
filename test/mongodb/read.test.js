const chai = require('chai');
const Note = require('../../modules/mongoose/model/note');

const { expect } = chai;

describe('Read notes', () => {
  it('Get exactly two notes', async () => {
    const note1 = new Note({
      content: 'Lorem ipsum.',
      tags: ['lorem', 'ipsum'],
    });

    const note2 = new Note({
      content: 'Dolor sit amet.',
      tags: ['dolor', 'sit', 'amet'],
    });

    await note1.save();
    await note2.save();

    const notes = await Note.find({});

    expect(notes).to.have.length(2);
  });
});
