const Sequelize = require("sequelize");

// Importar todos os models utilizados
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

// importar a config do banco de dados
const databaseConfig = require("../../config/database");

// inserir no array todos os models importados
const models = [Account, Transaction];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    if (this.connection) {
      console.log("conectado ao banco de dados!");
    }

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

module.exports = new Database();
