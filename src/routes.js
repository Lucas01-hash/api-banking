const { Router } = require("express");
const route = new Router();

// =>Controllers
const accountController = require("./app/controllers/accountController");

// => middlewares
const verifyIfExistsAccountCPF = require("./app/middlewares/verifyIfExistsAccount");
const verifydata = require("./app/middlewares/verifydata");

route.post("/account", verifydata, accountController.store);
route.get("/statement", verifyIfExistsAccountCPF, accountController.index);
route.post("/deposit", verifyIfExistsAccountCPF, accountController.deposit);

module.exports = route;
