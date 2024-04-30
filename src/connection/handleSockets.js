import { __dirname } from "../utils.js";

import { ProductManager } from "../services/productManager.js";

const productManager = new ProductManager();

export const socketConnection = (socketServer) => {
  socketServer.on("connection", async (socket) => {
    console.log(`New client connected`);

    try {
      const products = await productManager.getProducts();
      console.log(products)
      socket.emit("currentProducts", products);
    } catch (error) {
      console.error("Error al enviar productos al cliente:", error);
      socket.emit("error", { message: "Error al procesar la solicitud" });
    }

    socket.on("addProduct", async (product) => {
      try {
        await productManager.addProduct(product);
        const updatedProducts = await productManager.getProducts();
        socketServer.emit("updateProducts", updatedProducts);
      } catch (error) {
        console.error("Error al agregar producto:", error);
        socket.emit("error", { message: "Error al agregar producto" });
      }
    });

    socket.on("deleteProduct", async (productId) => {
      console.log(productId);
      try {
        const checkId = await productManager.checkProductId(productId);
        if (!checkId) {
          console.log(`Producto con ID: ${productId} no existe`);
          return;
        }

        await productManager.deleteProduct(productId);
        const updatedProducts = await productManager.getProducts();
        socketServer.emit("updateProducts", updatedProducts);
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        socket.emit("error", { message: "Error al eliminar producto" });
      }
    });
  });
};
