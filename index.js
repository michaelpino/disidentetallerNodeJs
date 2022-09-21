const express = require('express');
const handlebars = require("express-handlebars");
const Contenedor = require("./Contenedor.js");
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const PORT = 8080;
const server = app.listen(PORT, () => {
 console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

let inventario = new Contenedor("productos.txt");

//CONFIGURACIÓN DE HANDLEBARS
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");
 

app.use(express.static("public"));

const routerProductos = express.Router();

routerProductos.get('/vista', (req, res) => {
    const productos = inventario.getAll();
    let hayProductos = false;
    if (productos.length > 0){
        hayProductos = true;
    }
    
    res.render("vista", {
        productos: productos,
        mostrarProductos: hayProductos,
    });
});

routerProductos.get('/', (req, res) => {
    const productos = inventario.getAll();
    res.json(productos)
});

routerProductos.get('/:id', (req, res) => {
    const productoBuscado = inventario.getById(parseInt(req.params.id));
    res.json(productoBuscado);
});

routerProductos.post('/', (req, res) => {
    const idAsignado = inventario.save(req.body);
    const {title, price, thumbnail} = req.body;
    res.json({id: idAsignado, title: title, price: price, thumbnail:thumbnail});
});

routerProductos.delete('/:id', (req, res) => {
    inventario.deleteById(parseInt(req.params.id));
    res.json(`Producto con ID ${parseInt(req.params.id)} fue eliminado`);
});

routerProductos.put('/:id', (req, res) => {
    inventario.update(parseInt(req.params.id),req.body);
    res.json(inventario.getById(parseInt(req.params.id)));
});

routerProductos.get('/productoRandom', (req, res) => {
    const productos = inventario.getAll();
    let productoRandom = productos[Math.floor(Math.random()*productos.length)];
    res.json(productoRandom)
});




app.use("/api/productos/", routerProductos);   