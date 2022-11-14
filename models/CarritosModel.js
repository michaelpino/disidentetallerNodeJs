import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    productos: [{
        _id: String,
        nombre: String,
        descripcion: String,
        codigo: Number,
        foto: String,
        precio: Number,
        stock: Number,
        timeStamp: String
    }],
    timestamp: String
})

const CarritoModel = mongoose.model("carritos", carritoSchema);
export default CarritoModel;