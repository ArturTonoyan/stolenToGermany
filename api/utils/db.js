import  { sequelize } from '../models/index.js'
import Ostarbeiter, { Admin, City } from "../models/index.js";
import ExcelJS from 'exceljs';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import fs from "fs";
import AdmZip from 'adm-zip'
import {readdir} from "node:fs/promises";
import {Op} from "sequelize";
import send from "./camps.js";

export async function initializeDbModels() {
    if (typeof Ostarbeiter.initialize === 'function') Ostarbeiter.initialize(sequelize);
    if (typeof Admin.initialize === 'function') {
        Admin.initialize(sequelize);
        if(await checkTableExists(Admin.tableName)) await Admin.findOrCreate({ where: {email: 'admin' }, defaults: {email: 'admin', password: '1Th@d2gg60' } })
    }
    if (typeof City.initialize === 'function') City.initialize(sequelize);
    await Ostarbeiter.sync({ alter: true });
    await Admin.sync({ alter: true });
    await City.sync({ alter: true });
    if (process.env.NODE_ENV !== 'test') console.log('models initialized');
}

async function checkTableExists(tableName) {
    const queryInterface = sequelize.getQueryInterface();
    const tableExists = await queryInterface.showAllTables();
    return tableExists.includes(tableName);
}

export async function parsnigExsel(){
    try {
        if(await checkTableExists(Ostarbeiter.tableName) && !(await Ostarbeiter.findAll()).length) {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile('../api/uploads/db.xlsx');
            const worksheet = await workbook.getWorksheet('Таганрог')
            const data = []
            const numbersData={}
            worksheet.eachRow(function (row, rowNumber) {
                const [, number, surname, name, patronymic, date, departure, profession, dateDeparture,
                    localityDeparture, localityWork, infoOfDeath, infoOfRepatriation, addressAfterReturning, note
                ] = row.values

                if (rowNumber !== 1) {
                    data.push(
                        {
                            id: uuidv4(),
                            surname,
                            name,
                            patronymic,
                            date,
                            departure,
                            profession,
                            dateDeparture,
                            localityDeparture,
                            localityWork,
                            infoOfDeath,
                            infoOfRepatriation,
                            addressAfterReturning,
                            note
                        })
                    numbersData[number] = data[data.length-1].id
                }
            })

            await Ostarbeiter.bulkCreate(data)
            await parsingZip(numbersData)
        }
    }catch (e) {
        console.log(e)
    }
}

export async function searchCoordinates(){
    if(await checkTableExists(City.tableName) && !(await City.findAll()).length) {

        const camps = await Ostarbeiter.findAll({
            where: {
                localityWork: {[Op.ne]: null},
            },
        });

        for (const camp of camps) {
            camp.localityWorkUpdate = camp.localityWork.split(' ')[1] !== undefined ? camp.localityWork.split(' ')[1] : camp.localityWork.split(' ')[0]
        }

        const localityWork =  Array.from(new Set(camps.filter(camp => camp.localityWorkUpdate).map(c => c.localityWorkUpdate)))

        await send(localityWork, 0)

    }
}

export async function parsingZip(numbersData){
    try {
        const zip=new AdmZip('../api/uploads/угнаные.zip')
        zip.extractAllTo( "../api/uploads/",  true);
        const nameFile= (await readdir(`../api/uploads/`))
        for (const file of nameFile) {
            if(Number(file) && file) {
                    fs.cp(`../api/uploads/${file}`, `../api/uploads/${numbersData[file]}`, {recursive: true}, (err) => {
                        if (!err) fs.rm(`../api/uploads/${file}`, {recursive: true}, (err) => {
                            if (err) console.log(err)
                        });
                    });
            }
        }
    }catch (e){

    }
}

