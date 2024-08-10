import mongoose from "mongoose";
export const {ObjectId } = mongoose.Types;
const currentYear = new Date().getUTCFullYear();

const datosSchema = mongoose.Schema(
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
            min: [1900, "No puede ser menor"],
            max: [currentYear, `No puede ecceder ${currentYear}`],
        },
        enabled :{
            type : Number,
            default : 0,
        },
    },
    {timestamp: true}
);
datosSchema.set("toJSON", {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });
//datosSchema.index({title: "text"});
export const Dato = mongoose.model("Dato", datosSchema);



