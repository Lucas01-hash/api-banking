const Sequelize = require("sequelize");

class Account extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        password_acess: Sequelize.STRING,
        password_buy: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: "fintech",
      }
    );
    return this;
  }
  static associate(models) {
    this.hasMany(models.Transaction, {
      foreignKey: "user_id",
      as: "transactions",
    });
  }
}

module.exports = Account;
