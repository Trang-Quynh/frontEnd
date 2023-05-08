import {Router} from "express";
import userController from "../controller/userController";
import {authorUser} from "../middleware/authorUser";
import {auth} from "../middleware/auth";

const loggedUserRouter = Router();

// truy cap duong dan localhost:3000
// khi mua hang se xu ly name san pham len sau duong dan


loggedUserRouter.use(auth)
loggedUserRouter.use(authorUser)
loggedUserRouter.post('/product', userController.byProduct)


export default loggedUserRouter;
