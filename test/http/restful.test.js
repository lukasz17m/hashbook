'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

const should = chai.should();

chai.use(chaiHttp);

describe('Testing RESTful API', () => {
  it('GET on / should return 200', (done) => {
    chai.request(app)
    .get('/')
    .end((error, res) => {
      res.should.have.status(200);

      done();
    });
  });
});
