import { describe, it, expect, beforeAll } from 'vitest';
import app from '../app.js';
import supertest from 'supertest';
import pool from '../models/database.js';

describe('Orders Route', () => {
    let authenticatedAgent;
    let unAuthenticatedAgent;
    let testProductId;

    beforeAll(async () => {
        authenticatedAgent = supertest.agent(app);
        unAuthenticatedAgent = supertest.agent(app);

        await pool.query('DELETE FROM users WHERE email = $1', ['test@example.com']);
        
        const product = await pool.query('SELECT * FROM products WHERE name = $1', ['Black Women\'s Gown']);
        testProductId = product.rows[0].id;

        await authenticatedAgent.post('/register').send({
            email: 'test@example.com',
            password: 'password123'
        });

        console.log('Test setup complete');
    })

    afterAll(async () => {
        await pool.query("DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'test@example.com'))");
        await pool.query("DELETE FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'test@example.com')");
        await pool.query("DELETE FROM users WHERE email = 'test@example.com'");
    })

    describe('POST /orders/create-payment-intent', () => {

        it('should fail without authentication', async () => {
            const response = await unAuthenticatedAgent
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
        it('should create payment intent when authenticated', async () => {
            const response = await authenticatedAgent
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
            expect(response.body.amount).toBe(100); // $1.00 * 100 cents
        })
        it('should calculate correct amount for multiple quantities', async () => {
            const response = await authenticatedAgent
                .post('/orders/create-payment-intent')
                .send({
                    items: [{product: 'test-product', quantity: 3}]
                })
            
            expect(response.status).toBe(200)
            expect(response.body.amount).toBe(300)
        })
        it('should fail with invalid product', async () => {
            const response = await authenticatedAgent
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
            const response = await authenticatedAgent
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
            const response = await authenticatedAgent
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
})
