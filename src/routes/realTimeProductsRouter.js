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


