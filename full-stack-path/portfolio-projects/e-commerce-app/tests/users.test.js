import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import {agent} from './setup.js';

describe('User Routes', () => {
  beforeAll(async () => {
    // Register and login once before tests
    await agent.post('/auth/register').send({ email: 'test@example.com', password: 'password123' }); 

  });
  
  it('should return logged in user', async () => {
    const res = await agent.get('/users/me');
    console.log('Response body:', res.body); // Debugging line
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('test@example.com');
  });
  
    // it('should get user orders', async () => {
    //   const res = await agent.get('/users/me/orders'); // use /me
    //   expect(res.status).toBe(200);
    //   expect(Array.isArray(res.body)).toBe(true);
    // });
  
    // it('should create a new order', async () => {
    //   const response = await request
    //     .post('/users/1/orders')
    //     .send({
    //       items: [
    //         {
    //           product_id: 1,
    //           quantity: 2
    //         }
    //       ],
    //       total: 59.98
    //     });
      
    //   expect(response.status).toBe(201);
    //   //expect(response.body).toHaveProperty('order_id');
    //   //expect(response.body).toHaveProperty('client_secret');
    // });
  });
  