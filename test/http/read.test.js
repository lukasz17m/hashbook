const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Read', () => {
  it('should get an empty array', async () => {
    const res = await chai.request(app).get('/api/notes');

    // DB is cleared before each test
    expect(res.body).to.have.lengthOf(0);
  });
});
