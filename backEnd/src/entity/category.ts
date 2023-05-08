import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
//decorator @OneToMany được sử dụng để trình bày quan hệ giữa hai lớp đối tượng: Category và Product.
    // ()=> Product là tham số đầu tiên của decorator, nó xác định kiểu đối tượng sản phẩm liên kết với đối tượng danh mục.
    // (product)=>product.category là tham số thứ hai trong decorator, nó chỉ định cách liên kết các đối tượng sản phẩm với đối tượng danh mục. Trong trường hợp này, mỗi đối tượng sản phẩm có một thuộc tính category, và product.category chỉ đến thuộc tính này.
    // products: Product[] là một thuộc tính trong lớp Category, nó là mảng các đối tượng sản phẩm liên kết với đối tượng danh mục thông qua quan hệ "một-nhiều".
    @OneToMany(()=> Product, (product)=>product.category)
    products:Product[]
}

