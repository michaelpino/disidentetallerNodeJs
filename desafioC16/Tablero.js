class Tablero {
    constructor(tabla, config) {
        this.knex = require("knex")(config);
        this.tabla = tabla;
    }
    
    async save(nuevoMensaje){
      try {
          await this.knex(this.tabla).insert(nuevoMensaje),
          console.log("Nuevo mensaje agregado a DB!");
      } catch(error) {
          throw new Error(error);
      }
  }

    async getAll(){
      try {
          let datosDB = await this.knex.from(this.tabla).select("*");
          console.log("Mensajes leidos desde DB!");
          return datosDB;
      } catch(error) {
          throw new Error(error);
      } 
  }

}

module.exports = Tablero;