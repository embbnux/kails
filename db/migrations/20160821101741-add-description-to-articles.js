'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'articles',
      'description',
      Sequelize.STRING
    );
  },

  down: function (queryInterface, _Sequelize) {
    return queryInterface.removeColumn('articles', 'description');
  }
};
