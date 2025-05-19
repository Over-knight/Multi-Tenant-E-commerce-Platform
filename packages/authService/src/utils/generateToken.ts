import jwt from "jsonwebtoken";

export const generateToken = (payload: Record<string, any>): string => 
    jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: '1h' });
