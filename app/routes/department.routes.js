import { Router } from "express";
import { validateJWT } from '../middlewares/validateJWT.js';
import { findAll, findFilter } from "../controllers/department.controller.js";

const routerDepartment = Router();

/*routerDepartment.get('/', findAll);
routerDepartment.post('/', findFilter);*/

routerDepartment.get('/', [
    validateJWT
], findAll);

routerDepartment.post('/', [
    validateJWT
], findFilter);

export {
    routerDepartment
}