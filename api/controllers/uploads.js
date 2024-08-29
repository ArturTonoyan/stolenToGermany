import path from "path";
import multer from "multer";
import fs from "fs";
import {AppError, AppErrorInvalid, AppErrorMissing, AppErrorNotExist} from "../utils/error.js";
import Ostarbeiter from "../models/index.js";
import { Op } from "sequelize";
import {v4 as uuidv4} from "uuid";
import {readdir} from "node:fs/promises";

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
  destination: async ({body: {id, types}, url},{ originalname }, cb) => {
    types.sort((a,b)=> a-b)
    if(!id) throw  new AppErrorMissing('id')
    const ostarbaiter=await Ostarbeiter.findByPk(id)
    if(!ostarbaiter) cb(new AppError(errorCodes.NotExist));
    if(types.length < 1) throw new AppErrorMissing('types')
    if(supportingDocuments[types[0]] === supportingDocuments[0]){
     try{
      if(fs.existsSync(`./uploads/${ostarbaiter?.id}/images`)){
          const nameFile= (await readdir(`./uploads/${ostarbaiter?.id}/images`))[0]
          if(nameFile) {
              fs.unlink(`./uploads/${ostarbaiter?.id}/images/${nameFile}`, () => {});
          }
      }
     }catch (e){
       cb(new AppError(e.message));
     }
   }

    fs.mkdirSync(
        path.join(
          path.resolve("./uploads"),
          id,
          supportingDocuments[types[0]]
        ),
        { recursive: true }
      );

      cb(
        null,
        `./uploads/${id}/${supportingDocuments[types[0]]}`
      );
  },
  filename: async ({body: { id, types }, url} , { originalname }, cb) => {
    const extension = path.extname(originalname).toLowerCase();
    const ostarbaiter = await Ostarbeiter.findByPk(id);
    if (!ostarbaiter) cb(new AppError(errorCodes.NotExist));
    else cb(null,  uuidv4() + extension);
  },
});

const uploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3145728 },
}).single("file");


export default {
  uploader,
  async afterUpload({body: {id, types}, file, url }, res) {
    for (let i=1; i<types.length; i++){
      fs.mkdirSync(
          path.join(
              path.resolve("./uploads"),
              `${id}`,
              supportingDocuments[types[i]]
          ),
          { recursive: true }
      );
      fs.copyFile(
          file.path,
          `./uploads/${id}/${supportingDocuments[types[i]]}/`+ file.filename,
          (err) => {
            if (err) throw err; // не удалось скопировать файл
            console.log("Файл успешно скопирован");
          }
      );
    }
    res.json({ status: "Ok" });
  },

  async delete({body: { file, type, id }  }, res) {
    const ostarbaiter=await Ostarbeiter.findByPk(id)
    if(!ostarbaiter) throw new AppErrorNotExist('ostarbaiter')
    try {
       fs.unlink(`./uploads/${id}/${supportingDocuments[type]}/${file}`, () => {});
    }catch (e) {
      throw new AppErrorInvalid('file')
    }
    res.json({ status: 'OK' });
  },

   deleteDirectrory(ostarbaiter){
    if(!ostarbaiter) throw new AppErrorMissing('ostarbaiter')
     try {
      fs.rm(`./uploads/${ostarbaiter.id}`, {recursive: true },() => {});
    }catch (e) {
      throw new AppErrorInvalid('directory')
    }
  }
};
