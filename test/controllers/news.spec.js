import supertest from 'supertest';
import app from '../../app/index.js';

const request = supertest.agent(app.listen());

describe('News Controllers', () => {
  describe('GET index /', () => {
    it('should return 200', (done) => {
      request
        .get('/news', { timeout: 10000 })
        .expect(200, done);
    });
  });
});
