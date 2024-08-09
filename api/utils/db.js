import  { sequelize } from '../models/index.js'
import Ostarbeiter from "../models/index.js";
import { Admin }   from "../models/index.js";
import ExcelJS from 'exceljs';
import { v4 as uuidv4 } from 'uuid';

export async function initializeDbModels() {
    if (typeof Ostarbeiter.initialize === 'function') Ostarbeiter.initialize(sequelize);
    if (typeof Admin.initialize === 'function') Admin.initialize(sequelize);
    await Ostarbeiter.sync({ alter: true });
    await Admin.sync({ alter: true });
    if (process.env.NODE_ENV !== 'test') console.log('models initialized');
}
export async function parsnigExsel(){

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('../api/uploads/ostarbiters.xlsx');
    const worksheet=await workbook.getWorksheet('д10')
    const data=[]
    await Ostarbeiter.truncate();
    worksheet.eachRow(function(row, rowNumber) {
        const [,
            fio, date, placeBirthday, partyMembership, nationality,
            profession , departure, arrival, filtrationPoint, address, footnote, note
        ]=row.values

        if(rowNumber!==1)
        {
            data.push(
                {
                    id:uuidv4(),  fio, date: new Date(date), placeBirthday, partyMembership, nationality,
                    profession , departure, arrival, filtrationPoint, address, footnote, note
                })
        }
    })

   await Ostarbeiter.bulkCreate(data)
}

