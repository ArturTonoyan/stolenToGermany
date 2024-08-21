import path from 'path'
import multer from 'multer'
import fs from "fs"
import {AppError, AppErrorInvalid, AppErrorMissing} from "../utils/error.js";
import Ostarbeiter from "../models/index.js";
import { readdir } from "node:fs/promises";
import { Op } from "sequelize";

const errorCodes  = JSON.parse(fs.readFileSync('../api/config/errorCodes.json'));


const  supportingDocuments= {
    1:'scanPassport',
    2:'employmentHistory',
    3:'addressBeforeShipping',
    4:'departureDate',
    5:'departure',
    6:'arrival',
    7:'deathInformation',
    8:'repatriationInfo',
    9:'addressAfterShipping'
}

const acceptedTypes  = /jpeg|jpg|png/;
const fileFilter = (req, { originalname }, cb) => {
    const extension = path.extname(originalname).toLowerCase();
    if (acceptedTypes.test(extension)) cb(null, true);
    else cb(new AppError(errorCodes.FileExtensionNotAllowed));
};

const storage = multer.diskStorage({
    destination: async (req, { originalname }, cb) => {
        const extension = path.extname(originalname).toLowerCase();
        const data=originalname.trim().split(extension).join('').split('-')
        if(data.length===2) {
                fs.mkdirSync( path.join(path.resolve('./uploads'), `${data[0]}${data[1]}`, 'images'),{ recursive: true })
                cb(null, `./uploads/${data[0]}${data[1]}/images`)
            }
            else {
                    fs.mkdirSync(path.join(path.resolve('./uploads'), `${data[0]}${data[1]}`, supportingDocuments[data[2]] ),{ recursive: true });
                    cb(null, `./uploads/${data[0]}${data[1]}/${supportingDocuments[data[2]]}`)
            }
    },
    filename:  async (req,{ originalname }, cb) => {
        const extension = path.extname(originalname).toLowerCase();
        const fio=originalname.trim()
            .split(extension)
            .join('')
            .split('-')[0]
            .match(/[А-ЯЁA-Z][а-яёa-z]+/g)


        const [surname, name, patronymic] = fio
        const date=originalname.trim().split(extension).join('').split('-')[1]
        console.log(surname, name, date)
        const ostarbaiter=await Ostarbeiter.findOne({
            where: {
            ...(surname  && { surname: { [Op.like]: `%${surname}%` }}),
            ...(name &&  { name : { [Op.like]: `%${name}%` }}),
            ...(patronymic && { patronymic: { [Op.like]: `%${patronymic}%` }} ),
                date
            },
        })


        if(!ostarbaiter) cb(new AppError(errorCodes.NotExist))
        if(req.url==='/image') cb(null, ostarbaiter.id+extension)
        else cb(null, ostarbaiter.id + '_1' + extension);
    },
});




const uploader = multer({ storage, fileFilter, limits: { fileSize: 3145728 } }).array('files', 10);
const uploaderImage = multer({ storage, fileFilter, limits: { fileSize: 3145728 } }).single('image');


export default {
    uploader,
    uploaderImage,
    async afterUpload( req, res) {

        if(req.url==='/image')
        {

            if(!req.file) throw new AppErrorMissing('image')
            return res.json({ status: 'OK' });
        }
        if (!req.files) throw new AppErrorMissing('files');

        const files=req.files
        let e=0
        for (const file of files) {
            const extension = path.extname(file.originalname).toLowerCase();
            const data=file.originalname.trim().split(extension).join('').split('-')

            const arrayfiles= (await readdir(`./uploads/${data[0]}${data[1]}/${supportingDocuments[data[2]]}`))
            const src= arrayfiles[arrayfiles.length-1].split('.')[0]

            const [id, number]=src.split('_')
            if(data.length < 3) throw new AppErrorInvalid('name')
            let step=2
            for (let i=3;i<data.length; i++, step+=+number){
                fs.mkdirSync(path.join(path.resolve('./uploads'), `${data[0]}${data[1]}`, supportingDocuments[data[i]] ),{ recursive: true });
                fs.copyFile(`./uploads/${data[0]}${data[1]}/${supportingDocuments[data[2]]}/${src}`+ extension,
                    `./uploads/${data[0]}${data[1]}/${supportingDocuments[data[i]]}/${id}_${step}`+ extension,
                    err => {
                        if(err) throw err; // не удалось скопировать файл
                        console.log('Файл успешно скопирован');
                    });
            }
        }

        res.json({ status:'Ok' })
    },

}