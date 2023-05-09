import {Product} from "../entity/product";
import {AppDataSource} from "../data-source";
import {Like} from "typeorm";

class ProductService {
    private productRepository;
    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
    }

    getAll = async () => {
        let products = await this.productRepository.find({
            //relations phai co s
            relations: {
                // Tên trường của Product mà mình muốn join
                category:true,
            },
            // where: {
            //     category: {
            //         name: Like ('%K%')
            //     }
            // }
        });
        return products;
    }

    getByCategory = async (id) => {
        let products = await this.productRepository.find({
            relations: {
                category:true,
            },
            where: {
                category: {
                    id: id
                }
            }
        });
        return products;
    }

    getByBrand = async (id) => {
        let products = await this.productRepository.find({
            relations: {
                brand:true,
            },
            where: {
                brand: {
                    id: id
                }
            }
        });
        return products;
    }

    getByColor = async (id) => {
        let products = await this.productRepository.find({
            relations: {
                color:true,
            },
            where: {
                color: {
                    id: id
                }
            }
        });
        return products;
    }





    // test = async () =>{
        // let product = await this.productRepository.findOneBy({
        //     id: 1
        // })
        // return product
        // let product = await this.productRepository.find({where: {name: Like ('%doi%')}})
        // return product
        // let product = await this.productRepository.findBy({name: Like ('%doi%')})
        // return product
    // }

    add = async (product) => {
     let productNew = await this.productRepository.save(product);
     return productNew
    }
    deleteProduct = async (id) => {
        console.log(id,'Service')
        await this.productRepository.delete({id:id});
    }


    // findProductById = async(id) =>{
    //    let product = await this.productRepository.findOneBy({
    //         id:id
    //     },
    //        {relations: {category:true}
    //        })
    //     return product;
    // }

    findProductById = async(id) =>{
        let product = await this.productRepository.find({
            relations: {
                category:true,
            },
            where: {
               id:id
            }
        });
       return product;
    }
    // find({
    //          //relations phai co s
    //          relations: {
    //              // Tên trường của Product mà mình muốn join
    //              category:true,
    //          },
    //          // where: {
    //          //     category: {
    //          //         name: Like ('%K%')
    //          //     }
    //          // }
    //      });


    updateProductById = async(id, updateProduct ) => {
        await this.productRepository.update({id: id}, updateProduct)
    }

    findProductByKeyword = async(keyword) => {
      let products = await this.productRepository.find({
          relations: {
              category:true,
          },
          where:
              { name: Like(`%${keyword}%`) }
        });
        return products
    }




    // updateProductById = async(productToUpdate, updateProduct ) => {
    //     productToUpdate.id = updateProduct.id
    //     productToUpdate.name = updateProduct.name;
    //     productToUpdate.price = updateProduct.price;
    //     productToUpdate.image = updateProduct.image;
    //     productToUpdate.category = updateProduct.category;
    //     await this.productRepository.save(productToUpdate)
    // }




}

export default new ProductService();