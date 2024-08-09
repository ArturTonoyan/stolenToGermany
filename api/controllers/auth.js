import {AppErrorAlreadyExists, AppErrorInvalid, AppErrorNotExist} from '../utils/error.js';
import jwt from '../utils/jwt.js';
import {Admin} from "../models/index.js";


const atLeastOneDigit = /\d/,
    atLeastOneLowerLetter = /[a-z]/,
    atLeastOneUpperLetter = /[A-Z]/

export default {
    async login({ body: { email, password } }, res) {
        if (!email) throw new AppErrorNotExist('email');
        if (!password) throw new AppErrorNotExist('password');

        const admin = await Admin.findOne({ where: { email } });
        if (!admin || !admin.validatePassword(password)) throw new AppErrorInvalid('Login or password', 403);

        const { jwt: token } = jwt.generate({ id: admin.id });
        res.json({ admin: admin, token });
    },

    async registration({body: { email, password }}, res){

        if (!email) throw new AppErrorNotExist('email');

        const isValid =
            atLeastOneDigit.test(password) &&
            atLeastOneLowerLetter.test(password) &&
            atLeastOneUpperLetter.test(password) &&
            password.length >= 5 &&
            password.length <= 20;


        if (!password  || !isValid) throw new AppErrorNotExist('password');

        const adminCheck = await Admin.findOne({ where: { email } });
        console.log(adminCheck)
        if(adminCheck) throw new AppErrorAlreadyExists('admin')

        const admin=await Admin.create({ email, password })
        const { jwt: token } = jwt.generate({ id: admin.id });

        res.json({ student: admin, token });
    }
}