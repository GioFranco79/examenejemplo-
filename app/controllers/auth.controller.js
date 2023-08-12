import { request, response } from "express";
import { generateJWT } from "../config/auth.config.js";

const loginUser = async (req = request, res = response) => {    
    const { email, password } = req.body;
    if(email != process.env.USERMAIL){
        return res.json({
            msg: 'El correo o contraseña son inválidos.'
        });
    }        
    if(password != process.env.USERPASSWORD){
        return res.json({
            msg: 'El correo o contraseña son inválidos.'
        });
    } 
    const token = await generateJWT(process.env.USERID);
    res.json({
        msg: 'Login funcionando',
        token
    });
}

export {
    loginUser
}