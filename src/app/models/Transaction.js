const Sequelize = require("sequelize");

class Transaction extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        amount: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: "transactions",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Account, { foreignKey: "user_id", as: "account" });
  }
}

module.exports = Transaction;
