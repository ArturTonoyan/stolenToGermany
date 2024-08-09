import { Sequelize, DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

const { DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_NAME } = process.env;



export default class Ostarbeiter extends Model {
    static initialize(sequelize) {
        Ostarbeiter.init(
            {
                id: { type: DataTypes.UUID, primaryKey: true },
                fio: {type: DataTypes.STRING, allowNull: false } ,
                date: { type: DataTypes.DATE, allowNull: true },
                placeBirthday: { type: DataTypes.STRING, allowNull: true },
                partyMembership: {type: DataTypes.STRING, allowNull: true},
                nationality:{type: DataTypes.STRING, allowNull: true},
                profession: {type: DataTypes.STRING, allowNull: true},
                departure: {type: DataTypes.STRING, allowNull: true},
                arrival: {type: DataTypes.STRING, allowNull: true},
                filtrationPoint: {type: DataTypes.STRING, allowNull: true},
                address: {type: DataTypes.STRING, allowNull: true},
                footnote: {type: DataTypes.STRING, allowNull: true},
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
