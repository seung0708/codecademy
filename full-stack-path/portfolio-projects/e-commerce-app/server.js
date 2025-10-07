import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session"
import cors from "cors";    

import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        httpOnly: true, 
        maxAge: 25 * 60 * 60 * 1000
    }
}))

const PORT = process.env.PORT || 3000;

// Routes

app.use('/', authRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app;