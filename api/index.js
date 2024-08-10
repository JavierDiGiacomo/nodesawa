import express from 'express';
import "dotenv/config";
import "./config/db.js"

const app = express();
app.use(express.urlencoded( {extended : true}));
app.use(express.json());

import {router as datosRouter} from './router/datos.js'; 
import { router as usersRouter } from './router/users.js'; 

const PORT = process.env.PORT ?? 3000

app.listen(PORT, (err)=> {
    console.log(
        err
        ? `Error : ${err.message} ` 
        : `Servidor Ejecutando en puerto http://127.0.0.1:${PORT} \n
    Ctrl + C para salir...`
    );
});

app.use("/api/datos", datosRouter);
app.use("/api/users", usersRouter);
