import { Router } from 'express';

import * as userController from '../controllers/users';
import { userValidator, checkUserExists } from '../validators/userValidator';

const router = Router();

/**
 * POST /api/signup
 */
router.post('/signup', userValidator, checkUserExists, userController.create);

export default router;
