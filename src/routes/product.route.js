import express from 'express'
import { getAllProducts, addNewProduct, getProductByStore, getProductDetails, editProduct, deleteProduct} from '../controllers/product.controller.js'
import { protect } from '../middlewares/auth.middleware.js';

const router  = express.Router();

router.get('/', getAllProducts);
router.post('/create', protect, addNewProduct);
router.get('/store/:storeId', getProductByStore);
router.get('/:id/details', getProductDetails);
router.put("/:id/edit", editProduct);
router.delete("/:id/delete", deleteProduct);

export default router;