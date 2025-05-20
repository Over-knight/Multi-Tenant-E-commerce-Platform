"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateBody = void 0;
const validateBody = (Schema) => (req, res, next) => {
    const result = Schema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.errors.map(e => ({
            field: e.path.join(','),
            message: e.message
        }));
        res.status(400).json({ errors });
        return;
    }
    req.body = result.data;
    next();
};
exports.validateBody = validateBody;
const validateQuery = (Schema) => (req, res, next) => {
    const result = Schema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.errors.map(e => ({
            field: e.path.join(','),
            message: e.message
        }));
        res.status(400).json({ errors });
        return;
    }
    req.body = result.data;
    next();
};
exports.validateQuery = validateQuery;
