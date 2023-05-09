import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user";
import {Product} from "./product";
import {OrderDetail} from "./oderDetail";


@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ default: 0 })
    orderTotalPrice: number;
    @Column()
    status: string;
    @Column()
    date: string;
    @ManyToOne(()=>User, (user) =>user.orders)
    idUser: User

    @OneToMany(()=> OrderDetail, (orderDetail)=>orderDetail.idOrder)
    orderDetail:OrderDetail[]






}