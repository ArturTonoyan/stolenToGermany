import { Sequelize, DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import 'dotenv/config';
const { DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_NAME } = process.env;



export default class Ostarbeiter extends Model {
    static initialize(sequelize) {
        Ostarbeiter.init(
            {
                id: { type: DataTypes.UUID, primaryKey: true },
                surname: {type: DataTypes.STRING, allowNull: false } ,
                name: {type: DataTypes.STRING, allowNull: true } ,
                patronymic: {type: DataTypes.STRING, allowNull: true } ,
                date: { type: DataTypes.STRING, allowNull: false },
                departure: {type: DataTypes.STRING, allowNull: true},
                profession: {type: DataTypes.STRING, allowNull: true},
                dateDeparture: {type: DataTypes.STRING, allowNull: true },
                localityDeparture: {type: DataTypes.STRING, allowNull: true },
                localityWork: {type: DataTypes.STRING, allowNull: true},
                infoOfDeath: {type: DataTypes.STRING, allowNull: true },
                infoOfRepatriation: {type: DataTypes.STRING, allowNull: true},
                addressAfterReturning: {type: DataTypes.STRING, allowNull: true},
                note:{type: DataTypes.STRING, allowNull: true},
            },
            {
                sequelize,
                modelName: 'Ostarbeiter',
                tableName: 'ostarbeiters',
            }
        );

        Ostarbeiter.beforeCreate(m => {
            m.id = uuidv4();
        });
    }
}

export class Admin extends Model {
    static initialize(sequelize){
        Admin.init({
            id: { type: DataTypes.UUID, primaryKey: true },
            email: {type: DataTypes.STRING, unique: true },
            password: { type: DataTypes.STRING, allowNull: true },
        },
            {
                sequelize,
                modelName: 'Admin',
                tableName: 'admins',
            }
            )

        function beforeCU(user) {
            if (user.changed('password')) {
                user.set('password', bcrypt.hashSync(user.password, bcrypt.genSaltSync()));
            }
        }

        Admin.beforeCreate(user => {
            user.id = uuidv4();
            beforeCU(user);
        });

        Admin.beforeUpdate(beforeCU);

    }

    validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}
export const sequelize = new Sequelize(DB_NAME,DB_USER, DB_PWD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    dialectOptions: { multipleStatements: true },
    logging: false,
});
