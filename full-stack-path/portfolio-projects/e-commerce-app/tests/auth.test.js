import { describe, it, expect, beforeAll } from 'vitest';
import pool from '../models/database'
import {agent} from './setup.js';

beforeAll(async () => {
  // Delete test user before each test
  await pool.query("DELETE FROM users WHERE email = 'test@example.com'");
});

describe('Authentication Routes', () => {
  it('should register a new user', async () => {
    const response = await agent
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId');
  });
 
  it('should login a user', async () => {

    const response = await agent
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged in');
  
    // Verify session works by accessing a protected route
    const meResponse = await agent.get('/users/me');
    expect(meResponse.status).toBe(200);
  });

  it('should logout a user', async () => {
    const response = await agent
      .post('/logout');
    
    expect(response.status).toBe(204);
  });
});