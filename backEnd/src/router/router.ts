import {Router} from "express";
import productRouter from "./productRouter";
import userRouter from "./userRouter";
import loggedUserRouter from "./loggedUser";

const router = Router();
router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/',loggedUserRouter )

export default router;