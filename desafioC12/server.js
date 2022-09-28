const express = require('express');
const handlebars = require("express-handlebars");
const Contenedor = require("./Contenedor.js");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const PORT = 8080;

app.use(express.static("public"));




let inventario = new Contenedor("productos.txt");
//AGREGO UNOS PRODUCTOS PARA TENERLOS PREVIAMENTE
inventario.save({title: "Tijeras", price: 15, thumbnail:"https://cdn-icons-png.flaticon.com/512/4697/4697553.png"});
inventario.save({title: "Post-it", price: 2, thumbnail:"https://cdn-icons-png.flaticon.com/512/4697/4697566.png"});
inventario.save({title: "Crayones", price: 12, thumbnail:"https://cdn-icons-png.flaticon.com/512/4697/4697376.png"});

io.on("connection", (socket) => {
    console.log("Se conectó un usuario!");

    socket.emit("carga_inventario", inventario.productos);
})

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
   });

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