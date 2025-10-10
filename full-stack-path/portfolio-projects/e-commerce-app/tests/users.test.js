import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import app from '../server.js';
import pool from '../models/database.js';
import bcrypt from 'bcryptjs';

const request = supertest(app);

beforeEach(async () => {
  const hashedPassword = await bcrypt.hash('password123', 10);
  await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2)',
    ['user1@example.com', hashedPassword]
  );
  console.log('Inserted user1@example.com');
});

afterEach(async () => {
  await pool.query('DELETE FROM users WHERE email = $1', ['user1@example.com']);
  console.log('Deleted user1@example.com');
});

describe('User Routes', () => {
    it('should get user by id', async () => {
      const response = await request.get('/users/');
      
      expect(response.status).toBe(200);
      //expect(response.body).toHaveProperty('email');
    });
  
    it('should get user orders', async () => {
      const response = await request.get('/users/1/orders');
      
      expect(response.status).toBe(200);
      //expect(Array.isArray(response.body)).toBe(true);
    });
  
    it('should create a new order', async () => {
      const response = await request
        .post('/users/1/orders')
        .send({
          items: [
            {
              product_id: 1,
              quantity: 2
            }
          ],
          total: 59.98
        });
      
      expect(response.status).toBe(201);
      //expect(response.body).toHaveProperty('order_id');
      //expect(response.body).toHaveProperty('client_secret');
    });
  });
  