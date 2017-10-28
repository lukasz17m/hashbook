const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Delete', () => {
  it('removes note created right before', async () => {
    let res;

    res = await chai.request(app)
      .post('/api/notes')
      .send({ content: 'Lorem ipsum', tags: ['lorem', 'ipsum'] });

    // Linter is annoying sometimes ^^
    const mongoID = '_id';
    const noteID = res.body[mongoID];

    expect(res.body).to.have.property('content', 'Lorem ipsum');
    expect(res.body).to.have.property('tags').eql(['lorem', 'ipsum']);

    res = await chai.request(app).delete(`/api/notes/${noteID}`);

    expect(res.body)
      .to.have.property('content')
      .to.be.equal('Lorem ipsum');

    expect(res.body)
      .to.have.property('tags')
      .to.be.eql(['lorem', 'ipsum']);

    // Check if the note doesn’t exist anymore
    try {
      await chai.request(app).delete(`/api/notes/${noteID}`);
      // Test must not reach this point
      expect(true).to.be.false;
    } catch ({ response }) {
      expect(response).to.have.status(404);
    }
  });
});
