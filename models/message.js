module.exports = (sequelize, Sequelize) => {
  var Message = sequelize.define("message", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false
    },
    sender: { type: Sequelize.STRING, allowNull: false },
    receiver: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.TEXT, allowNull: false }
  });

  return Message;
};
