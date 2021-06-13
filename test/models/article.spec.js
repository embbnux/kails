import { expect } from 'chai';
import models from '../../app/models';

describe('Article Model', () => {
  beforeEach('Create User', async function () {
    await models.User.create({
      name: 'test',
      email: 'kails@kails.org',
      password: '12345678',
      passwordConfirmation: '12345678'
    });
  });
  describe('Create', () => {
    it('should create article success', async () => {
      const user = await models.User.findOne({
        email: 'kails@kails.org',
      });
      const article = await user.createArticle({
        title: 'test title',
        description: 'test description',
        content: 'test content'
      });
      expect(article.title).to.equal('test title');
    });
  });
});
