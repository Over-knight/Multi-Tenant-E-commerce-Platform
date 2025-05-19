import { Request, Response } from "express";
import { registerTenant, authenticateTenant } from "../services/authServices";
import { generateToken } from "../utils/generateToken";
import { registerSchema, loginSchema } from "../schemas/authSchemas";

export const register = async (req: Request, res: Response): Promise<void> => {
    try{
        const { name, email, password} = registerSchema.parse(req.body);
        const {tenantId} = await registerTenant(name, email, password);

        const token = generateToken({ tenantId, role: 'owner'});
        res.status(201).json({ token, tenantId});
    } catch (err: any) {
        console.error('Register error:', err);
        res.status(400).json({ message: err.message});
    }
};

export const login = async (req: Request, res: Response) => {
    try{
        const { email, password} = loginSchema.parse(req.body);
        const { tenantId, userId, role} = await authenticateTenant(email, password);

        const token = generateToken({ tenantId, userId, role});
        res.json({ token, userId, role});
    } catch (err: any) {
        console.error('Login error', err);
        res.status(401).json({ message: err.message});
    }
}