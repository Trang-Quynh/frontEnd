import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product";
@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    brand: string;
    @OneToMany(()=> Product, (product)=>product.brand)
    products:Product[]
}