import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    codigo: Number,
    foto: String,
    precio: Number,
    stock: Number,
    timestamp: String
})

const ProductoModel = mongoose.model("productos", productoSchema);
export default ProductoModel;