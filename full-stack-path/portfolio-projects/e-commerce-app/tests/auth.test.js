import { describe, it, expect, beforeEach } from 'vitest';
import pool from '../models/database'
import { agent } from './setup.js';
import app from '../app.js';
import supertest from 'supertest';

describe('Authentication Routes', () => {
  // Clean up before each test to ensure isolation
  beforeEach(async () => {
    console.log('TEST: Cleaning up test user');
    
    // First, try to logout to clear any existing session
    try {
      await agent.post('/logout');
    } catch (e) {
      // Ignore errors if not logged in
    }
    
    // Delete the test user
    await pool.query("DELETE FROM users WHERE email = 'test@example.com'");
    
    // Verify deletion
    const check = await pool.query("SELECT * FROM users WHERE email = 'test@example.com'");
    console.log('TEST: After cleanup, users with test email:', check.rows.length);
  });
  
  it('should register a new user', async () => {
    console.log('TEST: Starting register test');
    
    const response = await agent
      .post('/register')
      .send({
        email: 'test@example.com', 
        password: 'password123'
      }); 
    
    console.log('TEST: Register response:', response.status, response.body);
    
    // Verify user was created in database
    const verify = await pool.query("SELECT * FROM users WHERE email = 'test@example.com'");
    console.log('TEST: After register, users in DB:', verify.rows.length);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId');
    expect(verify.rows.length).toBe(1); // User should exist in DB
  });
 
  it('should login a user', async () => {
    console.log('TEST: Starting login test');
    
    // Use a FRESH agent for this test to avoid session conflicts
    const freshAgent = supertest.agent(app);
    
    // First, register the user
    const registerResponse = await freshAgent
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    console.log('TEST: Register response:', registerResponse.status, registerResponse.body);
    
    // Verify user exists before login
    const beforeLogin = await pool.query("SELECT * FROM users WHERE email = 'test@example.com'");
    console.log('TEST: Before login, users in DB:', beforeLogin.rows.length);

    // Logout to clear the session from register
    await freshAgent.post('/logout');

    // Then, login with that user
    const response = await freshAgent
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
 
    console.log('TEST: Login response:', response.status, response.body);
  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged in');
  
    // verify session works by accessing a protected route
    const meResponse = await freshAgent.get('/users/me');
    expect(meResponse.status).toBe(200);
  });

  it('should logout a user', async () => {
    console.log('TEST: Starting logout test');
    
    // Use a FRESH agent for this test 
    const freshAgent = supertest.agent(app);
    
    // first, register the user for this test
    await freshAgent
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    //then log out
    const response = await freshAgent
      .post('/logout');
    
    console.log('TEST: Logout response:', response.status);
    
    expect(response.status).toBe(204);
  });
});