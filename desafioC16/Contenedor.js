class Contenedor {
    constructor(tabla, config) {
        this.knex = require("knex")(config);
        this.tabla = tabla;
    }
    
    async save(nuevoProducto){
        try {
            await this.knex(this.tabla).insert(nuevoProducto),
            console.log("Nuevo producto agregado a DB!");
        } catch(error) {
            throw new Error(error);
        }
    }

    async getAll(){
        try {
            let datosDB = await this.knex.from(this.tabla).select("*");
            return datosDB;
        } catch(error) {
            throw new Error(error);
        } 
    }

    async update(idAModificar, datosAActualizar){
        try {
            await this.knex(this.tabla).where("id",idAModificar).update(datosAActualizar);
            console.log("Datos de producto actualizados!");
        } catch(error) {
            throw new Error(error);
        } 
    }

    async getById(idBuscado){
        try {
            let productoBuscado = await this.knex.from(this.tabla).select("*").where("id",idBuscado);
            return productoBuscado;
        } catch(error) {
            throw new Error(error);
        } 
    }

    async deleteById(idAEliminar){
        try {
            await this.knex(this.tabla).where("id",idAEliminar).del();
            console.log("El producto ha sido eliminado!");
        } catch(error) {
            throw new Error(error);
        } 
    }
    
    async deleteAll(){
        try {
            await this.knex(this.tabla).del();
            console.log("Todos los productos han sido eliminados!");
        } catch(error) {
            throw new Error(error);
        } 
    }
}

module.exports = Contenedor;