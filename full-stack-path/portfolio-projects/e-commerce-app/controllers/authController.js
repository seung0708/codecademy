import pool from "../models/database.js";
import bcrypt from "bcryptjs";
const saltRounds = 10;

export const register = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, saltRounds);

  try {
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length) return res.status(409).json({ error: "User exists" });

    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashed]
    );

    // SAVE SESSION
    req.session.userId = newUser.rows[0].id;
    await new Promise((resolve, reject) => {
      req.session.save(err => (err ? reject(err) : resolve()));
    });

    res.status(201).json({ userId: newUser.rows[0].id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!user.rows.length) return res.status(400).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  await new Promise((resolve, reject) => {
    req.session.save(err => {
      err ? reject(err) : resolve();
    });
  });

    res.status(200).json({ message: "Logged in" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.status(204).end();
  });
};
