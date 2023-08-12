import { request, response } from "express";
import { Op } from "sequelize";
import { Department } from "../models/department.model.js";
import { Employeedepartmenthistory } from "../models/employeedepartmenthistory.model.js";

const findAll = async (req = request, res = response) => {
    try {
        const arrayDepartment = await Employeedepartmenthistory.findAll({
            include: Department
        });
        res.status(200).json(arrayDepartment);
    } catch (error) {
        console.log(error.name, error.message);
        res.status(500).json({
            message: error.message,
            code: 500,
            name: error.name,
            pmessage: 'Error en el servidor, findAll Department'
        });
    }
}

const findFilter = async (req = request, res = response) => {
    const { start = '1900-01-01', end = '2200-12-31', ...data } = req.body;
    const keys = Object.keys(data);
    const values = Object.values(data);
    const criteria = { };
    for (let i = 0; i < values.length; i++) {
        if (values[i] !== null && values[i] !== undefined && values[i] !== '') {
            criteria[keys[i]] = values[i];
        }
    }
    try {
        const arraydepartment = await Employeedepartmenthistory.findAll({
            include: [{
                model: Department,
                where: criteria 
            }],            
            where: {
                startdate: {
                    [Op.between]: [start, end]
                }
            }
        });
        res.status(200).json(arraydepartment);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
}

export {
    findAll,
    findFilter    
}