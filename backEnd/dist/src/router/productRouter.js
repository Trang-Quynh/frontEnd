"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controller/productController"));
const auth_1 = require("../middleware/auth");
const decentralization_1 = require("../middleware/decentralization");
const productRouter = (0, express_1.Router)();
productRouter.get('/', productController_1.default.findAll);
productRouter.get('/category/:id', productController_1.default.findProductByCategory);
productRouter.get('/color/:id', productController_1.default.findProductByColor);
productRouter.get('/brand/:id', productController_1.default.findProductByBrand);
productRouter.get('/search', productController_1.default.find);
productRouter.use(auth_1.auth);
productRouter.use(decentralization_1.decentralization);
productRouter.delete('/delete/:id', productController_1.default.deleteProductPost);
productRouter.get('/update/:id', productController_1.default.showFormUpdate);
productRouter.put('/update/:id', productController_1.default.updateProduct);
productRouter.get('/add', productController_1.default.showFormAdd);
productRouter.post('/add', productController_1.default.addProduct);
exports.default = productRouter;
//# sourceMappingURL=productRouter.js.map