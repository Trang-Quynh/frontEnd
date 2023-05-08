import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./category";
import {Color} from "./color";
import {Brand} from "./brand";
import {OrderDetail} from "./oderDetail";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', length: 255})
    name: string;
    @Column()
    price: number;
    @Column({type: 'text'})
    image: string;
    @Column()
    quantity: number;
    @ManyToOne(()=>Category, (category) =>{category.products})
    category: Category

    @ManyToOne(()=>Color, (color) =>{color.products})
    color: Color

    @ManyToOne(()=>Brand, (brand) =>{brand.products})
    brand: Brand

    @OneToMany(()=> OrderDetail, (orderDetail)=>orderDetail.idProduct)
    orderDetail:OrderDetail[]




}

