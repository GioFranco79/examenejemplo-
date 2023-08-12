import express from 'express';
import morgan from "morgan";
import cors from 'cors';
import { routerAuth } from '../routes/auth.routes.js';
import { routerDepartment } from '../routes/department.routes.js';

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middleware();
        this.routes();    
    }

    middleware() {
        this.app.use(morgan("tiny"));
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api', routerAuth);        
        this.app.use('/api/department', routerDepartment);        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto: ${this.port}`)
        })
    }
}