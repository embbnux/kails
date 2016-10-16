import { expect } from 'chai';
import models from '../../app/models';

describe('Article Model', () => {
  beforeEach('Create User', function () {
    return models.User.create({
      name: 'test',
      email: 'kails@kails.org',
      password: '12345678',
      passwordConfirmation: '12345678'
    });
  });
  describe('Create', () => {
    it('should create article success', () => {
      return models.User.findOne({
        email: 'kails@kails.org',
      }).then((user) => {
        return user.createArticle({
          title: 'test title',
          description: 'test description',
          content: 'test content'
        });
      }).then((article) => {
        expect(article.title).to.equal('test title');
      });
    });
  });
});
