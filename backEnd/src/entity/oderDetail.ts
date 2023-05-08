import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user";
import {Order} from "./order";
import {Product} from "./product";


@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    quantity: number;

    @Column()
    unitPrice: number;
    @Column()
    totalPrice: number;

    @ManyToOne(()=>Order, (order) =>{order.orderDetail})
    idOrder: Order

    @ManyToOne(()=>Product, (product) =>{product.orderDetail})
    idProduct: Product
}