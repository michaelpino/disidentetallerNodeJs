import { Schema, model } from "mongoose" 

const UsuarioSchema = new Schema({
	email: { type: String, required: true,  unique: true },
	password: { type: String, required: true },
});

export default model("Usuarios", UsuarioSchema);