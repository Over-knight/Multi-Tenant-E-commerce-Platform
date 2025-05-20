import { Router } from 'express';
import { postInviteStaff } from '../controller/staffController';
import { protect } from '../../../authService/src/middlewares/authMiddleware'

const router = Router();


router.post('/:id/staff', protect, postInviteStaff);

export default router;
