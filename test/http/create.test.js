const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Create', () => {
  it('saves a note to database using HTTP API', async () => {
    const res = await chai.request(app)
      .post('/api/notes')
      .send({ content: 'Lorem ipsum', tags: ['lorem', 'ipsum'] });

    expect(res.body).to.have.property('content').to.equal('Lorem ipsum');
    expect(res.body).to.have.property('tags').eql(['lorem', 'ipsum']);
  });
});
