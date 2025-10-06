import express from "express";
const userRouter = express.Router();

userRouter.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    res.status(200).send("User found");
});

userRouter.get("/users/:id/orders", (req, res) => {
    const userId = req.params.id;
    res.status(200).send("User orders found");
});

userRouter.post("/users/:id/orders", (req, res) => {
    const userId = req.params.id;
    res.status(201).send("Order created");
});

export default userRouter;