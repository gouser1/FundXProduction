module.exports = (sequelize, DataTypes) => {
  const Favourites = sequelize.define('Favourites');

  Favourites.associate = (models) => {
    Favourites.belongsTo(models.Users, {
      foreignKey: {},
    });
    Favourites.belongsTo(models.Pitches, {
      foreignKey: {},
    });
  };

  return Favourites;
};
