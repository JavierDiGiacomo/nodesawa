//import datos from '../model/ArchivosDeSistema/ArchivosDeSistema/data.json' assert {type: "json"}
import {Song} from "../model/ArchivosDeSistema/mongoDB/song.js"

export const songsController = {
     // Obtiene todos los datos
     async getAll(req, res)
     {
        const songCollection = await Song.find();
        songCollection
        ? res
            .status(200)
            .json ({ success : true, message : "Lista de canciones", data: songCollection})
        : res
            .status(404)
            .json ({ success : false, message : "Lista de canciones vacia"});
     },

    // Obtiene el dato por titulo
    async getByTitle(req, res) 
    {
        const {title} = req.query;
        if (!title)
            res
                .status(400)
                .json({ sucess: false, message: 'Campo titulo inexistente'});
        try 
        {
            const songs = await Song.find({ title : { $regex: title, $options: "i"}});

            if (!songs.length)
            {
                return res.status(404).json(
                    {
                        sucess: false,
                        message: `No hay canciones ${title}`,
                    }
                );
            }

            return res.status(200).json({
                sucess:true,
                message: "Canciones por title",
                data: songs,
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
        const newSong = new Song({
            albumId, 
            title, 
            url, 
            thumbnailUrl, 
            year, 
            enabled,
        });

        try
        {
            const savedSong = await newSong.save();
            res.status(200).json({success: true, message: "Se guardo la cancion correctamente.", data : savedSong});
        } 
        catch(err)
        {
            res
                .status(400)
                .json({success: false, message : err.message})
        }
    },

    // Modifica un dato
    async updateSong(req, res)
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
                  message: "Campo invalido en el cuerpo del requerimiento. Operacion abortada.",
                });
            }

            const song = await Song.findByIdAndUpdate(req.params.id, req.body, {new:true,} );
            if (!song)
            {
                return res.status(404).json({
                    success: false, 
                    message : `Cancion no encontrada`,
                });
            }
            res
                .status(200)
                .json({success: true, message : `Cancion modificada`, data:song});
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
            const song = await Song.findByIdAndDelete(req.params.id);
            if (!song) 
            {
                return res.status(404).json(
                {
                  success: false,
                  message: `Cancion no encontrada`,
                });
            }
            res.send(204);
        } 
        catch(err)
        {
            res.status(500).json({ 
                success: false, 
                message: err.message 
            });
        }
    }
};