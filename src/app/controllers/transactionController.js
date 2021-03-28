const Transaction = require("../models/Transaction");

class transactionController {
  async deposito(req, res) {
    const { description, amount } = req.body;
    const { accountUser } = req;

    if (accountUser) {
      const deposito = await Transaction.create({
        description,
        amount,
        type: "deposit",
        user_id: accountUser.id,
      });
      return res.status(201).json(deposito);
    }

    return res
      .status(400)
      .json({ error: "it was not possible to make the deposit" });
  }

  async saque(req, res) {
    const { amount } = req.body;
    const { accountUser } = req;

    if (accountUser) {
      const saque = await Transaction.create({
        amount,
        type: "saque",
        user_id: accountUser.id,
      });
      return res.json(saque);
    }

    return res.status(400).json({ error: "Error ao concluir o saque" });
  }
}
module.exports = new transactionController();
