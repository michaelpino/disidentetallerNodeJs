import MensajeModel from "../models/MensajesModel.js";
import {normalize, denormalize, schema} from 'normalizr'

const authorSchemaNmlz = new schema.Entity('authors', {}, { idAttribute: 'email' })
const messageSchemaNmlz = new schema.Entity('message', {
    author: authorSchemaNmlz
})

const myData = {
    messages:[
    {
        id:1,
        author: {
            email:'correo1@hotmail.com',
            name: 'nombre1',
            apellido: 'apellido1',
            edad: 10,
            alias: 'alias1',
            avatar: 'http://avatar1.jpg'
        },
        text: 'texto 1'
    }, 
    {
        id:2,
        author: {
            email:'correo2@hotmail.com',
            name: 'nombre2',
            apellido: 'apellido2',
            edad: 20,
            alias: 'alias2',
            avatar: 'http://avatar2.jpg'
        },
        text: 'texto 2'
    }, 
    {
        id:3,
        author: {
            email:'correo3@hotmail.com',
            name: 'nombre3',
            apellido: 'apellido3',
            edad: 30,
            alias: 'alias3',
            avatar: 'http://avatar3.jpg'
        },
        text: 'texto 3'
    },
    {
        id:4,
        author: {
            email:'correo2@hotmail.com',
            name: 'nombre2',
            apellido: 'apellido2',
            edad: 20,
            alias: 'alias2',
            avatar: 'http://avatar2.jpg'
        },
        text: 'texto 4'
    }
]
}

export default class Mensaje {

	constructor() {
		this.mensajes = [];
		this.connected = false;
	}

	async listado() {
		try {
			return await MensajeModel.find();
		} catch (err){
			console.log(err);
		}
	}

	async buscar(idBuscado) {
		try {
			return await MensajeModel.findById(idBuscado);
		} catch (err){
			console.log(err);
		}
	}

	async guardar(nuevoMensaje) {
		try {
			nuevoProducto.timeStamp = Date.now();
			const normalizedMessages = {messages:[messageSchemaNmlz]}
			const newMessage = new MensajeModel(nuevoProducto);
			return await newMessage.save();
		} catch (err){
			console.log(err);
		}
	}

	async borrar(idAEliminar) {
		try {
			return await MensajeModel.findByIdAndDelete(idAEliminar);
		} catch (err){
			console.log(err);
		}
	}
}
