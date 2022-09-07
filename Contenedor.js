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

// let contenedor = new Contenedor("productos.txt");

// //COMANDOS DE PRUEBA

// //Agregando productos (DESCOMENTAR PARA VERIFICAR)
// contenedor.save({
//     title: 'Regla',
//     price: 123.45,
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'});

//Obteniendo el objeto 2 del listado guardado (DESCOMENTAR PARA VERIFICAR)
//console.log(contenedor.getById(2));

//Eliminando el objeto 2 del listado guardado (DESCOMENTAR PARA VERIFICAR)
//contenedor.deleteById(2);

//Eliminando todos los objetos del listado guardado (DESCOMENTAR PARA VERIFICAR)
//contenedor.deleteAll();
