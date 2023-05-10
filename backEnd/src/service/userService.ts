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
            relations: ['orderDetail', 'orderDetail.idOrder', 'orderDetail.idProduct', 'idUser.orders'],
            where: {
                status: 'unpaid',
                idUser: {
                    id: userId
                }
            }
        });
        return order[0];
    }

    findOrderDetails = async(orderId) =>{
        let orderDetails = await this.orderDetailRepository.find({
            relations: [ 'idOrder', 'idProduct'],
            where: {
                idOrder:{id:orderId}
            }
        });
        return orderDetails;
    }

    findOrderDetail = async(orderDetailId) =>{
        let orderDetail = await this.orderDetailRepository.find({
            relations: [ 'idOrder', 'idProduct'],
            where: {
                id: orderDetailId,
            }
        });
        return orderDetail;
    }



    addOrderDetail = async(idUser, idProduct) => {
        let order = await this.findOrder(idUser);
        let idOrder = order.id
        let findProduct = await productService.findProductById(idProduct);
        let findQuantity = findProduct[0].quantity - 1;
        let findPrice = findProduct[0].price
        if(findQuantity < 0) {
            console.log("het hang")
        } else {

        try {
            await this.productRepository.update({id: findProduct[0].id}, {quantity: findQuantity}).then(()=>{
                console.log('update quantity product success')
            }).catch((err)=>{
                console.log(err)
            });
            let orderDetails = await this.findOrderDetails(idOrder);
            console.log(111111,orderDetails,11)
            let updateOrderDetail;
            for await (const orderDetailPromise of orderDetails) {
               let orderDetail = await orderDetailPromise;
                if (orderDetail['idProduct'].id == idProduct) {
                    updateOrderDetail = orderDetail;
                }
            }
            if (updateOrderDetail) {
                updateOrderDetail.quantity = updateOrderDetail.quantity + 1 //dung
                // Cập nhật order detail
                updateOrderDetail.totalPrice = updateOrderDetail.quantity * updateOrderDetail.unitPrice;
                await this.orderDetailRepository.update({id: updateOrderDetail.id}, updateOrderDetail);
            } else {
                updateOrderDetail = {
                    quantity: 1,
                    unitPrice: findPrice,
                    idOrder: order.id,
                    idProduct: idProduct,
                    totalPrice: 0
                }
                updateOrderDetail.totalPrice = updateOrderDetail.quantity * updateOrderDetail.unitPrice
                // console.log(orderDetails)
                await this.orderDetailRepository.save(updateOrderDetail)
            }
            // Cập nhật tổng giá trị đơn hàng
            let orderTotalPrice = 0;
            orderDetails = await this.findOrderDetails(idOrder);
            for (const item of orderDetails) {
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
    }}

    deleteOrderDetailSevice = async (idUser,idOrderDetail) => {
        let orderDetail = await this.findOrderDetail(idOrderDetail)
        let totalOrderDetail = orderDetail[0].totalPrice;
        console.log(totalOrderDetail)
        let order = await this.findOrder(idUser);
        let totalOrder = order.orderTotalPrice;
        console.log(totalOrder)
       await this.orderDetailRepository.delete({id:idOrderDetail});
       order.orderTotalPrice = totalOrder - totalOrderDetail
       await this.orderRepository.update({id: order.id}, {orderTotalPrice: order.orderTotalPrice})
    }
    updateOrderDetailService = async (idUser, idOrder, updateOrderDetail) => {
        let orderDetail = await this.findOrderDetail(updateOrderDetail.id)
        let totalOrderDetail = orderDetail[0].totalPrice;
        console.log(totalOrderDetail,"gia hang truoc update")

        let order = await this.findOrder(idUser);
        let totalOrder = order.orderTotalPrice - totalOrderDetail;
        console.log(totalOrder,"tong cua order truoc update")
        await this.orderDetailRepository.update({id:updateOrderDetail.id},{quantity: updateOrderDetail.quantity, totalPrice:updateOrderDetail.totalPrice})
        let orderDetailAfter = await this.findOrderDetail(updateOrderDetail.id)
        let totalOrderDetailAfter = orderDetailAfter[0].totalPrice;
        console.log(totalOrderDetailAfter)
        let totalOrderAfter = totalOrder + totalOrderDetailAfter;
        console.log(totalOrderAfter)
        await this.orderRepository.update({id:idOrder},{orderTotalPrice:totalOrderAfter})

       return totalOrderAfter
    }

    checkOutService= async ( idOrder,userId) => {
        await this.orderRepository.update({id:idOrder},{status:"paid"})
        let order = {
            status: 'unpaid',
            date: new Date(),
            idUser: userId,
            orderDetail:[]
        }
        let newOrder = await this.orderRepository.save(order)
        return newOrder
    }


    findOrderHistoryService = async(userId) =>{
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
    }













}

export default new UserService();