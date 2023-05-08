import {Router} from "express";
import productController from "../controller/productController";
import {auth} from "../middleware/auth";
import {decentralization} from "../middleware/decentralization";

const productRouter = Router();
productRouter.get('/', productController.findAll);
productRouter.get('/category/:id', productController.findProductByCategory);
productRouter.get('/color/:id', productController.findProductByColor);
productRouter.get('/brand/:id', productController.findProductByBrand);
productRouter.get('/search', productController.find);


productRouter.use(auth)
productRouter.use(decentralization)


productRouter.delete('/delete/:id', productController.deleteProductPost);
productRouter.get('/update/:id', productController.showFormUpdate);
productRouter.put('/update/:id', productController.updateProduct);
productRouter.get('/add',  productController.showFormAdd);
productRouter.post('/add', productController.addProduct);

export default productRouter;