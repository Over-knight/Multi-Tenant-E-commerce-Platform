"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const authMiddleware_1 = require("../../../authService/src/middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.protect, productController_1.postProduct);
router.get('/', authMiddleware_1.protect, productController_1.getProducts);
router.get('/:id', authMiddleware_1.protect, productController_1.getProductById);
router.put('/:id', authMiddleware_1.protect, productController_1.putProduct);
router.delete('/:id', authMiddleware_1.protect, productController_1.delProduct);
exports.default = router;
