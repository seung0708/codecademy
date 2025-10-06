# Authentication Flow Design

## Approach
- Session-based authentication using express-session
- Sessions stored in memory (dev) / PostgreSQL (production)
- Session cookie: httpOnly, secure in production
- Session expiration: 24 hours
- OAuth 2.0 with Google (also uses sessions)

## Session Configuration
```javascript
{
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}