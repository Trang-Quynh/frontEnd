"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const authorUser_1 = require("../middleware/authorUser");
const auth_1 = require("../middleware/auth");
const loggedUserRouter = (0, express_1.Router)();
loggedUserRouter.use(auth_1.auth);
loggedUserRouter.use(authorUser_1.authorUser);
loggedUserRouter.post('/product', userController_1.default.buyProduct);
loggedUserRouter.delete('/cart/:id', userController_1.default.deleteOrderDetail);
exports.default = loggedUserRouter;
//# sourceMappingURL=loggedUser.js.map