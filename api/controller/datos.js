//import datos from '../model/ArchivosDeSistema/ArchivosDeSistema/data.json' assert {type: "json"}
import {Dato} from "../model/ArchivosDeSistema/mongoDB/dato.js"
//const datos = [];

export const datosController = {
     // Obtiene todos los datos
     async getAll(req, res)
     {
        const datoCollection = await Dato.find();
        datoCollection
        ? res
            .status(200)
            .json ({ success : true, message : "Lista de datos", data: datoCollection})
        : res
            .status(404)
            .json ({ success : false, message : "Lista de datos"});
     },

    // Obtiene el dato por titulo
    async getByTitle(req, res) 
    {
        const {title} = req.query;
        console.log ( title);
        if (!title)
            res
                .status(400)
                .json({ sucess: false, message: 'error'});
        try 
        {
            const datos = await Dato.find({ title : { $regex: title, $options: "i"}});

            if (!datos.length)
            {
                return res.status(404).json(
                    {
                        sucess: false,
                        message: `No hay datos ${title}`,
                    }
                );
            }

            return res.status(200).json({
                sucess:true,
                message: "Datos por title",
                data: datos,
            });
        } 
        catch(err)
        {
            return res
            .status(500)
            .json({ success:false, message : `Internal Error : ${err.message}`});
        }
    },

    // Crea un dato
    async createOne(req, res)
    {
        const { albumId, title, url, thumbnailUrl, year, enabled} = req.body;
        const newDato = new Dato({
            albumId, 
            title, 
            url, 
            thumbnailUrl, 
            year, 
            enabled,
        });

        try
        {
            const savedDato = await newDato.save();
            res.status(200).json({success: true, message: "Se guardo el dato correctamente.", data : savedDato});
        } 
        catch(err)
        {
            res
            .status(400)
            .json({success: false, message : err.message})
        }
    },

    // Modifica un dato
    async updateDato(req, res)
    {
        const allowedFields = [
            "albumId", 
            "title", 
            "url", 
            "thumbnailUrl", 
            "year", 
            "enabled",
        ];

        try
        {
            const updates = Object.keys(req.body);
            const isValidOperation = updates.every((update) =>
                allowedFields.includes(update)
            );
            if (!isValidOperation) 
            {
                return res.status(400).json({
                  success: false,
                  message: "Campo invalido en el cuerpo del requerimiento. Operacion aborteda.",
                });
            }

            const dato = await Dato.findByIdAndUpdate(req.params.id, req.body, {new:true,} );
            if (!dato)
            {
                return res.status(404).json({
                    success: false, 
                    message : `Dato no encontrado`,
                });
            }
            res
                .status(200)
                .json({success: true, message : `Dato modificado`, data:dato});
        }
        catch(error)
        {
            res.status(500).json({
                success: false, 
                message : `Internal Server Error ${error.message}`,
            })
        }
    },

    // Borra un dato
    async deleteOne(req, res)
    {
        try
        {
            console.log(req.params.id);
            const dato = await Dato.findByIdAndDelete(req.params.id);
            if (!dato) 
            {
                return res.status(404).json(
                {
                  success: false,
                  message: `Dato no encontrado`,
                });
            }
            res.send(204);
        } 
        catch(err)
        {
            res.status(500).json({ success: false, message: err.message });
        }
    }
};