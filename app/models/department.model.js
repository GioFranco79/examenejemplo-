import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import { Employeedepartmenthistory } from "./employeedepartmenthistory.model.js";

const Department = sequelize.define('Department', {
    departmentid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Por favor debe ingresar un nombre.'
            }
        }
    },
    groupname:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Por favor debe ingresar un apellido.'
            }
        }
    },
    modifieddate: {
        type: DataTypes.DATE        
    }

},{
    tableName: 'department',
    timestamps: false
});

Department.hasMany(Employeedepartmenthistory, {
    foreignKey: 'departmentid'
});

Employeedepartmenthistory.belongsTo(Department, {
    foreignKey: 'departmentid'    
});

export {
    Department
}

//await sequelize.sync({ force: true, alter: true });