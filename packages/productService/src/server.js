"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/products", productRoute_1.default);
app.get('/health', (req, res) => { res.send("OK"); });
const PORT = process.env.PORT || 5200;
app.listen(PORT, () => console.log(`Auth Service on ${PORT}`));
