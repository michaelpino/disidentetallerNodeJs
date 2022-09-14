const express = require('express');
//import Contenedor from "./Contenedor.js";
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());


class Contenedor {
    constructor() {
        this.productos = [];
    }
    
    save(nuevoProducto){
        nuevoProducto.id = this.productos.length + 1;
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
            return { error : 'producto no encontrado' };
        }
    }

    getById(idBuscado){
        const productoBuscado = this.productos.filter((producto) => producto.id === idBuscado);
        if(productoBuscado.length > 0){
            console.log(productoBuscado[0]);
            return productoBuscado[0];
        }
        else {
            console.log("Producto no encontrado");
            return { error : 'producto no encontrado' };
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


const PORT = 8080;
const server = app.listen(PORT, () => {
 console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

let inventario = new Contenedor("productos.txt");

app.use(express.static("public"));

const routerProductos = express.Router();




routerProductos.get('/', (req, res) => {
    const productos = inventario.getAll();
    res.send(productos)
});

routerProductos.get('/:id', (req, res) => {
    const productoBuscado = inventario.getById(parseInt(req.params.id));
    res.send(productoBuscado);
});

routerProductos.post('/', (req, res) => {
    const idAsignado = inventario.save(req.body);
    req.body.id = idAsignado;
    res.send(req.body);
});

routerProductos.delete('/:id', (req, res) => {
    inventario.deleteById(parseInt(req.params.id));
    res.send(`Producto con ID ${parseInt(req.params.id)} fue eliminado`);
});

routerProductos.put('/:id', (req, res) => {
    inventario.update(parseInt(req.params.id),req.body);
    res.send(inventario.getById(parseInt(req.params.id)));
});

routerProductos.get('/productoRandom', (req, res) => {
    const productos = inventario.getAll();
    let productoRandom = productos[Math.floor(Math.random()*productos.length)];
    res.send(productoRandom)
});

app.use("/api/productos/", routerProductos);   