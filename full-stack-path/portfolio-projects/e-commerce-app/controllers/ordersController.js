import pool from '../models/database.js'
import stripe from '../lib/stripe.js'

export const createPaymentIntent = async (req, res) => {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid items' });
    }
    try {
        for (const item of items) {
            if (!item.product || item.quantity === undefined) {
                return res.status(400).json({ error: 'Each item must have a product and quantity' });
            }

            if (item.quantity <= 0) {
                return res.status(400).json({ error: 'Quantity must be greater than 0' });
            }
        }

        let totalAmount = 0;
        const validatedItems = [];
        
        for (const item of items) {
            const query = await pool.query('SELECT * FROM products WHERE id = $1', [item.product.id]);
            if (query.rows.length === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const product = query.rows[0];
            const itemTotal = parseFloat(product.price) * item.quantity;
            totalAmount += itemTotal;
            validatedItems.push({
                productId: product.id,
                productName: product.name,
                quantity: item.quantity,
                price: product.price,
            });
        }

        const amountInCents = Math.round(totalAmount * 100);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                userId: req.user.id.toString(),
                items: JSON.stringify(validatedItems),
            }
        });
        return res.status(200).json({ clientSecret: paymentIntent.client_secret, amount: amountInCents });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return res.status(500).json({ error: 'Failed to create payment intent' });
    }
};