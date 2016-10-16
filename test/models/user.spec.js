import { expect } from 'chai';
import models from '../../app/models';

const User = models.User;

describe('User Model', () => {
  describe('Create', () => {
    it('should create user success', () => {
      return User.create({
        name: 'test',
        email: 'kails@kails.org',
        password: '12345678',
        passwordConfirmation: '12345678'
      }).then((user) => {
        const result = user.authenticate('123456781');
        expect(result).to.equal(false);
      });
    });
  });
});
