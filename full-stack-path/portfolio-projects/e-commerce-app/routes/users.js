import express from "express";
const userRouter = express.Router();

import { getUserById, getOrdersByUserId, createOrderForUser } from "../controllers/usersController.js";

userRouter.get("/me", getUserById);

// userRouter.get("/users/:id/orders", (req, res) => {
//     const userId = req.params.id;
//     res.status(200).send("User orders found");
// });

// userRouter.post("/users/:id/orders", (req, res) => {
//     const userId = req.params.id;
//     res.status(201).send("Order created");
// });

export default userRouter;