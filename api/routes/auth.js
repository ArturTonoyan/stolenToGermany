import { Router } from 'express';
import authCtrl from '../controllers/auth.js';
import { asyncRoute } from '../utils/error.js';
import verify from "../middlewares/verify-token.js";

const router = Router();

router.route('/login').post(asyncRoute(authCtrl.login));
router.route('/checkAuthorization').get(asyncRoute(verify.general),asyncRoute(authCtrl.checkAuthorization));
router.route('/registration').post(asyncRoute(authCtrl.registration));

export default router;