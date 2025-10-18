import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import pool from "../models/database";

passport.use(new LocalStrategy(
    async (email, password, done) => {
        try {
            const [rows] = await pool.query(
                "SELECT * FROM users WHERE email = ?",
                [email]
            );
            if (rows.length === 0) {
                return done(null, false, { message: "User not found" });
            }
            const user = rows[0];
            if (user.password !== password) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );
        done(null, rows[0]);
    } catch (error) {
        done(error);
    }
});

export default passport;