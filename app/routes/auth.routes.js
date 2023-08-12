import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from '../middlewares/validateFields.js';
import { loginUser } from "../controllers/auth.controller.js";

const routerAuth = Router();

routerAuth.post('/signin', [
    check('email', 'El correo es inválido').isEmail(),
    check('password', 'Requiere al menos 8 caracteres').isLength({min: 6}),    
    validateFields
], loginUser);

export{
    routerAuth
}