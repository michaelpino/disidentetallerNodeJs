import {Router} from "express";
import {fork} from "child_process";

const randomForked = fork("./randomChild.js");

const rutas = Router();

rutas.route("/randoms").get( async(req, res) => {
    const random = req.query.cant || 100000000;
    randomForked.send(random);
    randomForked.on("message", (msg) =>
        { res.end(msg) }
        )
    }
)

export default rutas;