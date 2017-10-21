'use strict';

const connection = require('../../modules/mongoose/connection');

before(done => {
  connection.on('error', error => {
    done(error);
  }).once('open', () => done());
});

beforeEach(done => {
  connection.collections.notes.drop(() => done());
});

after(() => {
  connection.collections.notes.drop(() => {
    connection.close();
  });
});
