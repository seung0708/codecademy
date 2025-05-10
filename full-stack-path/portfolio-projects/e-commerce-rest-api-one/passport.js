require('dotenv').config();
const passport = require('passport');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.JWT_SECRET_KEY
}

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

passport.use(new JwtStrategy(options, async(payload, done) => {
    try {
        const user = await findById(payload.id); 
        if(!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch(error) {
        done(error, false)
    }
}))

const isAuthenticated = passport.authenticate('jwt', {session: false})

module.exports = isAuthenticated;