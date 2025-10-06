import express from "express";

const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
    res.status(200).send("All products");
});

productsRouter.get("/:id", (req, res) => {
    res.status(200).send("Product with id " + req.params.id);
});

export default productsRouter;
