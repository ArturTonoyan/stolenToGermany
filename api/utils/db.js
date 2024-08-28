import  { sequelize } from '../models/index.js'
import Ostarbeiter, { Admin } from "../models/index.js";
import ExcelJS from 'exceljs';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
export async function initializeDbModels() {
    if (typeof Ostarbeiter.initialize === 'function') Ostarbeiter.initialize(sequelize);
    if (typeof Admin.initialize === 'function') Admin.initialize(sequelize);
    await Ostarbeiter.sync({ alter: true });
    await Admin.sync({ alter: true });
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
            await workbook.xlsx.readFile('../api/uploads/sample.xlsx');
            const worksheet = await workbook.getWorksheet('Таганрог')
            const data = []
            worksheet.eachRow(function (row, rowNumber) {
                const [, ,
                    surname, name, patronymic, date, departure, profession, dateDeparture,
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
                }
            })
            await Ostarbeiter.bulkCreate(data)
        }
    }catch (e) {
        console.log(e)
    }
}

