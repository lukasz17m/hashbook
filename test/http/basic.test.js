const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Basic HTTP tests', () => {
  it('GET on / should return 200', async () => {
    const res = await chai.request(app).get('/');

    expect(res).to.have.status(200);
    expect(res).to.have.header('X-UA-Compatible', 'IE=edge,chrome=1');
  });

  it('GET on /undefined/route return 404', async () => {
    try {
      await chai.request(app).get('/undefined/route');
      // must not reach this assertion
      expect(true).to.be.false;
    } catch (err) {
      // have no idea why this is in catch…
      expect(err).to.have.status(404);
    }
  });
});
