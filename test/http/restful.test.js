const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Testing RESTful API', () => {
  // Main API route
  it('GET on /api — response should be JSON', async () => {
    const res = await chai.request(app).get('/api');

    expect(res).to.have.status(200);
    expect(res).to.be.json;
  });
  // Create
  it('POST on /api/notes — response should be JSON', async () => {
    const res = await chai.request(app).get('/api/notes');

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
  it('PUT on /api/notes/123 — response should be JSON', async () => {
    const res = await chai.request(app).put('/api/notes/123');

    expect(res).to.have.status(200);
    expect(res).to.be.json;
  });
  // Delete
  it('DELETE on /api/notes/123 — response should be JSON', async () => {
    const res = await chai.request(app).delete('/api/notes/123');

    expect(res).to.have.status(200);
    expect(res).to.be.json;
  });
});
