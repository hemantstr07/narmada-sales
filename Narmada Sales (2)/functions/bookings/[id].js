/**
 * Cloudflare Pages Function for Booking Operations
 * Endpoint: /bookings/:id
 * Methods: GET, PATCH
 * Database: D1 (binding name: DB)
 */

export async function onRequestGet(context) {
    try {
        const { params, env } = context;
        const bookingId = params.id;

        // Get booking from D1 database
        const result = await env.DB.prepare(
            'SELECT * FROM bookings WHERE id = ?'
        ).bind(bookingId).first();

        if (!result) {
            return new Response(JSON.stringify({ error: 'Booking not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error fetching booking:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to fetch booking',
            details: error.message 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function onRequestPatch(context) {
    try {
        const { request, params, env } = context;
        const bookingId = params.id;

        // Parse request body
        const body = await request.json();
        const { status, seller_notes } = body;

        // Validate required fields
        if (!status) {
            return new Response(JSON.stringify({ 
                error: 'Status is required' 
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Update booking in D1 database
        const result = await env.DB.prepare(
            'UPDATE bookings SET status = ?, seller_notes = ?, updated_at = ? WHERE id = ?'
        ).bind(
            status,
            seller_notes || '',
            Date.now(),
            bookingId
        ).run();

        // Check if booking was updated
        if (result.meta.changes === 0) {
            return new Response(JSON.stringify({ 
                error: 'Booking not found or not updated' 
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Fetch updated booking
        const updatedBooking = await env.DB.prepare(
            'SELECT * FROM bookings WHERE id = ?'
        ).bind(bookingId).first();

        console.log('Booking updated successfully:', bookingId);

        return new Response(JSON.stringify({
            success: true,
            message: 'Booking updated successfully',
            data: updatedBooking
        }), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error updating booking:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to update booking',
            details: error.message 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Handle OPTIONS request for CORS
export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400'
        }
    });
}
