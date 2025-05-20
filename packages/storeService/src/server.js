"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const storeRoute_1 = __importDefault(require("./routes/storeRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/stores', storeRoute_1.default);
app.get('/health', (req, res) => { res.send("OK"); });
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5100;
app.listen(PORT, () => {
    console.log(`Store Service running on port ${PORT}`);
});
