import supertest from 'supertest';
import app from '../../app/index.js';

let server;
let request;
describe('Home Controllers', () => {
  before((done) => {
    server = app.listen(done);
    request = supertest.agent(server);
  });
  after((done) => {
    server.close(done);
  });
  describe('GET index /', () => {
    it('should return 200', (done) => {
      request
        .get('/')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('GET about', () => {
    it('should return 200', (done) => {
      request
        .get('/about')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });
});
