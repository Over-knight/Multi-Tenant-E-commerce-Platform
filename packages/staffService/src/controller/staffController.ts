import { Response } from "express";
import { inviteStaff } from "../services/staffService";
import {AuthRequest} from "../../../authService/src/middlewares/authMiddleware";

export const postInviteStaff = async (req: AuthRequest, res: Response): Promise<void> => {
    try{
        const storeId = Number(req.params.id);
        const { userId: inviteId, role} = req.body;
        if (req.user!.role !== 'owner') {
            res.status(403).json({ message: "Only owners can invite"});
            return;
        }

        const pool = req.dbPool!;
        const id = await inviteStaff(pool, storeId, inviteId, role);
        res.status(201).json({ inviteId: id}); 
    } catch (error: any) {
        console.error('Invite staff error:', error);
        res.status(500).json({ message: "error.message"});
    }
};
