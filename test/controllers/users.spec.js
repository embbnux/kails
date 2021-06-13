import app from '../../app/index.js';
import supertest from 'supertest';

let server;
let request;

describe('Users Routes', () => {
  before((done) => {
    server = app.listen(done);
    request = supertest.agent(server);
  });
  after((done) => {
    server.close(done);
  });
  describe('GET /users/sign_in', () => {
    it('should return 200', (done) => {
      request
        .get('/users/sign_in')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });
});
