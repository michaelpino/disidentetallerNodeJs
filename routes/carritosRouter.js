import express from "express";
import Carrito from "../clases/Carrito.js";

const router = express.Router();

const carrito = new Carrito();

router.post("/", (req, res) => {
	const carritoCreado = carrito.crearCarrito();
	res.send(carritoCreado);
});

router.delete("/:id", (req, res) => {
	const listaActual = carrito.borrar(req.params.id);
	res.send(listaActual);
});

router.delete("/:id/productos/:idPrd", (req, res) => {
	const listaActual = carrito.borrarProducto(req.params.id, req.params.idPrd);
	res.send(listaActual);
});

router.get("/", (req, res) => {
	const listaCarritos = carrito.listado();
	res.send(listaCarritos);
});

router.get("/:id/productos", (req, res) => {
	const productosDeCarrito = carrito.buscarProductos(req.params.id);
	res.send(productosDeCarrito);
});

router.post("/:id/productos/:idPrd", (req, res) => {
	const respuesta = carrito.guardarProductoEnCarrito(
		req.params.idPrd,
		req.params.id
	);
	res.send(respuesta);
});
export default router;
