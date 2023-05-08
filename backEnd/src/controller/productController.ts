import {Request, Response} from "express";
import productService from "../service/productService";
import categoryService from "../service/CategoryService";
import colorService from "../service/ColorService";
import brandService from "../service/BrandService";

class ProductController {
    private productService;
    private categoryService;
    private colorService;
    private brandService;

    constructor() {
        this.productService = productService;
        this.categoryService = categoryService;
        this.colorService = colorService;
        this.brandService = brandService;
    }

    findAll = async (req: Request, res: Response) => {
            let listProduct = await this.productService.getAll();
            let listCategory = await this.categoryService.getAll();
            let listColor = await this.colorService.getAll();
            let listBrand = await this.brandService.getAll();
            res.status(200).json({listProduct, listCategory, listColor, listBrand})
    }

    findProductByCategory = async (req: Request, res: Response) => {
        let id = req.params.id
        let products = await this.productService.getByCategory(id);
        res.status(200).json(products)
    }

    findProductByColor = async (req: Request, res: Response) => {
        let id = req.params.id
        let products = await this.productService.getByColor(id);
        res.status(200).json(products)
    }

    findProductByBrand = async (req: Request, res: Response) => {
        let id = req.params.id
        let products = await this.productService.getByBrand(id);
        console.log(products)
        res.status(200).json(products)
    }




    addProduct  = async (req: Request, res: Response) => {
      let productData = req.body;
      const productNew = await this.productService.add(productData);
      res.status(200).json(productNew)
    }

    deleteProductPost  = async (req: Request, res: Response) => {
        console.log(req)
        let id = req.params.id
        await this.productService.deleteProduct(id);
        res.status(200).json({message: 'delete success'})
    }

    showFormAdd = async (req: Request, res: Response) => {
        let listCategory = await this.categoryService.getAll();
        let listColor = await this.colorService.getAll();
        let listBrand = await this.brandService.getAll();
        res.status(200).json({listCategory, listColor, listBrand})
    }
    showFormUpdate = async (req: Request, res: Response) => {
        let id = req.params.id
        let product = await this.productService.findProductById(id);
        let listCategory = await this.categoryService.getAll();
        let listColor = await this.colorService.getAll();
        let listBrand = await this.brandService.getAll();
        res.status(200).json({product, listCategory, listColor, listBrand})
    }


    updateProduct = async (req: Request, res: Response) => {
        let id = req.params.id
        let updateProduct = req.body
        await this.productService.updateProductById(id, updateProduct)
        res.status(200).json({message: 'update success'})
    }
    find = async (req: Request, res: Response) => {
        let keyword = req.query.search
        console.log(keyword)
        let products = await this.productService.findProductByKeyword(keyword)
        res.status(200).json(products)
    }

}

export default new ProductController();