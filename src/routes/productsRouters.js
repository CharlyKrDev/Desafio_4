import { Router } from "express";
import { ProductManager } from "../services/productManager.js";

const productsRouter = Router();

const productManager = new ProductManager();

productsRouter.get("/api/products", async (req, res) => {
  const limit = parseInt(req.query.limit);

  try {
    const products = await productManager.getProducts();

    if (!isNaN(limit)) {
      res.status(200).json(products.slice(0, limit));
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(404).json({ error: error.message }); 
  }
});

productsRouter.get("/api/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = await productManager.getProductId(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message }); 
  }
});
  productsRouter.post("/api/products", async (req, res) => {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = req.body;
    const newProduct = req.body;
    try {
      await productManager.addProduct(newProduct);

      res.status(200).json({
        Producto: newProduct,
        message: `Producto cargado correctamente`,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }),

  
  productsRouter.put("/api/products/:pid", async (req, res) => {
    const productId = parseInt(req.params.pid);
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = req.body;
    const updatedFields = req.body;
    try {
      const message = await productManager.updateProduct(productId, updatedFields);
      res.status(200).json({ ProductoID: `${productId}`, message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  productsRouter.delete("/api/products/:pid", async (req, res) => {
    const productId = parseInt(req.params.pid);

    try {
   
      const deleteProduct = await productManager.deleteProduct(productId);

      res
        .status(200)
        .json(`El producto id: ${productId} ha sido eliminado correctamente`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default productsRouter;
