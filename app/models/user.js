import bcrypt from 'bcrypt';

export default function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      },
      set(val) {
        this.setDataValue('email', val.toLowerCase());
      },
    },
    passwordDigest: {
      type: DataTypes.STRING,
      field: 'password_digest',
      validate: {
        notEmpty: true,
        len: [8, 128]
      }
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 128]
      }
    },
    passwordConfirmation: {
      type: DataTypes.VIRTUAL
    }
  },{
    underscored: true,
    tableName: 'users',
  });

  User.associate = function(models) {
    User.hasMany(models.Article, { foreignKey: 'user_id' });
  };

  User.prototype.authenticate = function(value) {
    if (bcrypt.compareSync(value, this.passwordDigest)){
      return this;
    } else{
      return false;
    }
  };

  function hasSecurePassword(user) {
    if (user.password != user.passwordConfirmation) {
      return sequelize.Promise.reject(
        new Error('Password confirmation doesn\'t match Password')
      );
    }
    return bcrypt.hash(user.password, 10).then(function(hash) {
      user.passwordDigest = hash;
    });
  }

  User.beforeCreate((user) => {
    if (user.password){
      return hasSecurePassword(user);
    }
  });

  User.beforeUpdate((user) => {
    if (user.password){
      return hasSecurePassword(user);
    }
  });
  return User;
}
