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
                console.log(token)
                res.status(200).json({
                    token: token,
                    role: userFind.role
                })
            }
        }
    }


    byProduct = async (req: Request, res: Response) => {
        let userId = req['decode'].userId;
        let productId = req.query.id
        let order = await this.userService.addToOrder(userId, productId);
        res.status(200).json(order)
    }








}









export default new UserController();

// Nếu có token thì sẽ vào luôn còn không có thì vào trang khách