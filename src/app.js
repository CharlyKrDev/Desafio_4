import express from "express";
import  {viewsPath, publicPath} from "./utils.js";
import { realTimeProductsRouter} from "./routes/realTimeProductsRouter.js";
// import { registerRouter } from "./routes/registerRouter.js";
import { Server } from "socket.io"; 
import productsRouter from "./routes/productsRouters.js";
import cartsRouter from "./routes/cartsRouters.js";
import handlebars from 'express-handlebars'
import {socketConnection} from './connection/handleSockets.js'



const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, console.log(`Server running on port: ${PORT}`));
const socketServer = new Server(httpServer) 

app.set("views", viewsPath);
app.enable("view cache");
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", realTimeProductsRouter);

socketConnection(socketServer)
