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
exports.getStores = exports.postStore = void 0;
const storeService_1 = require("../services/storeService");
const postStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const pool = req.dbPool;
    const ownerId = req.user.userId;
    try {
        const storeId = yield (0, storeService_1.createStore)(pool, name, ownerId);
        res.status(201).json({ storeId });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.postStore = postStore;
const getStores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = req.dbPool;
    const ownerId = req.user.userId;
    try {
        const stores = yield (0, storeService_1.listStores)(pool, ownerId);
        res.json(stores);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.getStores = getStores;
