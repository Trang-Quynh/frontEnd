import { Order } from "./order";
export declare class User {
    id: number;
    username: string;
    password: string;
    role: string;
    orders: Order[];
}
