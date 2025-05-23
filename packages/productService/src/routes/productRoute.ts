import express from "express";
import { postProduct,
    getProducts,
    getProductById,
    putProduct,
    delProduct
 } from "../controller/productController";
import { protect } from "../../../authService/src/middlewares/authMiddleware";

const router = express.Router();

router.post('/',  postProduct);
router.get('/', getProducts);
router.get('/:id', protect, getProductById);
router.put('/:id', protect, putProduct);
router.delete('/:id', protect, delProduct);

export default router;