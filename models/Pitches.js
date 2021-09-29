module.exports = (sequelize, DataTypes) => {
  const Pitches = sequelize.define('Pitches', {
    pitchTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry2: {
      type: DataTypes.STRING,
    },
    idealInvestmentRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capitalNeeded: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capitalRaised: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pitchInfo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image1: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Pitches.associate = (models) => {
    Pitches.belongsTo(models.Users, {
      foreignKey: {},
    });
    Pitches.hasMany(models.Favourites, {
      onDelete: 'cascade',
    });
  };

  return Pitches;
};
