import  express from "express";
//import Contenedor from "./Contenedor.js";
//import Tablero from "./Tablero.js";
import { Server } from "socket.io";
import { createServer } from "http";
import {faker} from "@faker-js/faker";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bCrypt from "bcrypt";
import session from "express-session";
import hbs from "express-handlebars";
import UsuarioSchema from "./models/UsuarioModel.js";
import yargs from "yargs/yargs";
//import config from "./config.js";
import * as dotenv from 'dotenv';
dotenv.config();


//### Recupero valores para PORT desde argumentos en consola ###
const args = yargs(process.argv.slice(2)).default({
		puerto: 8080
}).argv;
const PORT = parseInt(args.puerto);


//Imports de PASSPORT
import passport from "passport";
import { Strategy } from "passport-local";
const localStrategy = Strategy;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//### MANEJO DE SESIÓN ###
app.use(cookieParser());
app.use(session({
		//secret: "INDECIFRABLE",
		//secret: config.DECRIPTION_KEY,
		secret: process.env.DECRIPTION_KEY,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 10000 }
	})
);
app.use(passport.initialize());
app.use(passport.session());


//### Conexion a MongoDB ###
//const urlDB = "mongodb+srv://the_nemesis:h0opnodmmd7VNPVV@nodejscoder.ivotase.mongodb.net/loginPassport?retryWrites=true&w=majority";
//const urlDB = config.MONGO_SERVER;
const urlDB = process.env.MONGO_SERVER;
const mongodb = mongoose.connect;
mongodb(urlDB);


//### ESTRATEGIAS DE PASSPORT ###
passport.use("register", new localStrategy(
		{ passReqToCallback: true },
		async (req, username, password, done) => {
			try {
				UsuarioSchema.create(
					{
						email: username,
                        password: createHash(password)
					},
					(err, userWithId) => {
						if (err) {
							console.log(err)
							return done(err, null);
						}
						return done(null, userWithId);
					}
				);
			} catch (e) {
				return done(e, null);
			}
		}
	)
);

passport.use("login", new localStrategy((username, password, done) => {
		try {
			UsuarioSchema.findOne(
				{
					username,
				
				},
				(err, user) => {
					if (err) {
						return done(err, null);
					}
					if (!user){
						return done(null, false)
					}
					if(!isValidPassword(user, password)){
						return done(null, false)
					}
					return done(null, user)
				}
			);
		} catch (e) {
			return done(e, null);
		}
	})
);


//### SERIALIZACIÓN ###

passport.serializeUser((usuario, done) => { done(null, usuario._id);});
passport.deserializeUser((id, done) => { UsuarioSchema.findById(id, done);});

app.use(express.static("public"));

//### GENERACIÓN DE PRODUCTOS ALEATORIOS CON FAKER ###
function generarProductoFaker(){ return {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.business()
    }
}
let inventario = [];
for(let i=0; i<5; i++){
    inventario.push(generarProductoFaker());
}
app.get("/api/productos-test", (req, res) => {
    res.json(inventario);
}) 


//### VISTAS CON HBS ###
app.set("views", "./public/views");

app.engine(".hbs",
    hbs.engine({
		defaultLayout: "main",
		layoutsDir: "./public/views/layouts",
		extname: ".hbs",
	})
);
app.set("view engine", ".hbs");

app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login",
	passport.authenticate("login", {
		successRedirect: "/",
		failureRedirect: "/login-error",
	})
);

app.get("/login-error", (req, res) => {
	res.render("login-error");
});

app.get("/register", (req, res) => {
	res.render("register");
});

app.get("/datos", (req, res) => {
	res.render("/");
	//res.json({mensaje: 'Inicio de sesion correcto!'});
});

app.get("/logout", (req, res) => {
	req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
	
	//res.render("/");
});

app.post("/registrar",
	passport.authenticate("register", {
		successRedirect: "/login",
		failureRedirect: "/login-error",
	})
);

function createHash(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
	return bCrypt.compareSync(password, user.password);
}


//INICIALIZO EL TABLERO DE MENSAJES CON LOS MENSAJES GUARDADOS
//let tablero = new Tablero("mensajes",options.sqlite);

io.on("connection", async (socket) => {
    console.log("Se conectó un usuario!");

	//socket.emit("carga_usuario", );

    socket.emit("carga_inventario", inventario);

    //socket.emit("carga_chat", await tablero.getAll());

    // socket.on("nuevo_producto", async (data) => {
    //     await inventario.save(data);
    //     io.sockets.emit("carga_inventario", await inventario.getAll());
    // });

    // socket.on("nuevo_mensaje", async (data) => {
    //     await tablero.save(data);
    //     io.sockets.emit("carga_chat", await tablero.getAll());
    // });
})


httpServer.listen(PORT, () => console.log(`Servidor levantado en puerto ${PORT}`));