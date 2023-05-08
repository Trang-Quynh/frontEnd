declare class ProductService {
    private productRepository;
    constructor();
    getAll: () => Promise<any>;
    getByCategory: (id: any) => Promise<any>;
    getByBrand: (id: any) => Promise<any>;
    getByColor: (id: any) => Promise<any>;
    add: (product: any) => Promise<any>;
    deleteProduct: (id: any) => Promise<void>;
    findProductById: (id: any) => Promise<any>;
    updateProductById: (id: any, updateProduct: any) => Promise<void>;
    findProductByKeyword: (keyword: any) => Promise<any>;
}
declare const _default: ProductService;
export default _default;
