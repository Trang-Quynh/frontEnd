"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRouter_1 = __importDefault(require("./productRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const loggedUser_1 = __importDefault(require("./loggedUser"));
const router = (0, express_1.Router)();
router.use('/products', productRouter_1.default);
router.use('/users', userRouter_1.default);
router.use('/', loggedUser_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map