import express from 'express';
import logger from 'morgan';
import { MulterError } from 'multer';
import fs from 'fs'
const errorCodes  = JSON.parse(fs.readFileSync('../api/config/errorCodes.json'));

import cookieParser from 'cookie-parser';
import {initializeDbModels, parsnigExsel} from "./utils/db.js";
const app = express();


import authRoute from './routes/auth.js';
import ostarbaiterRoute from './routes/ostarbaiter.js';
import uploadsRoute from './routes/uploads.js';
import corsMiddleware from './middlewares/cors.js'
import {AppError, MultipleError, SystemError} from "./utils/error.js";

logger.token('body', req => {
    try {
        if (req.method === 'POST' || req.method === 'PUT') {
            return JSON.stringify(req.body);
        } else {
            return null;
        }
    } catch (e) {
        return `Body parse error ${e?.message ?? e}`;
    }
});

if (app.get('env') === 'production') {
    app.use(
        logger('[:date[clf]] :method :url :status :response-time ms', {
            skip: req => ['/system', '/uploads'].includes(req.baseUrl),
        })
    );
} else if (app.get('env') === 'development' || app.get('env') === 'staging') {
    app.use(
        logger('[:date[clf]] :method :url :status :body :response-time ms', {
            skip: req => ['/system', '/uploads'].includes(req.baseUrl),
        })
    );
}
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRoute);
app.use('/ostarbaiters', ostarbaiterRoute);
app.use('/uploads', express.static('./uploads'), uploadsRoute);
app.use(corsMiddleware);



// ==== on server start functions
(async function initDb() {
    try {
        await initializeDbModels();
        await parsnigExsel()
    } catch (e) {
        if (app.get('env') !== 'test') {
            console.log(e);
            console.log('COULD NOT CONNECT TO THE DB, retrying in 5 seconds');
        }
        setTimeout(initDb, 5000);
    }
})();
// ====

app
    .use((req, res) => res.status(404).json({ type: 'NOT FOUND', code: 404 }))
    // eslint-disable-next-line no-unused-vars
    .use((error, req, res, next) => {

        if (error instanceof AppError || error instanceof SystemError || error instanceof MultipleError) {
            res.status(error.status).json(error.toJSON());
        } else if (error instanceof MulterError && error.code === 'LIMIT_FILE_SIZE') {
            const error = new AppError(errorCodes.FileTooLarge);
            res.status(error.status).json(error.toJSON());
        } else if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else if (error) {
            res.status(500).json(error);
        } else {
            res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
        }
    });

// Handle 404 AND 500

app.listen(process.env.PORT || 3000, () => console.log(`Listen on :${process.env.PORT || 3000}`));
