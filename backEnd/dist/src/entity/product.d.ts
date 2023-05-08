import { Category } from "./category";
import { Color } from "./color";
import { Brand } from "./brand";
import { OrderDetail } from "./oderDetail";
export declare class Product {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category: Category;
    color: Color;
    brand: Brand;
    orderDetail: OrderDetail[];
}
