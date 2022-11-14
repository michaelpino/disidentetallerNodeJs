import express from "express";
import Carrito from "../DAOs/Carrito.dao.class.js";

const router = express.Router();

const carrito = new Carrito();

router.post("/", async (req, res) => {
	const carritoCreado = await carrito.crearCarrito();
	res.send(carritoCreado);
});

router.delete("/:id", async (req, res) => {
	const listaActual = await carrito.borrar(req.params.id);
	res.send(listaActual);
});

router.delete("/:id/productos/:idPrd", async (req, res) => {
	const listaActual = await carrito.borrarProducto(req.params.id, req.params.idPrd);
	res.send(listaActual);
});

router.get("/", async (req, res) => {
	const listaCarritos = await carrito.listado();
	res.send(listaCarritos);
});

router.get("/:id/productos", async (req, res) => {
	const productosDeCarrito = await carrito.listadoProductos(req.params.id);
	res.send(productosDeCarrito);
});

router.post("/:id/productos/:idPrd", async (req, res) => {
	const respuesta = await carrito.guardarProductoEnCarrito(
		req.params.idPrd,
		req.params.id
	);
	res.send(respuesta);
});
export default router;
