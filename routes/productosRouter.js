import express from "express";
import Producto from "../DAOs/Producto.dao.class.js";

const router = express.Router();

const producto = new Producto();

function validarAcceso(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send({error:"ERROR 403: Acceso no autorizado!"});
	}
}

router.post("/", validarAcceso, async (req, res) => {
	const respuesta = await producto.guardar(req.body);
	res.send(respuesta);
});

router.delete("/:id",validarAcceso, async (req, res) => {
	const productoBorrado = await producto.borrar(req.params.id);
	res.send(productoBorrado);
});

router.get("/", async (req, res) => {
	const listaProductos = await producto.listado();
	res.send(listaProductos);
});

router.get("/:id", async (req, res) => {
	const productoBuscado = await producto.buscar(req.params.id);
	res.send(productoBuscado);
});

router.put("/:id",validarAcceso, async (req, res) => {
	const listaActual = await producto.actualizar(req.params.id, req.body);
	res.send(listaActual);
});

export default router;
