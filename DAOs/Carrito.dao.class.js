import mongoose from "mongoose";
import CarritoModel from "../models/CarritosModel.js";
import ProductoModel from "../models/ProductosModel.js";


export default class Carrito {
	constructor() {
		this.url = "mongodb+srv://the_nemesis:h0opnodmmd7VNPVV@nodejscoder.ivotase.mongodb.net/proyectoFinal?retryWrites=true&w=majority";
		this.mongodb = mongoose.connect;
	}

	async buscarCarrito(idBuscado) {
		try {
			await this.mongodb(this.url);
			return await CarritoModel.findById(idBuscado);
		} catch (err){
			console.log(err);
		}
	}

	async listado() {
		try {
			await this.mongodb(this.url);
			return await CarritoModel.find();
		} catch (err){
			console.log(err);
		}
	}

	async listadoProductos(idCarrito) {
		try {
			await this.mongodb(this.url);
			return await CarritoModel.findById(idCarrito).productos;
		} catch (err){
			console.log(err);
		}
	}

	async crearCarrito() {
		try {
			await this.mongodb(this.url);
			const newCart = new CarritoModel();
			return await newCart.save();
		} catch (err){
			console.log(err);
		}
	}

	async guardarProductoEnCarrito(idProd, idCarrito) {
		try {
			await this.mongodb(this.url);
			let carrito = await CarritoModel.findById(idCarrito);
			const producto = await ProductoModel.findById(idProd);
			carrito.productos.push(producto);
			await CarritoModel.findByIdAndUpdate(idCarrito, carrito);
		} catch (err){
			console.log(err);
		}
	}

	
	async borrar(idAEliminar) {
		try {
			await this.mongodb(this.url);
			return await CarritoModel.findByIdAndDelete(idAEliminar);
		} catch (err){
			console.log(err);
		}
	}

	async borrarProducto(idCarrito, idProducto) {
		try {
			await this.mongodb(this.url);
			let carrito = await CarritoModel.findById(idCarrito);
			const carritoFiltrado = carrito.productos.filter((producto) => producto.id !== idProducto);
			carrito.productos = [...carritoFiltrado];
			await CarritoModel.findByIdAndUpdate(idCarrito, carrito);
		} catch (err){
			console.log(err);
		}
	}

}
