const productsRouter = express.Router();
import express from "express";

import { getAllProducts, getProductById } from "../controllers/productsController.js";

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", getProductById);

export default productsRouter;
