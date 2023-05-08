import { Request, Response } from "express";
declare class UserController {
    private userService;
    constructor();
    signup: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    buyProduct: (req: Request, res: Response) => Promise<void>;
    showCart: (req: Request, res: Response) => Promise<void>;
    deleteOrderDetail: (req: Request, res: Response) => Promise<void>;
    updateOrderDetail: (req: Request, res: Response) => Promise<void>;
}
declare const _default: UserController;
export default _default;
