const Account = require("../models/Account");

module.exports = async (req, res, next) => {
  const { cpf, email, phone } = req.body;

  const cpf_data = await Account.findOne({ where: { cpf } });
  const email_data = await Account.findOne({ where: { email } });
  const phone_data = await Account.findOne({ where: { phone } });

  if (cpf_data) {
    return res.status(400).json({
      error: "there is already an account registered with this cpf",
    });
  }

  if (email_data) {
    return res.status(400).json({
      error: "there is already an account registered with this email",
    });
  }

  if (phone_data) {
    return res.status(400).json({
      error: "there is already an account registered with this phone",
    });
  }

  return next();
};
