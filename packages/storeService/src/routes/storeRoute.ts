import { Router } from 'express';
import { postStore, getStores } from '../controllers/storeController';
import express from 'express';
import { protect } from '../../../authService/src/middlewares/authMiddleware';

const router = express.Router();

router.post("/", protect, postStore);
router.get("/", protect, getStores);

export default router;