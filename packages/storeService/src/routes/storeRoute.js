"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storeController_1 = require("../controllers/storeController");
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../../authService/src/middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.protect, storeController_1.postStore);
router.get("/", authMiddleware_1.protect, storeController_1.getStores);
exports.default = router;
