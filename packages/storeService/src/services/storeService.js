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
exports.listStores = exports.createStore = void 0;
const createStore = (pool, name, ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.execute(`
        CREATE TABLE IF NOT EXISTS stores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        ownerId INT
        );
    `);
    const [result] = yield pool.execute('INSERT INTO stores (name, ownerId) VALUES (?, ?)', [name, ownerId]);
    return result.insertId;
});
exports.createStore = createStore;
const listStores = (pool, ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield pool.query('SELECT * FROM stores WHERE ownerId = ?', [ownerId]);
    return rows;
});
exports.listStores = listStores;
