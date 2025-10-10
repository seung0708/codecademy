import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import app from '../server.js';
import pool from '../models/database.js';

const request = supertest(app);

describe('Product Routes', () => {
    it('should get all products', async () => {
      const response = await request.get('/products');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  
    it('should get a product by id', async () => {
      const response = await request.get('/products/fd7a926e-7ff3-4146-a658-15e4d5d7034e');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('price');
    });
  });