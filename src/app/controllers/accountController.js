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

  async index(req, res) {
    const { accountUser } = req;
    const user_id = accountUser.id;

    const user = await Account.findByPk(user_id, {
      include: { association: "transactions" },
    });

    return res.json(user);
  }

  async deposit(req, res) {
    const { description, amount } = req.body;
    const { accountUser } = req;

    if (accountUser) {
      const deposito = await Transaction.create({
        description,
        amount,
        user_id: accountUser.id,
      });
      return res.status(201).json(deposito);
    }

    return res
      .status(400)
      .json({ error: "it was not possible to make the deposit" });
  }
}

module.exports = new AccountController();
