import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import pool from "../models/database.js";  // ✅ Add .js extension
import bcrypt from "bcryptjs";

passport.use(new LocalStrategy(
    {
        usernameField: 'email',  // ✅ Add this to tell Passport to use 'email' field
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const results = await pool.query(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );
            if (results.rows.length === 0) {
                return done(null, false, { message: "User not found" });
            }
            const user = results.rows[0];
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (error) {
            console.error('Passport strategy error:', error);
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );
        done(null, result.rows[0]);
    } catch (error) {
        console.error('Deserialize error:', error);
        done(error);
    }
});

export default passport;