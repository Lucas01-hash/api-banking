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

  async TransactionDate(req, res) {
    const { accountUser } = req;

    const { date } = req.query;

    const dateFormat = new Date(date + " 00:00");
    console.log(date + ":00");

    const statement = await Transaction.findAll({
      where: { user_id: 1 },
    });

    const transactionDate = statement.filter(
      (transData) =>
        transData.createdAt.toDateString() === dateFormat.toDateString()
    );

    console.log(dateFormat);

    return res.json(transactionDate);
  }
}
module.exports = new transactionController();
