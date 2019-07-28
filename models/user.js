module.exports = (sequelize, Sequelize) => {
  var User = sequelize.define("user", {
    username: { primaryKey: true, type: Sequelize.STRING, allowNull: false },
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    about: { type: Sequelize.TEXT },
    //friendList: { type: Sequelize.JSON },
    email: { type: Sequelize.STRING, validate: { isEmail: true } },
    password: { type: Sequelize.STRING, allowNull: false },
    last_login: { type: Sequelize.DATE },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  });

  return User;
};