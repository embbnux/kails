import supertest from 'supertest';
import app from '../../app/index.js';

const request = supertest.agent(app.listen());

describe('Home Controllers', () => {
  describe('GET index /', () => {
    it('should return 200', (done) => {
      request
        .get('/')
        .expect(200, done);
    });
  });

  describe('GET about', () => {
    it('should return 200', (done) => {
      request
        .get('/about')
        .expect(200, done);
    });
  });
});
