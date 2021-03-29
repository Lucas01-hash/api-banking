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

  async update(req, res) {
    const { user_id } = req.headers;
    const conta = await Account.findOne({
      attributes: ["id"],
      where: { cpf: user_id },
    });

    const { name } = req.body;

    if (conta) {
      await conta.update({ name });

      return res.json({ message: "atualizado com sucesso", conta });
    }

    return res.json({ error: "error ao atualizar" });
  }

  async delete(req, res) {
    const { user_id } = req.headers;
    const conta = await Account.findOne({
      attributes: ["id"],
      where: { cpf: user_id },
    });
    if (conta) {
      await conta.destroy(user_id);

      return res.json({ message: "success delete account" });
    }

    return res.status(400).json({ error: "Delete account failed" });
  }
}

module.exports = new AccountController();
