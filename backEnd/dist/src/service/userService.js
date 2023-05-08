"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../entity/user");
const data_source_1 = require("../data-source");
const order_1 = require("../entity/order");
const oderDetail_1 = require("../entity/oderDetail");
const productService_1 = __importDefault(require("./productService"));
class UserService {
    constructor() {
        this.createNewUser = async (user) => {
            let newUser = await this.userRepository.save(user);
            return newUser;
        };
        this.checkUser = async (user) => {
            console.log(user);
            let userFind = await this.userRepository.findOne({
                where: {
                    username: user.username,
                }
            });
            return userFind;
        };
        this.createNewOrder = async (userId) => {
            let order = {
                status: 'unpaid',
                date: new Date(),
                idUser: userId,
                orderDetail: []
            };
            let newOrder = await this.orderRepository.save(order);
            return newOrder;
        };
        this.findOrder = async (userId) => {
            let order = await this.orderRepository.find({
                relations: ['orderDetail', 'orderDetail.idOrder', 'orderDetail.idProduct'],
                where: {
                    status: 'unpaid',
                    idUser: userId
                }
            });
            return order[0];
        };
        this.findOrderDetails = async (orderId) => {
            let order = await this.orderDetailRepository.find({
                relations: ['idOrder', 'idProduct'],
                where: {
                    idOrder: orderId,
                }
            });
            return order;
        };
        this.addOrderDetail = async (idUser, idProduct) => {
            var _a, e_1, _b, _c;
            let order = await this.findOrder(idUser);
            let idOrder = order.id;
            let findProduct = await productService_1.default.findProductById(idProduct);
            let findPrice = findProduct[0].price;
            try {
                let orderDetails = await this.findOrderDetails(idOrder);
                let findOrderDetail;
                try {
                    for (var _d = true, orderDetails_1 = __asyncValues(orderDetails), orderDetails_1_1; orderDetails_1_1 = await orderDetails_1.next(), _a = orderDetails_1_1.done, !_a;) {
                        _c = orderDetails_1_1.value;
                        _d = false;
                        try {
                            const orderDetailPromise = _c;
                            let orderDetail = await orderDetailPromise;
                            if (orderDetail['idProduct'].id == idProduct) {
                                findOrderDetail = orderDetail;
                            }
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = orderDetails_1.return)) await _b.call(orderDetails_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (findOrderDetail) {
                    findOrderDetail.quantity = findOrderDetail.quantity + 1;
                }
                else {
                    findOrderDetail = {
                        quantity: 1,
                        unitPrice: findPrice,
                        idOrder: order.id,
                        idProduct: idProduct,
                        totalPrice: 0
                    };
                }
                findOrderDetail.totalPrice = findOrderDetail.quantity * findOrderDetail.unitPrice;
                orderDetails.push(findOrderDetail);
                await this.orderDetailRepository.update({ id: findOrderDetail.id }, findOrderDetail);
                let orderTotalPrice = 0;
                let newOrderDetails = await this.findOrderDetails(idOrder);
                for (const item of newOrderDetails) {
                    console.log(item.quantity);
                    console.log(item.unitPrice);
                    orderTotalPrice += item.quantity * item.unitPrice;
                }
                console.log(orderTotalPrice);
                order.orderTotalPrice = orderTotalPrice;
                await this.orderRepository.update({ id: order.id }, { orderTotalPrice }).then(() => {
                    console.log('add success');
                }).catch((err) => {
                    console.log(err);
                });
                return order;
            }
            catch (err) {
                console.log(err);
            }
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(oderDetail_1.OrderDetail);
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map