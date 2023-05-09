import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {OrderDetail} from "./oderDetail";
import {Order} from "./order";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    role: string;

    @OneToMany(()=> Order, (order)=>order.idUser)
    orders: Order[]


}
