"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delProduct = exports.putProduct = exports.getProductById = exports.getProducts = exports.postProduct = void 0;
const productService_1 = require("../services/productService");
;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const storeId = Number(req.body.storeId);
        const pool = req.dbPool;
        const { storeId, name, description, price, quantity, metadata } = req.body;
        const productId = yield (0, productService_1.createProduct)(pool, Number(storeId), {
            name,
            description,
            price,
            quantity,
            metadata,
        });
        res.status(201).json({ productId });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.postProduct = postProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = req.dbPool;
        const storeId = Number(req.query.storeId);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const products = yield (0, productService_1.listProducts)(pool, storeId, page, limit);
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = req.dbPool;
        const product = yield (0, productService_1.getProduct)(pool, Number(req.params.id));
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getProductById = getProductById;
const putProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = req.dbPool;
        yield (0, productService_1.updateProduct)(pool, Number(req.params.id), req.body);
        res.json({ message: 'Updated' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.putProduct = putProduct;
const delProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = req.dbPool;
        yield (0, productService_1.deleteProduct)(pool, Number(req.params.id));
        res.json({ message: 'Deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.delProduct = delProduct;
