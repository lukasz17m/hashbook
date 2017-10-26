const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Basic HTTP tests', () => {
  it('GET on / should return 200', async () => {
    const res = await chai.request(app).get('/');

    expect(res).to.have.status(200);
    expect(res).to.have.header('X-UA-Compatible', 'IE=edge');
  });

  it('GET on /undefined/route should redirect to /', async () => {
    try {
      await chai.request(app).get('/undefined/route').redirects(0);
    } catch (err) {
      // have no idea why this is in catch…
      expect(err).to.have.status(302);
      expect(err.response).to.have.header('location', '/');
    }
  });
});
