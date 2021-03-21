const Account = require("../models/Account");

module.exports = async (req, res, next) => {
  const { user_id } = req.headers;
  const accountUser = await Account.findOne({ where: { cpf: user_id } });

  if (!accountUser) {
    return res.status(400).json({ error: "Account not found" });
  }

  req.accountUser = accountUser;

  return next();
};
