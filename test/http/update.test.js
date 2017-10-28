const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Update', () => {
  it('updates note created right before', async () => {
    let res;

    res = await chai.request(app)
      .post('/api/notes')
      .send({
        content: 'Lorem ipsum',
        tags: ['lorem', 'ipsum'],
      });

    // Linter is annoying sometimes ^^
    const mongoID = '_id';
    const noteID = res.body[mongoID];

    expect(res.body).to.have.property('content', 'Lorem ipsum');
    expect(res.body).to.have.property('tags').eql(['lorem', 'ipsum']);

    res = await chai.request(app)
      .put(`/api/notes/${noteID}`)
      .send({
        content: 'Lorem ipsum dolor',
        tags: ['lorem', 'ipsum', 'dolor'],
      });

    expect(res.body).to.have.property('content', 'Lorem ipsum dolor');
    expect(res.body).to.have.property('tags').eql(['lorem', 'ipsum', 'dolor']);
  });
});
