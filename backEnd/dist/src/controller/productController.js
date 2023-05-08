"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = __importDefault(require("../service/productService"));
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
const ColorService_1 = __importDefault(require("../service/ColorService"));
const BrandService_1 = __importDefault(require("../service/BrandService"));
class ProductController {
    constructor() {
        this.findAll = async (req, res) => {
            let listProduct = await this.productService.getAll();
            let listCategory = await this.categoryService.getAll();
            let listColor = await this.colorService.getAll();
            let listBrand = await this.brandService.getAll();
            res.status(200).json({ listProduct, listCategory, listColor, listBrand });
        };
        this.findProductByCategory = async (req, res) => {
            let id = req.params.id;
            let products = await this.productService.getByCategory(id);
            res.status(200).json(products);
        };
        this.findProductByColor = async (req, res) => {
            let id = req.params.id;
            let products = await this.productService.getByColor(id);
            res.status(200).json(products);
        };
        this.findProductByBrand = async (req, res) => {
            let id = req.params.id;
            let products = await this.productService.getByBrand(id);
            console.log(products);
            res.status(200).json(products);
        };
        this.addProduct = async (req, res) => {
            let productData = req.body;
            const productNew = await this.productService.add(productData);
            res.status(200).json(productNew);
        };
        this.deleteProductPost = async (req, res) => {
            console.log(req);
            let id = req.params.id;
            await this.productService.deleteProduct(id);
            res.status(200).json({ message: 'delete success' });
        };
        this.showFormAdd = async (req, res) => {
            let listCategory = await this.categoryService.getAll();
            let listColor = await this.colorService.getAll();
            let listBrand = await this.brandService.getAll();
            res.status(200).json({ listCategory, listColor, listBrand });
        };
        this.showFormUpdate = async (req, res) => {
            let id = req.params.id;
            let product = await this.productService.findProductById(id);
            let listCategory = await this.categoryService.getAll();
            let listColor = await this.colorService.getAll();
            let listBrand = await this.brandService.getAll();
            res.status(200).json({ product, listCategory, listColor, listBrand });
        };
        this.updateProduct = async (req, res) => {
            let id = req.params.id;
            let updateProduct = req.body;
            await this.productService.updateProductById(id, updateProduct);
            res.status(200).json({ message: 'update success' });
        };
        this.find = async (req, res) => {
            let keyword = req.query.search;
            console.log(keyword);
            let products = await this.productService.findProductByKeyword(keyword);
            res.status(200).json(products);
        };
        this.productService = productService_1.default;
        this.categoryService = CategoryService_1.default;
        this.colorService = ColorService_1.default;
        this.brandService = BrandService_1.default;
    }
}
exports.default = new ProductController();
//# sourceMappingURL=productController.js.map