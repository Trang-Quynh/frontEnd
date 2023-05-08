import {User} from "../entity/user";
import {AppDataSource} from "../data-source";
import bcrypt from "bcrypt";
import {Order} from "../entity/order";
import {Column, ManyToOne, OneToMany} from "typeorm";
import {OrderDetail} from "../entity/oderDetail";
import {application} from "express";
import productService from "./productService";
import {Product} from "../entity/product";

class UserService {
    private userRepository;
    private orderRepository;
    private orderDetailRepository;
    private productRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
        this.orderRepository = AppDataSource.getRepository(Order)
        this.orderDetailRepository = AppDataSource.getRepository(OrderDetail)
        this.productRepository = AppDataSource.getRepository(Product)
    }


    createNewUser = async (user) => {
        let newUser = await this.userRepository.save(user)
        return newUser
    }
    checkUser = async (user) => {
        console.log(user)
        let userFind = await this.userRepository.findOne({
            where: {
                username: user.username,
            }
        });
        return userFind;
    }


    createNewOrder = async(userId) =>{
        let order = {
            status: 'unpaid',
            date: new Date(),
            idUser: userId,
            orderDetail:[]
        }
        let newOrder = await this.orderRepository.save(order)
        return newOrder
    }


    findOrder = async(userId) =>{
        let order = await this.orderRepository.find({
            relations: ['orderDetail', 'orderDetail.idOrder', 'orderDetail.idProduct'],
            where: {
                status: 'unpaid',
                idUser: userId
            }
        });
        return order[0];
    }

    findOrderDetails = async(orderId) =>{
        let order = await this.orderDetailRepository.find({
            relations: [ 'idOrder', 'idProduct'],
            where: {
                idOrder: orderId,
            }
        });
        return order;
    }





    // addToOrder = async(idUser, idProduct) => {
    //     let order = await this.findOrder(idUser);
    //     let orderDetails = order.orderDetail;
    //     let orderDetail;
    //     try {
    //             for await (const orderDetailPromise of orderDetails) {
    //                 orderDetail = await orderDetailPromise;
    //                 if (orderDetail.idProduct.id === idProduct) {
    //                     return orderDetail;
    //                 }
    //             }
    //
    //             if (orderDetail) {
    //                 orderDetail.quantity += 1
    //             } else {
    //                 orderDetail = {
    //                     quantity: 1,
    //                     unitPrice: idProduct.price,
    //                     idOrder: order.id,
    //                     idProduct: idProduct,
    //                     totalPrice: 0
    //                 }
    //                 orderDetail.totalPrice = orderDetail.quantity * orderDetail.unitPrice
    //                 orderDetails.push(orderDetail);
    //             }
    //
    //             let orderTotalPrice = 0;
    //             for (const item of orderDetails) {
    //                 orderTotalPrice += item.quantity * item.unitPrice
    //             }
    //             order.orderTotalPrice = orderTotalPrice;
    //
    //             // Cập nhật order detail
    //             await this.orderDetailRepository.update({id: orderDetail.id}, orderDetail);
    //
    //             // Cập nhật tổng giá trị đơn hàng
    //
    //
    //             order.orderTotalPrice = orderTotalPrice;
    //             await this.orderRepository.update({id: order.id}, {orderTotalPrice});
    //             return order
    //
    //     } catch (err) {
    //         console.log(err)
    //     }
    //
    // }



    addOrderDetail = async(idUser, idProduct) => {
        let order = await this.findOrder(idUser);
        console.log(order)
        let idOrder = order.id
        let findProduct = await productService.findProductById(idProduct);
        let findQuantity = findProduct[0].quantity -= 1;
        let findPrice = findProduct[0].price
        try {
            let orderDetails = await this.findOrderDetails(idOrder);
            await this.productRepository.update({id: findProduct[0].id}, {quantity: findQuantity}).then(()=>{
                console.log('add success')
            }).catch((err)=>{
                console.log(err)
            });

            let findOrderDetail;
            for await (const orderDetailPromise of orderDetails) {
               let orderDetail = await orderDetailPromise;
                if (orderDetail['idProduct'].id == idProduct) {
                    findOrderDetail = orderDetail
                }
            }
            if (findOrderDetail) {
                findOrderDetail.quantity = findOrderDetail.quantity + 1
            } else {
                findOrderDetail = {
                    quantity: 1,
                    unitPrice: findPrice,
                    idOrder: order.id,
                    idProduct: idProduct,
                    totalPrice: 0
                }
            }
            findOrderDetail.totalPrice = findOrderDetail.quantity * findOrderDetail.unitPrice
            orderDetails.push(findOrderDetail);
            // Cập nhật order detail
            await this.orderDetailRepository.update({id: findOrderDetail.id}, findOrderDetail);
            // Cập nhật tổng giá trị đơn hàng
            let orderTotalPrice = 0;
            let newOrderDetails = await this.findOrderDetails(idOrder);
            for (const item of newOrderDetails) {
                orderTotalPrice += item.quantity * item.unitPrice
            }
            order.orderTotalPrice = orderTotalPrice;
            await this.orderRepository.update({id: order.id}, {orderTotalPrice}).then(()=>{
                console.log('add success')
            }).catch((err)=>{
                console.log(err)
            });

            return order

        } catch (err) {
            console.log(err)
        }
    }

    deleteOrderDetail = async (id) => {
       await this.orderDetailRepository.delete({id:id})
    }













}

export default new UserService();