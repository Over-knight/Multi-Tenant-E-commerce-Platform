import { Router, Request, Response } from "express";
import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { register, login } from "../controllers/authControllers";
import { protect } from "../middlewares/authMiddleware";
import { loginSchema, registerSchema } from "../schemas/authSchemas";
import { validateBody, validateQuery } from "../middlewares/validate";

const router = express.Router();

router.post("/register", validateBody(registerSchema) ,register);
router.post("/login", validateBody(loginSchema),login);

router.get('/me', protect, (req, res) => {
    const user = (req as any).user;
    res.json({
      tenantId: user.tenantId,
      userId:   user.userId,
      role:     user.role,
    });
  });

export default router;
