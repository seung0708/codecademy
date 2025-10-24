import express from "express"
import { authorizedUser } from "../middleware/auth.js";
import { createPaymentIntent } from "../controllers/ordersController.js";

const ordersRouter = express.Router();

ordersRouter.post("/create-payment-intent", authorizedUser, createPaymentIntent);

export default ordersRouter;
 