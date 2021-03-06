import { expect } from 'chai';
import models from '../../app/models';

const User = models.User;

describe('User Model', () => {
  describe('Create', () => {
    it('should create user success', async () => {
      const user = await User.create({
        name: 'test',
        email: 'kails@kails.org',
        password: '12345678',
        passwordConfirmation: '12345678'
      });
      const errorResult = user.authenticate('123456781');
      expect(errorResult).to.equal(false);
      const correctRusult = user.authenticate('12345678');
      expect(correctRusult).to.equal(user);
    });

    it('should create user fail when password confirmation is wrong', async () => {
      try {
        await User.create({
          name: 'test',
          email: 'kails@kails.org',
          password: '12345678',
          passwordConfirmation: '123456789'
        });
        expect(true).to.equal(false);
      } catch (error) {
        const message = error.message;
        expect(message).to.equal('Password confirmation doesn\'t match Password');
      }
    });

    it('should create user fail when password is undefined', async () => {
      try {
        await User.create({
          name: 'test',
          email: 'kails@kails.org',
        });
        expect(true).to.equal(false);
      } catch (error) {
        const message = error.message;
        expect(message).to.equal('notNull Violation: User.password cannot be null');
      }
    });
  });
});
