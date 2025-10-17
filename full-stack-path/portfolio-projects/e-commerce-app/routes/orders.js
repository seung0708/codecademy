import express from "express"
import { authorizedUser } from "../middlware/auth";

const ordersRouter = express.Router();

ordersRouter.post("/create-payment-intent", authorizedUser, async (req, res) => {
    
})

export default ordersRouter;
