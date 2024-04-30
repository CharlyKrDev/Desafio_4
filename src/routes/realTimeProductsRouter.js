import express from "express";
import { ProductManager } from "../services/productManager.js";


const productManager = new ProductManager();

export const realTimeProductsRouter = express.Router()




realTimeProductsRouter.get("/home", async (req, res) => {

  const limit = parseInt(req.query.limit);
  let mostrar

  try {
    const products = await productManager.getProducts();
    !isNaN(limit) ? mostrar = products.slice(0, limit) : mostrar = products

    res.render('home',{
      style:'style.css',
      productos: mostrar

    })
  
  } catch (error) {
    res.status(404).json({ error: error.message }); 
  }
});



realTimeProductsRouter.get("/realTimeProducts", (req, res)=>{

  res.render('realTimeProducts',{
    style:'style.css',


  })
})

realTimeProductsRouter.post("/realTimeProducts", async (req, res) => {
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

    let producto =[]
    producto.push(newProduct)

    res.render('realTimeProducts',{
      style:'style.css',
      producto,
      isAdded: producto

    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

