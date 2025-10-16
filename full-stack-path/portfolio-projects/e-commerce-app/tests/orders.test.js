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
    it('should calculate correct amount', async () => {
        const quantity = 2;
        const expectedAmount = quantity * 100;
        const response = await agent
            .post('/orders/create-payment-intent')
            .send({
                items: [{
                    product: 'test-product',
                    quantity: quantity
                }]
            });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('clientSecret');
        expect(response.body.clientSecret).toMatch(/^pi_.*_secret_.*/);
        expect(response.body.amount).toBe(expectedAmount);
    })
    it('should fail with invalid product', async () => {
        const response = await agent
            .post('/orders/create-payment-intent')
            .send({
                items: [{
                    product: 'invalid-product',
                    quantity: 1
                }]
            });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    }) 
    it('should fail with negative quantity', async () => {
        const response = await agent
            .post('/orders/create-payment-intent')
            .send({
                items: [{
                    product: 'test-product',
                    quantity: -1
                }]
            });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    })
    it('should fail with zero quantity', async () => {
        const response = await agent
            .post('/orders/create-payment-intent')
            .send({
                items: [{
                    product: 'test-product',
                    quantity: 0
                }]
            });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    })
})

describe('Stripe Payment Intent Verification', () => {
    it('should create payment intent in Stripe', async () => {
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