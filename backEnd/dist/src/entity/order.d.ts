import { User } from "./user";
import { OrderDetail } from "./oderDetail";
export declare class Order {
    id: number;
    orderTotalPrice: number;
    status: string;
    date: string;
    idUser: User;
    orderDetail: OrderDetail[];
}
