import express from "express";
import Producto from "../clases/Producto.js";

const router = express.Router();

const producto = new Producto();

function validarAcceso(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send({error:"Acceso no autorizado!"});
	}
}

router.post("/", validarAcceso, (req, res) => {
	const productoCreado = producto.guardar(req.body);
	res.send(productoCreado);
});

router.delete("/:id",validarAcceso, (req, res) => {
	const listaActual = producto.borrar(req.params.id);
	res.send(listaActual);
});

router.get("/", (req, res) => {
	const listaProductos = producto.listado();
	res.send(listaProductos);
});

router.get("/:id", (req, res) => {
	const productoBuscado = producto.buscar(req.params.id);
	res.send(productoBuscado);
});

router.put("/:id",validarAcceso, (req, res) => {
	const listaActual = producto.actualizar(req.body, req.params.id);
	res.send(listaActual);
});

export default router;
