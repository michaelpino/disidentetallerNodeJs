import mongoose from "mongoose";
import ProductoModel from "../models/ProductosModel.js";

export default class Producto {

	constructor() {
		this.url = "mongodb+srv://the_nemesis:h0opnodmmd7VNPVV@nodejscoder.ivotase.mongodb.net/proyectoFinal?retryWrites=true&w=majority";
		this.mongodb = mongoose.connect;
	}

	async listado() {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.find();
		} catch (err){
			console.log(err);
		}
	}

	async buscar(idBuscado) {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.findById(idBuscado);
		} catch (err){
			console.log(err);
		}
	}

	async guardar(nuevoProducto) {
		try {
			await this.mongodb(this.url);
			nuevoProducto.timeStamp = Date.now();
			const newProduct = new ProductoModel(nuevoProducto);
			return await newProduct.save();
		} catch (err){
			console.log(err);
		}
	}

	async actualizar(idAActualizar, productoAct) {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.findByIdAndUpdate(idAActualizar, productoAct);
		} catch (err){
			console.log(err);
		}
	}

	async borrar(idAEliminar) {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.findByIdAndDelete(idAEliminar);
		} catch (err){
			console.log(err);
		}
	}
}
