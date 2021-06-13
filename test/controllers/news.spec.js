import supertest from 'supertest';
import app from '../../app/index.js';

let server;
let request;

describe('News Controllers', () => {
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
        .get('/news', { timeout: 10000 })
        .expect(200, done);
    });
  });
});
