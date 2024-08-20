import { Router } from 'express';
import { asyncRoute } from '../utils/error.js';
import verify from '../middlewares/verify-token.js';
import uploadsCtrl from '../controllers/uploads.js';

const router = Router();

router.use(asyncRoute(verify.general));


router
    .route('/')
    .post(uploadsCtrl.uploader, asyncRoute(uploadsCtrl.afterUpload))

router
    .route('/image')
    .post(uploadsCtrl.uploaderImage, asyncRoute(uploadsCtrl.afterUpload))





export default router;