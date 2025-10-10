import { describe, it, expect, beforeEach } from 'vitest';
import supertest from 'supertest';
import app from '../server.js';

import pool from '../models/database.js';

const request = supertest(app);

afterEach(async () => {
  await pool.query('DELETE FROM users WHERE email = $1', ['test@example.com']);
});
 
describe('Authentication Routes', () => {
  it('should register a new user', async () => {
    const response = await request
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId');
  });

  it('should login a user', async () => {
    //First register
     await request
      .post('/register')
      .send({ email: 'test@example.com', password: 'password123' });
    //Then login
    const response = await request
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.headers).toHaveProperty('set-cookie');
  });

  it('should logout a user', async () => {
    const response = await request
      .post('/logout');
    
    expect(response.status).toBe(204);
  });
});