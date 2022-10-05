import fs from "fs";

export default class Producto {

	constructor() {
		this.idContador = 0 ;
		this.productos = [];
		this.leidaDb = false;
	}

	listado() {
		this.leerArchivo();
		return this.productos.length
			? this.productos
			: { error: "No hay productos cargados" };
	}

	buscar(idBuscado) {
		this.leerArchivo();
		const productoBuscado = this.productos.filter((producto) => producto.id === parseInt(idBuscado));
		return productoBuscado[0] || { error: `ID "${id}" no encontrado` };
	}

	guardar(nuevoProducto) {
		nuevoProducto.id = this.idContador + 1;
		this.idContador++;
		nuevoProducto.timeStamp = Date.now();
		this.productos.push(nuevoProducto);
		this.guardarArchivo();
		return nuevoProducto;
	}

	guardarArchivo() {
		try {
			fs.writeFileSync("./listado_productos.txt", JSON.stringify(this.productos, null, 2), 'utf-8');
		} catch (error) {
		  	console.error(`Error tratando de guardar el archivo: ${error.message}`);
		}
	}

	leerArchivo(){
		if (!this.leidaDb) {
			try{
				const data = fs.readFileSync("./listado_productos.txt", 'utf-8');
				if(data === "" || data === "[]"){
					console.log("Leí algo vacio");
					this.productos = [];
				}
				else {
					this.productos = JSON.parse(data);
					this.productos.forEach( producto => {
						if (producto.id > this.idContador){
							this.idContador = producto.id;
						}
					})
				}
			}catch (error){
				console.error(`Error tratando de leer el archivo: ${error.message}`);
				//En caso de que hay error de lectura asignaré la variable como que no tiene productos
				this.productos = [];
			}
			this.leidaDb = true;
		}
	}

	actualizar(productoAct, idAActualizar) {
		this.leerArchivo();
		productoAct.id = parseInt(idAActualizar);
		productoAct.timeStamp = Date.now();
		const nuevoProductos = this.productos.map((producto) => {
			if (productoAct.id === producto.id) {
				return productoAct;
			}
			else{
				return producto;
			}
		});
		this.productos = [...nuevoProductos];
		this.guardarArchivo();
	}

	borrar(idAEliminar) {
		this.leerArchivo();
		const listadoFiltrado = this.productos.filter((producto) => producto.id !== parseInt(idAEliminar));
        this.productos = [...listadoFiltrado];
		this.guardarArchivo();
		return this.productos;
	}
}
