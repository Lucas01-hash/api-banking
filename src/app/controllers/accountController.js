const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

class AccountController {
  async store(req, res) {
    const { name, cpf, email, phone, password_acess, password_buy } = req.body;

    const accountUser = await Account.create({
      name,
      cpf,
      email,
      phone,
      password_acess,
      password_buy,
    });

    return res.status(201).json(accountUser);
  }

  async show(req, res) {
    const { accountUser } = req;
    const user_id = accountUser.id;

    const user = await Account.findByPk(user_id, {
      include: { association: "transactions" },
    });

    return res.json(user);
  }

  async index(req, res) {
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

module.exports = new AccountController();
