module.exports = (sequelize, datatypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: { type: datatypes.STRING, allowNull: false },
      password: { type: datatypes.STRING, allowNull: false },
      email: { type: datatypes.STRING, allowNull: false },
    },
  );
  return User;
};
