import mongoose from "mongoose";
export const {ObjectId } = mongoose.Types;
const currentYear = new Date().getUTCFullYear();

const songsSchema = mongoose.Schema(
    {
        albumId : {
            type: Number,
            required: true,
        },
        title: {
            type : String,
            required: true,
            trim:true,
        },
        url: {
            type : String,
            required: true,
            trim:true,
        },
        thumbnailUrl: {
            type : String,
            required: true,
            trim:true,
        },
        year:{
            type : Number,
            required: true,
            min: [1900, "No puede ser menor a 1900"],
            max: [currentYear, `No puede ser mayor de ${currentYear}`],
        },
        enabled :{
            type : Number,
            default : 0,
        },
    },
    {timestamp: true}
);
songsSchema.set("toJSON", {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });
//datosSchema.index({title: "text"});
export const Song = mongoose.model("Dato", songsSchema);



