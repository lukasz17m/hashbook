const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('RESTful API', () => {
  // Main API route
  it('GET on /api — response should be JSON', async () => {
    const res = await chai.request(app).get('/api');

    expect(res).to.have.status(200);
    expect(res).to.be.json;
  });
  // Create
  it('POST on /api/notes — response should be JSON', async () => {
    const res = await chai.request(app).post('/api/notes');

    expect(res).to.have.status(200);
    expect(res).to.be.json;
  });
  // Read
  it('GET on /api/notes — response should be JSON', async () => {
    const res = await chai.request(app).get('/api/notes');

    expect(res).to.have.status(200);
    expect(res).to.be.json;
  });
  // Update
  it('PUT on /api/notes/notexistihope — status should be 500', async () => {
    try {
      await chai.request(app).put('/api/notes/notexistihope');
      // Test must not reach this point
      expect(true).to.be.false;
    } catch ({ response }) {
      expect(response).to.have.status(404);
    }
  });
  // Delete
  it('DELETE on /api/notes/notexistihope — status should be 500', async () => {
    try {
      await chai.request(app).delete('/api/notes/notexistihope');
      // Test must not reach this point
      expect(true).to.be.false;
    } catch ({ response }) {
      expect(response).to.have.status(404);
    }
  });
});
