import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
        id: { type: String},
        nombre: { type: String},
        apellido: { type: String},
        edad: { type: Number},
        alias: { type: String},
        avatar: { type: String},
})

const AuthorModel = mongoose.model("author", authorSchema);
export default AuthorModel;