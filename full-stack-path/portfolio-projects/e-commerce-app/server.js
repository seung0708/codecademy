import express from "express";
import cors from "cors";
import pool from "./models/database.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
