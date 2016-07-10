function ArticleModel(sequelize, DataTypes) {
  const Article = sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    content: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true
      }
    }
  },{
    underscored: true,
    tableName: 'articles',
    classMethods: {
      associate: function(models) {
        Article.belongsTo(models.User, { foreignKey: 'user_id' })
      }
    }
  })
  return Article
}

export default ArticleModel
