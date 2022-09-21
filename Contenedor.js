class Contenedor {
    constructor() {
        this.productos = [];
    }
    
    save(nuevoProducto){
        if(this.productos.length === 0){
            nuevoProducto.id = 1;
        }
        else {
            nuevoProducto.id = this.productos[this.productos.length - 1].id + 1;
        }
        this.productos.push(nuevoProducto);
        return nuevoProducto.id;
    }

    getAll(){
        return this.productos;
    }

    update(id, datosAActualizar){
        let productoNoEncontrado = true;
        let nuevoListado = this.productos.map((producto) => {
            if (producto.id === id){
                producto.title = datosAActualizar.title;
                producto.price = datosAActualizar.price;
                producto.thumbnail = datosAActualizar.thumbnail;
                productoNoEncontrado = false;
            }
            return producto;
        });
        this.productos = [...nuevoListado];
        if (productoNoEncontrado){
            return { error : 'ERROR 404: producto no encontrado' };
        }
    }

    getById(idBuscado){
        const productoBuscado = this.productos.filter((producto) => producto.id === idBuscado);
        if(productoBuscado.length > 0){
            return productoBuscado[0];
        }
        else {
            return { error : 'ERROR 404: producto no encontrado' };
        }
    }

    deleteById(idAEliminar){
        const listadoFiltrado = this.productos.filter((producto) => producto.id !== idAEliminar);
        this.productos = [...listadoFiltrado];
    }
    
    deleteAll(){
        this.productos = [];
    }
}

module.exports = Contenedor;