import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import pool from '../models/database'
import supertest from 'supertest';
import app from '../app.js';

describe('User Routes', () => {
  let freshAgent;
  beforeAll(async () => {
    // use a fresh again to avoid session conflicts
    freshAgent = supertest.agent(app);

    // clean up any existing users
    await pool.query("DELETE FROM users WHERE email = 'test@example.com'");
    
    // Then register and login
    await freshAgent.post('/register').send({ 
      email: 'test@example.com', 
      password: 'password123' 
    }); 
  });

  afterAll(async () => {
    // clean up any existing users
    await pool.query("DELETE FROM users WHERE email = 'test@example.com'");
  });
  
  it('should return logged in user', async () => {
    const res = await freshAgent.get('/users/me');
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('test@example.com');
  });
  
  it('should get user orders', async () => {
    const res = await freshAgent.get('/users/me/orders'); 
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // initially will be empty array since no orders created
    expect(res.body.length).toBe(0);
  });
});