/**
 * Cloudflare Pages Function for Payment Operations
 * Endpoint: /payments
 * Methods: POST
 * Database: D1 (binding name: DB)
 */

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const payment = await request.json();

        // Insert payment into D1 database
        const result = await env.DB.prepare(`
            INSERT INTO payments (
                id, booking_id, buyer_id, seller_id, 
                amount, payment_method, transaction_id, 
                status, payment_date, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            payment.id,
            payment.booking_id,
            payment.buyer_id,
            payment.seller_id,
            payment.amount,
            payment.payment_method,
            payment.transaction_id,
            payment.status,
            payment.payment_date,
            Date.now()
        ).run();

        // Fetch created payment
        const createdPayment = await env.DB.prepare(
            'SELECT * FROM payments WHERE id = ?'
        ).bind(payment.id).first();

        console.log('Payment created successfully:', payment.id);

        return new Response(JSON.stringify({
            success: true,
            message: 'Payment created successfully',
            data: createdPayment
        }), {
            status: 201,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error creating payment:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to create payment',
            details: error.message 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400'
        }
    });
}
