"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authSchemas_1 = require("../schemas/authSchemas");
const validate_1 = require("../middlewares/validate");
const router = express_1.default.Router();
router.post("/register", (0, validate_1.validateBody)(authSchemas_1.registerSchema), authControllers_1.register);
router.post("/login", (0, validate_1.validateBody)(authSchemas_1.loginSchema), authControllers_1.login);
router.get('/me', authMiddleware_1.protect, (req, res) => {
    const user = req.user;
    res.json({
        tenantId: user.tenantId,
        userId: user.userId,
        role: user.role,
    });
});
exports.default = router;
