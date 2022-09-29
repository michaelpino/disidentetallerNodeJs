const express = require('express');
const Contenedor = require("./Contenedor.js");
const Tablero = require("./Tablero.js");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const PORT = 8080;

app.use(express.static("public"));

let inventario = new Contenedor();
//AGREGO UNOS PRODUCTOS PARA TENERLOS PREVIAMENTE
inventario.save({title: "Tijeras", price: 15, thumbnail:"https://cdn-icons-png.flaticon.com/512/4697/4697553.png"});
inventario.save({title: "Post-it", price: 2, thumbnail:"https://cdn-icons-png.flaticon.com/512/4697/4697566.png"});
inventario.save({title: "Crayones", price: 12, thumbnail:"https://cdn-icons-png.flaticon.com/512/4697/4697376.png"});

//INICIALIZO EL TABLERO DE MENSAJES CON LOS MENSAJES GUARDADOS
let tablero = new Tablero("mensajes.txt");
tablero.readFile();

io.on("connection", (socket) => {
    console.log("Se conectó un usuario!");

    socket.emit("carga_inventario", inventario.productos);

    socket.emit("carga_chat", tablero.mensajes);

    socket.on("nuevo_producto", (data) => {
        inventario.save(data);
        io.sockets.emit("carga_inventario", inventario.productos);
    });

    socket.on("nuevo_mensaje", (data) => {
        tablero.save(data);
        io.sockets.emit("carga_chat", tablero.mensajes);
    });
})


httpServer.listen(PORT, () => console.log(`Servidor levantado en puerto ${PORT}`));