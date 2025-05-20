import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenExpiredError } from "jsonwebtoken";
import { createTenant } from "../services/tenant";

interface JwtPayload {
    tenantId: string;
    userId: number;
    role: 'owner' | 'staff';
}

export interface AuthRequest extends Request {
    user?: {
      tenantId: string;
      userId: number;
      role: 'owner' | 'staff';
    };
    dbPool?: Awaited<ReturnType<typeof createTenant>>;
  }

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    // let token: string | undefined;
    const authHeader = req.headers.authorization;
    // if (authHeader && authHeader.startsWith("Bearer")) {
    // }
    if (!authHeader?.startsWith("Bearer")) {
        res.status(401).json({ message: "Not authorized, token missing"});
        return;
    }
    const token = authHeader.split(" ")[1];
    
    // if (token) {
    //     res.status(401).json({ message: "Not authorized, token missing"});
    //     return;
    // }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        // console.log("Decoded JWT:", decoded); //was used for testing
        const { tenantId, userId, role} = decoded;
        if (!tenantId || !userId || !role) {
            res.status(401).json({message:'Invalid token payload'});
            return;
        }
        req.user = {tenantId, userId, role};
        req.dbPool = await createTenant(tenantId);
        return next(); 
    } catch (error: any) {
        if (error instanceof TokenExpiredError) {
            res.status(401).json({ message: "Session expired, Please log in again" });
            return;
        }
        console.error("JWT verification error:", error);
        res.status(401).json({ message: "Not authorized, token failed"});
        return;
    }
};