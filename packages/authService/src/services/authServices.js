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
exports.authenticateTenant = exports.registerTenant = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tenant_1 = require("./tenant");
const registerTenant = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = email.split('@')[0];
    const pool = yield (0, tenant_1.createTenant)(tenantId);
    yield pool.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100),
            password VARCHAR(255),
            role ENUM('owner', 'staff') DEFAULT 'owner'
            );
        `);
    const hashed = yield bcryptjs_1.default.hash(password, 10);
    yield pool.execute(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`, [name, email, hashed, 'owner']);
    return { tenantId };
});
exports.registerTenant = registerTenant;
const authenticateTenant = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = email.split('@')[0];
    const pool = yield (0, tenant_1.createTenant)(tenantId);
    const [rows] = yield pool.execute('SELECT id, password, role FROM users WHERE email = ? LIMIT 1', [email]);
    const user = rows[0];
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    return { tenantId, userId: user.id, role: user.role };
});
exports.authenticateTenant = authenticateTenant;
