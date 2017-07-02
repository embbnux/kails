function ArticleModel(sequelize, DataTypes) {
  const Article = sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 250]
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },{
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'articles',
    getterMethods : {
      createdAt: function() {
        return this.created_at;
      }
    }
  });

  Article.associate = function(models) {
    Article.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Article;
}

export default ArticleModel;
