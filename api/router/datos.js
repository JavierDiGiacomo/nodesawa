import { Router } from 'express';
export const router = Router();
import { datosController } from '../controller/datos.js';
import { token } from "../services/jwt.js";

router.get("/", token.validate, datosController.getAll);

router.get("/s", datosController.getByTitle);

router.post("/", datosController.createOne);
router.patch("/:id", datosController.updateDato);

router.delete("/:id",  datosController.deleteOne);

//router.get("/", (req, res) => {
//    res.send(libros)
//});

//router.get("/s", (req, res) => {
//    const {title} = req.query;
//    res.send(`Parametro por s : ${title}`)
//});

//router.get("/:id", (req, res) => {
//    const {id} = req.params;
//    res.send(`Lista por id : ${id}`)
//});



//router.patch("/:id", (req, res) => {
//    const {id} = req.params;
//    res.send(`Modifica un dato existente por id : ${id}`)}
//);



