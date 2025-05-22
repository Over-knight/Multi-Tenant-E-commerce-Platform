import { Response } from 'express';
import {
  createProduct, 
  listProducts, 
  getProduct, 
  updateProduct, 
  deleteProduct
} from '../services/productService';
import type { Pool } from 'mysql2/promise';
import { AuthRequest } from '../../../authService/src/middlewares/authMiddleware';;

export const postProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  console.log('📝 postProduct called', req.body);
  try {
    const storeId = Number(req.body.storeId);
    const pool = req.dbPool as Pool;
    // const { storeId, name, description, price, quantity, metadata } = req.body;
    // const productId = await createProduct(pool, Number(req.body.storeId), {
    //     name,
    //     description,
    //     price,
    //     quantity,
    //     metadata,
    // });
    const productId = await createProduct(pool, storeId, req.body);
    res.status(201).json({ productId});
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProducts = async (req: AuthRequest, res: Response) => {
  try {
    const pool    = req.dbPool!;
    const storeId = Number(req.query.storeId);
    const page    = Number(req.query.page) || 1;
    const limit   = Number(req.query.limit) || 10;
    const products = await listProducts(pool, storeId, page, limit);
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req: AuthRequest, res: Response) => {
  try {
    const pool = req.dbPool!;
    const product = await getProduct(pool, Number(req.params.id));
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const putProduct = async (req: AuthRequest, res: Response) => {
  try {
    const pool = req.dbPool!;
    await updateProduct(pool, Number(req.params.id), req.body);
    res.json({ message: 'Updated' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const delProduct = async (req: AuthRequest, res: Response) => {
  try {
    const pool = req.dbPool!;
    await deleteProduct(pool, Number(req.params.id));
    res.json({ message: 'Deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
