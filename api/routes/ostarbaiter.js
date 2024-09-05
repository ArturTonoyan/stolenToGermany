
import { Router } from 'express';
import osCtrl from '../controllers/ostarbaiter.js';
import {asyncRoute} from '../utils/error.js';
import verify from '../middlewares/verify-token.js';

const router = Router();

router.route('/')
    .get(asyncRoute(osCtrl.get))
    .post(asyncRoute(verify.general), asyncRoute(osCtrl.create))

router.route('/camps')
    .get(asyncRoute(osCtrl.stolenInCamps))

router.route('/:ostarbaiterId')
    .get(asyncRoute(osCtrl.getById))
    .put(asyncRoute(verify.general), asyncRoute(osCtrl.update))
    .delete(asyncRoute(verify.general), asyncRoute(osCtrl.delete))
export default router;