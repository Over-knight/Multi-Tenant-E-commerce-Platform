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
exports.login = exports.register = void 0;
const authServices_1 = require("../services/authServices");
const generateToken_1 = require("../utils/generateToken");
const authSchemas_1 = require("../schemas/authSchemas");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = authSchemas_1.registerSchema.parse(req.body);
        const { tenantId } = yield (0, authServices_1.registerTenant)(name, email, password);
        const token = (0, generateToken_1.generateToken)({ tenantId, role: 'owner' });
        res.status(201).json({ token, tenantId });
    }
    catch (err) {
        console.error('Register error:', err);
        res.status(400).json({ message: err.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = authSchemas_1.loginSchema.parse(req.body);
        const { tenantId, userId, role } = yield (0, authServices_1.authenticateTenant)(email, password);
        const token = (0, generateToken_1.generateToken)({ tenantId, userId, role });
        res.json({ token, userId, role });
    }
    catch (err) {
        console.error('Login error', err);
        res.status(401).json({ message: err.message });
    }
});
exports.login = login;
