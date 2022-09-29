const fs = require('fs');

class Tablero {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.mensajes = [];
    }
    
    async saveOnFile(){
        try {
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(this.mensajes, null, 2), 'utf-8');
          } catch (err) {
            console.log("Error al intentar escribir en el archivo");
            console.log(err);
          }
    }
    
    async readFile(){
        try {
            const data = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
            this.mensajes = JSON.parse(data);
          } catch (err) {
            console.log("Error al intentar leer en el archivo");
            console.log(err);
          }
    }
    
    async save(nuevoMensaje){
        this.mensajes.push(nuevoMensaje);
        await this.saveOnFile();
    }

    getAll(){
        return this.mensajes;
    }

}

module.exports = Tablero;