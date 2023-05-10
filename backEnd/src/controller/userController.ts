import {Request, Response} from "express";
import userService from "../service/userService";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {SECRET} from '../middleware/auth'

class UserController {

    private userService;

    constructor() {
        this.userService = userService;
    }


    signup = async (req: Request, res: Response) => {
        let user = req.body
        let userCheck = await this.userService.checkUser(req.body)
        if (userCheck) {
            res.status(200).json('Đã có tài khoản')
        } else if(!user.username || !user.password){
            res.status(200).json('Dien thieu')
        } else {
            user.password = await bcrypt.hash(user.password, 10)
            let newUser = await this.userService.createNewUser(user)
            await this.userService.createNewOrder(user.id);
            res.status(201).json(newUser)
        }
    }

    login = async (req: Request, res: Response) => {
        let user = req.body
        let userFind = await this.userService.checkUser(user);
        if (!userFind) {
            res.status(201).json('Username is not exits')
        }else{
            let comparePassword = await bcrypt.compare(req.body.password, userFind.password);
            if(!comparePassword){
                res.status(201).json('Password is wrong')
            }else{
                let payload = {
                    username: userFind.username,
                    role: userFind.role,
                    userId: userFind.id
                }
                let token = jwt.sign(payload, SECRET, {
                    expiresIn: 36000
                });

                res.status(200).json({
                    token: token,
                    role: userFind.role
                })
            }
        }
    }


    buyProduct = async (req: Request, res: Response) => {
        let userId = req['decode'].userId;
        let productId = req.params.id
        let order = await this.userService.addOrderDetail(userId, productId);
        res.status(200).json(order)
    }

    showCart = async (req: Request, res: Response) => {
        let userId = req['decode'].userId;
        let order = await this.userService.findOrder(userId)
        res.status(200).json(order)
    }



    deleteOrderDetail = async (req:Request,res:Response) => {
        let idUser = req['decode'].userId
        console.log(idUser)
        let idOrderDetail = req.params.id
        console.log(idOrderDetail)
        await this.userService.deleteOrderDetailSevice(idUser,idOrderDetail);


        res.status(200).json('Delete Success!')
    }

    updateOrderDetail = async (req:Request,res:Response) => {
        let idUser = req['decode'].userId
        let idOrder = req.params.id
        let updateOrderDetail = req.body
        let total = await this.userService.updateOrderDetailService(idUser, idOrder, updateOrderDetail);
        console.log(total)
        res.status(200).json(total)
    }

    checkOut = async (req:Request,res:Response) => {
        let idUser = req['decode'].userId;
        let idOrder = req.params.id
        await this.userService.checkOutService( idOrder,idUser);
        res.status(200).json('checkout thanh cong')
    }

    findOrderHistory = async (req:Request,res:Response) => {
        let idUser = req['decode'].userId;
        let orders = await this.userService.findOrderHistoryService(idUser)
        res.status(200).json(orders)
    }
















}









export default new UserController();
