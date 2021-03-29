const { Router } = require("express");
const route = new Router();

// =>Controllers
const accountController = require("./app/controllers/accountController");
const transactionController = require("./app/controllers/transactionController");

// => middlewares
const verifyIfExistsAccountCPF = require("./app/middlewares/verifyIfExistsAccount");
const verifydata = require("./app/middlewares/verifydata");

route.post("/account", verifydata, accountController.store);
route.get("/statement", verifyIfExistsAccountCPF, accountController.show);
route.post(
  "/deposit",
  verifyIfExistsAccountCPF,
  transactionController.deposito
);
route.post("/saque", verifyIfExistsAccountCPF, transactionController.saque);

route.get(
  "/statement/date",
  verifyIfExistsAccountCPF,
  transactionController.TransactionDate
);

route.put(
  "/account/update",
  verifyIfExistsAccountCPF,
  accountController.update
);

route.delete("/account/delete", accountController.delete);
module.exports = route;
