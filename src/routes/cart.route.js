import express from 'express'
import { 
    getAllProducts, 
    addNewCartProduct 
} from '../controllers/cart.controller.js'

const router  = express.Router();

router.get("/products", getAllProducts);
// router.put("/update/:id", updateProductCount);
router.post("/add", addNewCartProduct);
// router.delete("/delete/:id", removeCartProduct);

export default router;