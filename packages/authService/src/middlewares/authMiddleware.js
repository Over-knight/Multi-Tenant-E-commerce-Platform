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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jsonwebtoken_2 = require("jsonwebtoken");
const tenant_1 = require("../services/tenant");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // let token: string | undefined;
    const authHeader = req.headers.authorization;
    // if (authHeader && authHeader.startsWith("Bearer")) {
    // }
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer"))) {
        res.status(401).json({ message: "Not authorized, token missing" });
        return;
    }
    const token = authHeader.split(" ")[1];
    // if (token) {
    //     res.status(401).json({ message: "Not authorized, token missing"});
    //     return;
    // }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded JWT:", decoded); //was used for testing
        const { tenantId, userId, role } = decoded;
        if (!tenantId || !userId || !role) {
            res.status(401).json({ message: 'Invalid token payload' });
            return;
        }
        req.user = { tenantId, userId, role };
        req.dbPool = yield (0, tenant_1.createTenant)(tenantId);
        return next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_2.TokenExpiredError) {
            res.status(401).json({ message: "Session expired, Please log in again" });
            return;
        }
        console.error("JWT verification error:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
        return;
    }
});
exports.protect = protect;
