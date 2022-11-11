import express from "express";
import Contenedor from './models/productsModel';
import Mensajes from './models/messageModel';
import { options } from './connection';
import startTable from './models/tables';



import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";

/* -------------------------------------------*/
// Servidor, socket, router
const app = express();
const router = Router();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

/* -------------------------------------------*/
// Declaración Contenedores y conexión
let prod = new Contenedor("productos", options.mysql);
let msg = new Mensajes("mensajes", options.sqlite3)

// Conectamos websocket
io.on("connection", async (socket) => {
    console.log('Usuario con id: ', socket.id, ' se ha conectado')

    let productos = await prod.getAll();
    let mensajes = await msg.getAll();
    // Socket Chat
    socket.emit('messages', mensajes);

    // Mensajes mostrados correctamente.
    socket.on("new-message", async (data) => {
        data.date = new Date().toLocaleDateString()
        mensajes.push(data);
        msg.addMessage(data);

        console.log(data)

        io.sockets.emit("messages", mensajes);
    });

    // Socket productos
    socket.emit("productList", productos);


    socket.on("newProduct", async (data) => {
        await prod.addProduct(data);

        io.sockets.emit("productList", productos)
    })

})

//establecemos la configuración de ejs

app.set("view engine", "ejs");
app.set("views", "./views");
//--------------------------------------------
// Conexión al servidor

app.use(express.static("./public"));
app.set("socketio", io);
app.use("/", router);
app.use(session({ // definir conexión mongoStore
    //store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cxnStr }),
    secret: 'a',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))
router.use(json());
router.use(urlencoded({ extended: true }));


// Agrega el producto a la base de datos mysql
// Mover
router.post("/", (req, res) => {
    const producto = req.body;
    prod.addProduct(producto);
    res.redirect("/");
});

async function start() { //Mover o sacar
    const inicio = new startTable();

    let prod = await inicio.prod();
    let mess = await inicio.mess();
}

// Crear las tablas
start(); // Mover o sacar

const serverConnected = httpServer.listen(PORT, () => console.log("servidor Levantado"));
serverConnected.on('error', error => console.log(`Server error ${error}`));

