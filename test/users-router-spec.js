import app from '../app/index.js';
import supertest from 'supertest';
import { should } from 'chai';

should();
const request = supertest.agent(app.listen());

describe('Users Routes', () => {
  describe('GET /users/sign_in', () => {
    it('should return 200', (done) => {
      request
        .get('/users/sign_in')
        .expect(200, done);
    });
  });
});
