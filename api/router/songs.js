import { Router } from 'express';
export const router = Router();
import { songsController } from '../controller/songs.js';
import { token } from "../services/jwt.js";

// No validadas por tocken
router.get("/",  songsController.getAll);
router.get("/s", songsController.getByTitle);

// Validadas por token
router.post("/", token.validate, songsController.createOne);
router.patch("/:id", token.validate, songsController.updateSong);
router.delete("/:id",  token.validate,songsController.deleteOne);

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



