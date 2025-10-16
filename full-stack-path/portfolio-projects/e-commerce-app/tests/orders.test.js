import { describe, it, expect, beforeAll } from 'vitest';
import app from '../app.js';
import supertest from 'supertest';
import {agent} from './setup.js';

const unauthAgent = supertest.agent(app);

describe('Orders Route', () => {
    it('should fail without authentication', async () => {
        const response = await unauthAgent
            .post('/orders/create-payment-intent')
            .send({
                items: [{
                    product: 'test-product',
                    quantity: 1
                }]
            });
        
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error');
    })
    it ('should create payment intent when authenticated', async () => {
        const response = await agent
            .post('/orders/create-payment-intent')
            .send({
                items: [{
                    product: 'test-product',
                    quantity: 1
                }]
            });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('clientSecret');
        expect(response.body.clientSecret).toMatch(/^pi_.*_secret_.*/);
        expect(response.body.amount).toBe(100);
    })
    
})