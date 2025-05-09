const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    {usernameField: 'email'}, 
    async (email, password, done) => {
        try {
            const user = await getUserByEmail(email);
            if(!user) {
                return done(null, false, {message: 'Incorrect username'})
            }

            const isMatch = await bcrypt.compare(password, user.password); 
            if(!isMatch) {
                return done(null, false, {message: 'Incorrect password.'})
            }

            return done(null, user)
        } catch(error) {
            return done(err)
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);
        done(null, user);
    } catch (error) {
        done(error)
    }
})

module.exports = passport; 