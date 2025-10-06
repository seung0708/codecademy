import express from "express";
import session from "express-session"
import cors from "cors";
import pool from "./models/database.js";

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
