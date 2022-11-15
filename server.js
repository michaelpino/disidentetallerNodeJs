import express from "express";
import routerCarrito from "./routes/carritosRouter.js";
import routerProductos from "./routes/productosRouter.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/productos", routerProductos);
app.use("/carritos", routerCarrito);

const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

//Levanto la conexion a MongoDB
const urlDB = "mongodb+srv://the_nemesis:h0opnodmmd7VNPVV@nodejscoder.ivotase.mongodb.net/proyectoFinal?retryWrites=true&w=majority";
const mongodb = mongoose.connect;
mongodb(urlDB);

server.on("error", (error) => console.log(`Error en servidor ${error}`));
