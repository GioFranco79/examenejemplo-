import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Employeedepartmenthistory = sequelize.define('Employeedepartmenthistory', {
    employeedepartmenthistoryid: {
        type: DataTypes.INTEGER,
        primaryKey: true,        
    },
    businessentityid:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Por favor debe ingresar un id de business.'
            }
        }
    },
    departmentid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Por favor debe ingresar un id de departamento.'
            }     
        }
    },
    shiftid: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Por favor debe ingresar un id de shift.'
            }     
        }
    },
    startdate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Por favor debe ingresar una fecha de inicio.'
            }     
        }
    },
    enddate: {
        type: DataTypes.DATE
    },
    modifieddate: {
        type: DataTypes.DATE        
    }
},{
    tableName: 'employeedepartmenthistory',
    timestamps: false
});

export {
    Employeedepartmenthistory
}    

//await sequelize.sync({ force: true, alter: true });