import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import cors from "cors";
import stripe from "./lib/stripe.js";

import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";

const app = express();
app.use(express.json());

// SESSION MUST BE SET BEFORE ROUTERS
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 }, // 1 hour
  })
);

app.use(cors({
  origin: true,
  credentials: true
}));

app.use("/", authRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

export default app;
