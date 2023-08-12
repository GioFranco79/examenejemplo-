import { request, response } from "express";
import jwt from 'jsonwebtoken';

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('Authorization');
    // validar existencia del token
    if (!token) {
        return res.status(401).json({
            msg: 'No cuentas con acceso a este recurso'
        });
    }
    // validar que el token sea válido
    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY);
        const userAuth = {
            id: uid,
            email: process.env.USERMAIL,
            password: process.env.USERPASSWORD
        };
        req.userAuth = userAuth;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'No cuentas con acceso a este recurso'
        });
    }
}

export {
    validateJWT
}