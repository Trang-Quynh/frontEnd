import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product";
@Entity()
export class Color {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    color: string;
    @OneToMany(()=> Product, (product)=>product.color)
    products:Product[]
}