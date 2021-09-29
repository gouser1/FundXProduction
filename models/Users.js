module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    profession: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    profilePicture: {
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'User',
    },
  });

  Users.assoicate = (models) => {
    Users.hasMany(models.Pitches, {
      onDelete: 'cascade',
    });
  };

  Users.associate = (models) => {
    Users.hasMany(models.Favourites, {
      onDelete: 'cascade',
    });
  };

  return Users;
};
