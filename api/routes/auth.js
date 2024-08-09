import { Router } from 'express';
import authCtrl from '../controllers/auth.js';
import { asyncRoute } from '../utils/error.js';

const router = Router();

router.route('/login').post(asyncRoute(authCtrl.login));
router.route('/registration').post(asyncRoute(authCtrl.registration));

export default router;