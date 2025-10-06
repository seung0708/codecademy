# E-Commerce API Project Checklist (SDLC)

## 1. Planning
- [x] Define project objectives
  - Enable users to create personal accounts
  - Enable third-party OAuth login (Google/Facebook)
  - Enable product browsing
  - Enable purchases via Stripe
  - Enable order history viewing
- [x] Identify tech stack
  - Frontend: React
  - Backend: Node.js/Express
  - Database: PostgreSQL
  - Payment: Stripe
- [x] Outline API endpoints

## 2. Design
- [x] Design database schema
  - Users table
  - Products table
  - Orders table
- [x] Create OpenAPI/Swagger YAML
  - Define all endpoints with request/response schemas
  - Include examples for each field
- [ ] Design authentication flow
  - Session-based login
  - OAuth 2.0 for third-party login

## 3. Implementation
- [ ] Implement user registration (`/register`)
- [ ] Implement login (`/login`) and logout (`/logout`)
- [ ] Implement product endpoints
  - `/products` GET (list)
  - `/products/{id}` GET (detail)
- [ ] Implement order endpoints
  - `/users/{id}/orders` GET (history)
  - `/users/{id}/orders` POST (create + Stripe PaymentIntent)
- [ ] Implement third-party OAuth endpoints
  - `/auth/google`
  - `/auth/facebook`
- [ ] Optional: Implement product filters and pagination
- [ ] Optional: Implement order confirmation webhook

## 4. Testing
- [ ] Unit tests for backend routes
  - Users: registration, login, logout
  - Products: list and get by ID
  - Orders: create and retrieve
- [ ] Integration tests
  - Stripe payment flow
  - Session management
- [ ] API testing with Swagger UI or Postman

## 5. Deployment
- [ ] Deploy backend server (Node.js + Express)
- [ ] Configure PostgreSQL database
- [ ] Configure environment variables (Stripe keys, database URL)
- [ ] Deploy frontend React app
- [ ] Ensure HTTPS and secure cookies for sessions

## 6. Maintenance
- [ ] Monitor API errors and logs
- [ ] Update Swagger documentation as API changes
- [ ] Add new features (product search, reviews, etc.)
