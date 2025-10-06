const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
    console.log(req.body);
    res.status(201).send("User registered successfully");
});

authRouter.post("/login", (req, res) => {
    res.status(200).send("User logged in successfully");
});

authRouter.post("/logout", (req, res) => {
    res.status(204).send("User logged out successfully");
});

module.exports = authRouter;
