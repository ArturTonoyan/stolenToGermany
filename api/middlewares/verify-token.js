import jwt from '../utils/jwt.js';
import {AppErrorInvalid } from '../utils/error.js';

 async function general(req, res, next) {
    const authorization = req.cookies['auth._token.admin'];
     console.log(authorization)
    if (authorization?.split(' ')[0] !== 'Bearer') throw new AppErrorInvalid('token', 401);
    try {
        req.user = jwt.verify(authorization.split(' ')[1]);
    } catch (e) {

        console.log(e);
        throw new AppErrorInvalid('token', 401);
    }
    next();
}

export default {
    general,
}