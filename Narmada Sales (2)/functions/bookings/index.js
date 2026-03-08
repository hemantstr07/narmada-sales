/**
 * Cloudflare Pages Function for Booking Creation
 * Endpoint: /bookings
 * Methods: POST
 * Database: D1 (binding name: DB)
 */

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const booking = await request.json();

        // Insert booking into D1 database
        const result = await env.DB.prepare(`
            INSERT INTO bookings (
                id, buyer_id, property_id, seller_id,
                appointment_date, status, notes, seller_notes, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            booking.id,
            booking.buyer_id,
            booking.property_id,
            booking.seller_id,
            booking.appointment_date,
            booking.status || 'pending',
            booking.notes || '',
            booking.seller_notes || '',
            Date.now(),
            Date.now()
        ).run();

        // Fetch created booking
        const createdBooking = await env.DB.prepare(
            'SELECT * FROM bookings WHERE id = ?'
        ).bind(booking.id).first();

        console.log('Booking created successfully:', booking.id);

        return new Response(JSON.stringify({
            success: true,
            message: 'Booking created successfully',
            data: createdBooking
        }), {
            status: 201,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error creating booking:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to create booking',
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
