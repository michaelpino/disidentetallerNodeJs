import mongoose from "mongoose";

const mensajeSchema = new mongoose.Schema({
    author: {
        id: { type: String},
        nombre: { type: String},
        apellido: { type: String},
        edad: { type: Number},
        alias: { type: String},
        avatar: { type: String},
    },
    text: { type: String}
})

const MensajeModel = mongoose.model("mensajes", productoSchema);
export default MensajeModel;