import express from "express"
import { authorizedUser } from "../middleware/auth";
import { createPaymentIntent } from "../controllers/ordersController";

const ordersRouter = express.Router();

ordersRouter.post("/create-payment-intent", authorizedUser, createPaymentIntent);

export default ordersRouter;
