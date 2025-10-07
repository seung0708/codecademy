import express from "express";
const authRouter = express.Router();

import { register } from '../controllers/authController.js';

authRouter.post("/register", register);

authRouter.post("/login", (req, res) => {
    res.status(200).send("User logged in successfully");
});

authRouter.post("/logout", (req, res) => {
    res.status(204).send("User logged out successfully");
});

export default authRouter;
