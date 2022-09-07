const express = require('express');
//import Contenedor from "./Contenedor.js";
const app = express();

const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
    
    async saveOnFile(listadoProductos){
        try {
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(listadoProductos, null, 2), 'utf-8');
          } catch (err) {
            console.log("Error al intentar escribir en el archivo");
            console.log(err);
          }
    }
    
    async save(nuevoProducto){
        const listado = await this.getAll();
        let ultimoId = 0;
        if (listado.length > 0){
            listado.forEach(elemento => {
                if(elemento.id > ultimoId){
                    ultimoId = elemento.id;
                }
            });
        }
        nuevoProducto.id = ultimoId + 1;
        listado.push(nuevoProducto);
        await this.saveOnFile(listado);
        return nuevoProducto.id;
    }

    async getAll(){
        try{
            const data = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
            if(data === "" || data === "[]"){
                console.log("Leí algo vacio");
                return [];
            }
            else {
                return JSON.parse(data);
            }
        }catch (err){
            //En caso que no se encontró el archivo
            console.log(err);
            return [];
        }
    }

    async getById(idBuscado){
        const listado = await this.getAll();
        const productoBuscado = listado.filter((producto) => producto.id === idBuscado);
        if(productoBuscado.length > 0){
            console.log(productoBuscado[0]);
            return productoBuscado[0];
        }
        else {
            console.log("Producto no encontrado");
            return null;
        }
    }

    async deleteById(idAEliminar){
        const listado = await this.getAll();
        const listadoFiltrado = listado.filter((producto) => producto.id !== idAEliminar);
        await this.saveOnFile(listadoFiltrado);
    }
    
    async deleteAll(){
        await this.saveOnFile("[]");
    }
}


const PORT = 8080;
const server = app.listen(PORT, () => {
 console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});


const inventario = new Contenedor("productos.txt");
app.get('/productos', async (req, res) => {
    const productos = await inventario.getAll();
    res.send(productos)
});
app.get('/productoRandom', async (req, res) => {
    const productos = await inventario.getAll();
    var productoRandom = productos[Math.floor(Math.random()*productos.length)];
    res.send(productoRandom)
});

   