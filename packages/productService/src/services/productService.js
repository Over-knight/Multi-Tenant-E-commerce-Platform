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
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.listProducts = exports.createProduct = exports.initProductsTable = void 0;
const initProductsTable = (pool) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.execute(`
        CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        storeId INT,
        name VARCHAR(100),
        description TEXT'
        price DECIMAL(10,2),
        quantity INT,
        metadata JSON,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
});
exports.initProductsTable = initProductsTable;
const createProduct = (pool, storeId, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.initProductsTable)(pool);
    // const fields = object.keys(updates).map(f => )
    const [result] = yield pool.execute(`INSERT INTO products 
          (storeId, name, description, price, quantity, metadata) 
         VALUES (?, ?, ?, ?, ?, ?)`, [storeId, data.name, data.description, data.price, data.quantity, JSON.stringify(data.metadata || {})]);
    return result.insertId;
});
exports.createProduct = createProduct;
const listProducts = (pool_1, storeId_1, ...args_1) => __awaiter(void 0, [pool_1, storeId_1, ...args_1], void 0, function* (pool, storeId, page = 1, limit = 10) {
    yield (0, exports.initProductsTable)(pool);
    const offset = (page - 1) * limit;
    const [rows] = yield pool.query('SELECT * FROM products WHERE storeId = ? LIMIT ? OFFSET ?', [storeId, limit, offset]);
    return rows;
});
exports.listProducts = listProducts;
const getProduct = (pool, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.initProductsTable)(pool);
    const [rows] = yield pool.query('SELECT * FROM products WHERE id = ? LIMIT 1', [id]);
    return rows[0];
});
exports.getProduct = getProduct;
const updateProduct = (pool, id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.initProductsTable)(pool);
    const fields = Object.keys(updates).map(f => `${f} = ?`).join(', ');
    const values = Object.values(updates);
    yield pool.execute(`UPDATE products SET ${fields} WHERE id = ?`, [...values, id]);
});
exports.updateProduct = updateProduct;
const deleteProduct = (pool, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.initProductsTable)(pool);
    yield pool.execute('DELETE FROM products WHERE id = ?', [id]);
});
exports.deleteProduct = deleteProduct;
