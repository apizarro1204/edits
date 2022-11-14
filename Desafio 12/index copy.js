import express from "express";
import session from 'express-session'
import MongoStore from 'connect-mongo'
import Contenedor from './models/productsModel.js';
import Mensajes from './models/messageModel.js';

//import startTable from './models/tables.js';
import prodApi from './src/routes/api/prodRouter.js'
import showProd from './src/routes/web/home.js'
import newSession from './src/routes/web/newConnect.js'



import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";

/* -------------------------------------------*/
// Servidor, socket, router
const app = express();
const router = express.Router();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;


//establecemos la configuración de ejs

app.set("view engine", "ejs");
//app.set("views", "./views");

//--------------------------------------------
// Conección con rutas

app.use("/api/productos-test",prodApi);
app.use(showProd);
app.use("/", newSession);

//--------------------------------------------
// Conexión al servidor

app.use(express.static('/public'));
//app.set("socketio", io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//--------------------------------------------
// Configuración de socket




// Agrega el producto a la base de datos mysql
// Mover
// router.post("/", (req, res) => {
//     const producto = req.body;
//     prod.addProduct(producto);
//     res.redirect("/");
// });

// async function start() { //Mover o sacar
//     const inicio = new startTable();

//     let prod = await inicio.prod();
//     let mess = await inicio.mess();
// }

// Crear las tablas
//start(); // Mover o sacar

const serverConnected = httpServer.listen(PORT, () => console.log("servidor Levantado"));
serverConnected.on('error', error => console.log(`Server error ${error}`));

