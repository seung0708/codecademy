import { describe, it, expect, beforeEach } from 'vitest';
import {agent} from './setup.js';

console.log(agent)

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
    expect(response.headers).toHaveProperty('set-cookie');
  });

  it('should logout a user', async () => {
    const response = await agent
      .post('/logout');
    
    expect(response.status).toBe(204);
  });
});