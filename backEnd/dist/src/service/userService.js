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
const product_1 = require("../entity/product");
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
                relations: ['orderDetail', 'orderDetail.idOrder', 'orderDetail.idProduct', 'idUser.orders'],
                where: {
                    status: 'unpaid',
                    idUser: {
                        id: userId
                    }
                }
            });
            return order[0];
        };
        this.findOrderDetails = async (orderId) => {
            let orderDetails = await this.orderDetailRepository.find({
                relations: ['idOrder', 'idProduct'],
                where: {
                    idOrder: { id: orderId }
                }
            });
            return orderDetails;
        };
        this.findOrderDetail = async (orderDetailId) => {
            let orderDetail = await this.orderDetailRepository.find({
                relations: ['idOrder', 'idProduct'],
                where: {
                    id: orderDetailId,
                }
            });
            return orderDetail;
        };
        this.addOrderDetail = async (idUser, idProduct) => {
            var _a, e_1, _b, _c;
            let order = await this.findOrder(idUser);
            let idOrder = order.id;
            let findProduct = await productService_1.default.findProductById(idProduct);
            let findQuantity = findProduct[0].quantity - 1;
            let findPrice = findProduct[0].price;
            if (findQuantity < 0) {
                console.log("het hang");
            }
            else {
                try {
                    await this.productRepository.update({ id: findProduct[0].id }, { quantity: findQuantity }).then(() => {
                        console.log('update quantity product success');
                    }).catch((err) => {
                        console.log(err);
                    });
                    let orderDetails = await this.findOrderDetails(idOrder);
                    console.log(111111, orderDetails, 11);
                    let updateOrderDetail;
                    try {
                        for (var _d = true, orderDetails_1 = __asyncValues(orderDetails), orderDetails_1_1; orderDetails_1_1 = await orderDetails_1.next(), _a = orderDetails_1_1.done, !_a;) {
                            _c = orderDetails_1_1.value;
                            _d = false;
                            try {
                                const orderDetailPromise = _c;
                                let orderDetail = await orderDetailPromise;
                                if (orderDetail['idProduct'].id == idProduct) {
                                    updateOrderDetail = orderDetail;
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
                    if (updateOrderDetail) {
                        updateOrderDetail.quantity = updateOrderDetail.quantity + 1;
                        updateOrderDetail.totalPrice = updateOrderDetail.quantity * updateOrderDetail.unitPrice;
                        await this.orderDetailRepository.update({ id: updateOrderDetail.id }, updateOrderDetail);
                    }
                    else {
                        updateOrderDetail = {
                            quantity: 1,
                            unitPrice: findPrice,
                            idOrder: order.id,
                            idProduct: idProduct,
                            totalPrice: 0
                        };
                        updateOrderDetail.totalPrice = updateOrderDetail.quantity * updateOrderDetail.unitPrice;
                        await this.orderDetailRepository.save(updateOrderDetail);
                    }
                    let orderTotalPrice = 0;
                    orderDetails = await this.findOrderDetails(idOrder);
                    for (const item of orderDetails) {
                        orderTotalPrice += item.quantity * item.unitPrice;
                    }
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
            }
        };
        this.deleteOrderDetailSevice = async (idUser, idOrderDetail) => {
            let orderDetail = await this.findOrderDetail(idOrderDetail);
            let totalOrderDetail = orderDetail[0].totalPrice;
            console.log(totalOrderDetail);
            let order = await this.findOrder(idUser);
            let totalOrder = order.orderTotalPrice;
            console.log(totalOrder);
            await this.orderDetailRepository.delete({ id: idOrderDetail });
            order.orderTotalPrice = totalOrder - totalOrderDetail;
            await this.orderRepository.update({ id: order.id }, { orderTotalPrice: order.orderTotalPrice });
        };
        this.updateOrderDetailService = async (idUser, idOrder, updateOrderDetail) => {
            let orderDetail = await this.findOrderDetail(updateOrderDetail.id);
            let totalOrderDetail = orderDetail[0].totalPrice;
            console.log(totalOrderDetail, "gia hang truoc update");
            let order = await this.findOrder(idUser);
            let totalOrder = order.orderTotalPrice - totalOrderDetail;
            console.log(totalOrder, "tong cua order truoc update");
            await this.orderDetailRepository.update({ id: updateOrderDetail.id }, { quantity: updateOrderDetail.quantity, totalPrice: updateOrderDetail.totalPrice });
            let orderDetailAfter = await this.findOrderDetail(updateOrderDetail.id);
            let totalOrderDetailAfter = orderDetailAfter[0].totalPrice;
            console.log(totalOrderDetailAfter);
            let totalOrderAfter = totalOrder + totalOrderDetailAfter;
            console.log(totalOrderAfter);
            await this.orderRepository.update({ id: idOrder }, { orderTotalPrice: totalOrderAfter });
            return totalOrderAfter;
        };
        this.checkOutService = async (idOrder, userId) => {
            await this.orderRepository.update({ id: idOrder }, { status: "paid" });
            let order = {
                status: 'unpaid',
                date: new Date(),
                idUser: userId,
                orderDetail: []
            };
            let newOrder = await this.orderRepository.save(order);
            return newOrder;
        };
        this.findOrderHistoryService = async (userId) => {
            let orders = await this.orderRepository.find({
                relations: ['orderDetail', 'orderDetail.idOrder', 'orderDetail.idProduct', 'idUser.orders'],
                where: {
                    status: 'paid',
                    idUser: {
                        id: userId
                    }
                }
            });
            return orders;
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(oderDetail_1.OrderDetail);
        this.productRepository = data_source_1.AppDataSource.getRepository(product_1.Product);
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map