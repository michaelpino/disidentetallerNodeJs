import mongoose from "mongoose";
import ProductoModel from "../models/ProductosModel.js";

export default class Producto {

	constructor() {
		this.url = "mongodb+srv://the_nemesis:h0opnodmmd7VNPVV@nodejscoder.ivotase.mongodb.net/proyectoFinal?retryWrites=true&w=majority";
		this.mongodb = mongoose.connect;
		// this.idContador = 0 ;
		// this.productos = [];
		// this.leidaDb = false;
	}

	async listado() {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.find();
		} catch (err){
			console.log(err);
		}
		// this.leerArchivo();
		// return this.productos.length
		// 	? this.productos
		// 	: { error: "No hay productos cargados" };
	}

	async buscar(idBuscado) {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.findById(idBuscado);
		} catch (err){
			console.log(err);
		}
		// this.leerArchivo();
		// const productoBuscado = this.productos.filter((producto) => producto.id === parseInt(idBuscado));
		// return productoBuscado[0] || { error: `ID "${id}" no encontrado` };
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
		// nuevoProducto.id = this.idContador + 1;
		// this.idContador++;
		// nuevoProducto.timeStamp = Date.now();
		// this.productos.push(nuevoProducto);
		// this.guardarArchivo();
		// return nuevoProducto;
	}

	// guardarArchivo() {
	// 	try {
	// 		fs.writeFileSync("./listado_productos.txt", JSON.stringify(this.productos, null, 2), 'utf-8');
	// 	} catch (error) {
	// 	  	console.error(`Error tratando de guardar el archivo: ${error.message}`);
	// 	}
	// }

	// leerArchivo(){
	// 	if (!this.leidaDb) {
	// 		try{
	// 			const data = fs.readFileSync("./listado_productos.txt", 'utf-8');
	// 			if(data === "" || data === "[]"){
	// 				console.log("Leí algo vacio");
	// 				this.productos = [];
	// 			}
	// 			else {
	// 				this.productos = JSON.parse(data);
	// 				this.productos.forEach( producto => {
	// 					if (producto.id > this.idContador){
	// 						this.idContador = producto.id;
	// 					}
	// 				})
	// 			}
	// 		}catch (error){
	// 			console.error(`Error tratando de leer el archivo: ${error.message}`);
	// 			//En caso de que hay error de lectura asignaré la variable como que no tiene productos
	// 			this.productos = [];
	// 		}
	// 		this.leidaDb = true;
	// 	}
	// }

	async actualizar(idAActualizar, productoAct) {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.findByIdAndUpdate(idAActualizar, productoAct);
		} catch (err){
			console.log(err);
		}
		
		// this.leerArchivo();
		// productoAct.id = parseInt(idAActualizar);
		// productoAct.timeStamp = Date.now();
		// const nuevoProductos = this.productos.map((producto) => {
		// 	if (productoAct.id === producto.id) {
		// 		return productoAct;
		// 	}
		// 	else{
		// 		return producto;
		// 	}
		// });
		// this.productos = [...nuevoProductos];
		// this.guardarArchivo();
	}

	async borrar(idAEliminar) {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.findByIdAndDelete(idAEliminar);
		} catch (err){
			console.log(err);
		}

		// this.leerArchivo();
		// const listadoFiltrado = this.productos.filter((producto) => producto.id !== parseInt(idAEliminar));
        // this.productos = [...listadoFiltrado];
		// this.guardarArchivo();
		// return this.productos;
	}
}
