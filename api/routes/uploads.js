import { Router } from 'express';
import { asyncRoute } from '../utils/error.js';
import verify from '../middlewares/verify-token.js';
import uploadsCtrl from '../controllers/uploads.js';

const router = Router();

router.use(asyncRoute(verify.general));


router
    .route('/')
    .post(uploadsCtrl.uploader, asyncRoute(uploadsCtrl.afterUpload))
    .delete(asyncRoute(uploadsCtrl.delete))

export default router;