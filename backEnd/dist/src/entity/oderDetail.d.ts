import { Order } from "./order";
import { Product } from "./product";
export declare class OrderDetail {
    id: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    idOrder: Order;
    idProduct: Product;
}
