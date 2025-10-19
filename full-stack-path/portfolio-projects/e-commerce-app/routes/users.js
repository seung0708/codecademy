import express from "express";
const userRouter = express.Router();

import { authorizedUser } from "../middleware/auth.js";

import { getUserById, getOrdersByUserId } from "../controllers/usersController.js";

userRouter.get("/me", authorizedUser, getUserById);
userRouter.get("/me/orders", authorizedUser, getOrdersByUserId);



export default userRouter;