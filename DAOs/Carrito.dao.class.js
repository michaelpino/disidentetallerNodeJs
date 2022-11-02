import mongoose from "mongoose";

export default class Carrito {
	constructor() {
		this.producto = new Producto();
		this.carritos = [];
		this.idContador = 1;
		this.leidaDb = false;
	}

	buscarProductos(id) {
		this.leerArchivo();
		let carritoBuscado = this.carritos.find((carrito) => carrito.id == parseInt(id));
		return carritoBuscado.productos || { error: "Carrito no encontrado" };
	}

	listado() {
		this.leerArchivo();
		return this.carritos.length
			? this.carritos
			: { error: "No hay carritos cargados" };
	}

	crearCarrito() {
		this.leerArchivo();
		const nuevoCarrito = {
			id: this.idContador++,
			timeStamp: Date.now(),
			productos: [] };
		this.carritos.push(nuevoCarrito);
		this.guardarArchivo();
		return nuevoCarrito;
	}

	guardarProductoEnCarrito(idProd, idCarrito) {
		this.leerArchivo();
		const producto = this.producto.buscar(idProd);
		this.carritos.forEach((carro) => {
			carro.id == idCarrito ? carro.productos.push(producto) : null;
		});
		this.guardarArchivo();
		return this.carritos;
	}

	borrar(idAEliminar) {
		this.leerArchivo();
		const listadoFiltrado = this.carritos.filter((carrito) => carrito.id !== parseInt(idAEliminar));
        this.carritos = [...listadoFiltrado];
		this.guardarArchivo();
		return this.carritos;
	}

	borrarProducto(idCarrito, idProducto) {
		this.leerArchivo();
		const listadoFiltrado = this.carritos.map((carrito) => {
			if(carrito.id === parseInt(idCarrito)){
				const productosAct = carrito.productos.filter((producto) => producto.id !== parseInt(idProducto));
				carrito.productos = [...productosAct];
				return carrito;
			}
			return carrito;
		});
        this.carritos = [...listadoFiltrado];
		this.guardarArchivo();
		return this.carritos;
	}

	guardarArchivo() {
		try {
			fs.writeFileSync("./listado_carritos.txt", JSON.stringify(this.carritos, null, 2), 'utf-8');
		} catch (error) {
		  	console.error(`Error tratando de guardar el archivo: ${error.message}`);
		}
	}

	leerArchivo(){
		if (!this.leidaDb) {
			try{
				const data = fs.readFileSync("./listado_carritos.txt", 'utf-8');
				if(data === "" || data === "[]"){
					console.log("Leí algo vacio");
					this.carritos = [];
				}
				else {
					this.carritos = JSON.parse(data);
					this.carritos.forEach( carr => {
						if (carr.id > this.idContador){
							this.idContador = carr.id;
						}
					})
				}
			}catch (error){
				console.error(`Error tratando de leer el archivo: ${error.message}`);
				//En caso de que hay error de lectura asignaré la variable como que no tiene carritos
				this.carritos = [];
			}
			this.leidaDb = true;
		}
	}
}
