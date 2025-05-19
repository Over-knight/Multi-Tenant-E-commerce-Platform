import { Request, Response } from "express";
import { createStore, listStores } from "../services/storeService";
import { AuthRequest } from "../../../authService/src/middlewares/authMiddleware";

export const postStore = async (req: AuthRequest, res: Response): Promise<void> => {
    const {name} = req.body;
    const pool = req.dbPool!;
    const ownerId = req.user!.userId;
    try{
        const storeId = await createStore(pool, name, ownerId);
        res.status(201).json({ storeId });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: err.message});
    }
};

export const getStores = async (req: AuthRequest, res: Response): Promise<void> => {
    const pool = req.dbPool!;
    const ownerId = req.user!.userId;

    try{
        const stores = await listStores(pool, ownerId);
        res.json(stores);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: err.message});
    }
};