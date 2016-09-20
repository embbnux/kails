import app from '../app/index.js';
import supertest from 'supertest';
import { should } from 'chai';

should();
const request = supertest.agent(app.listen());

describe('Home Routes', () => {
  describe('GET /', () => {
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
