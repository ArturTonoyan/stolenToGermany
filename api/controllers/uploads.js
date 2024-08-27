import path from "path";
import multer from "multer";
import fs from "fs";
import {AppError, AppErrorInvalid, AppErrorMissing, AppErrorNotExist} from "../utils/error.js";
import Ostarbeiter from "../models/index.js";
import { Op } from "sequelize";
import {v4 as uuidv4} from "uuid";

const errorCodes = JSON.parse(fs.readFileSync("../api/config/errorCodes.json"));

const supportingDocuments = {
  0: 'images',
  1: "scanPassport",
  2: "employmentHistory",
  3: "addressBeforeShipping",
  4: "departureDate",
  5: "departure",
  6: "arrival",
  7: "deathInformation",
  8: "repatriationInfo",
  9: "addressAfterShipping",
};

const acceptedTypes = /jpeg|jpg|png/;
const fileFilter = (req, { originalname }, cb) => {
  const extension = path.extname(originalname).toLowerCase();
  if (acceptedTypes.test(extension)) cb(null, true);
  else cb(new AppError(errorCodes.FileExtensionNotAllowed));
};

const storage = multer.diskStorage({
  destination: async ({body: {surname, name, patronymic, date, types}, url}, { originalname }, cb) => {

    if(!surname) throw  new AppErrorMissing('surname')
    if(!date) throw new AppErrorMissing('date')

    const fullname= [surname.trim(), name?.trim(), patronymic?.trim()].join('')

    if (url==='/image') {
      fs.mkdirSync(
        path.join(path.resolve("./uploads"), `${fullname}${date}`, "images"),
        { recursive: true }
      );
      cb(null, `./uploads/${fullname}${date}/images`);
    } else {
      if(types.length < 1) throw new AppErrorMissing('types')
      fs.mkdirSync(
        path.join(
          path.resolve("./uploads"),
          `${fullname}${date}`,
          supportingDocuments[types[0]]
        ),
        { recursive: true }
      );
      cb(
        null,
        `./uploads/${fullname}${date}/${supportingDocuments[types[0]]}`
      );
    }
  },
  filename: async ({body: { surname, name, patronymic, date }, url} , { originalname }, cb) => {
      const extension = path.extname(originalname).toLowerCase();

    const ostarbaiter = await Ostarbeiter.findOne({
      where: {
        ...(surname && { surname: { [Op.like]: `%${surname}%` } }),
        ...(name && { name: { [Op.like]: `%${name}%` } }),
        ...(patronymic && { patronymic: { [Op.like]: `%${patronymic}%` } }),
        date,
      },
    });

    if (!ostarbaiter) cb(new AppError(errorCodes.NotExist));
    if (url === "/image") cb(null, ostarbaiter.id + extension);
    else cb(null,  uuidv4() + extension);
  },
});

const uploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3145728 },
}).single("file");


const uploaderImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3145728 },
}).single("image");

export default {
  uploader,
  uploaderImage,
  async afterUpload({body: {surname, name, patronymic, date, types}, file, url }, res) {

    if (url === "/image") {
      if (!file) throw new AppErrorMissing("file");
      return res.json({ status: "OK" });
    }

    const fullname= [surname.trim(), name?.trim(), patronymic?.trim()].join('')

    let step = 1
    for (let i=1; i<types.length; i++){
      fs.mkdirSync(
          path.join(
              path.resolve("./uploads"),
              `${fullname}${date}`,
              supportingDocuments[types[i]]
          ),
          { recursive: true }
      );
      fs.copyFile(
          file.path,
          `./uploads/${fullname}${date}/${supportingDocuments[types[i]]}/`+ file.filename,
          (err) => {
            if (err) throw err; // не удалось скопировать файл
            console.log("Файл успешно скопирован");
          }
      );
      step++
    }
    res.json({ status: "Ok" });
  },



  async delete({body: { file, type, id }  }, res) {

    const ostarbaiter=await Ostarbeiter.findByPk(id)
    if(!ostarbaiter) throw new AppErrorNotExist('ostarbaiter')
    const fullname= [ostarbaiter?.surname.trim(), ostarbaiter?.name?.trim(), ostarbaiter?.patronymic?.trim()].join('')
    try {
       fs.unlink(`./uploads/${fullname}${ostarbaiter?.date}/${supportingDocuments[type]}/${file}`, () => {});
    }catch (e) {
      throw new AppErrorInvalid('file')
    }

    res.json({ status: 'OK' });
  },

};
