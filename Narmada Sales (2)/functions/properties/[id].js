/**
 * Cloudflare Pages Function for Property Operations
 * Endpoint: /properties/:id
 * Methods: GET, PATCH, DELETE
 * Database: D1 (binding name: DB)
 */

export async function onRequestGet(context) {
    try {
        const { params, env } = context;
        const propertyId = params.id;

        const result = await env.DB.prepare(
            'SELECT * FROM properties WHERE id = ?'
        ).bind(propertyId).first();

        if (!result) {
            return new Response(JSON.stringify({ error: 'Property not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Parse JSON fields
        if (result.images && typeof result.images === 'string') {
            result.images = JSON.parse(result.images);
        }
        if (result.amenities && typeof result.amenities === 'string') {
            result.amenities = JSON.parse(result.amenities);
        }

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error fetching property:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to fetch property',
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
        const propertyId = params.id;

        const body = await request.json();

        // Convert arrays to JSON strings for D1
        const images = JSON.stringify(body.images || []);
        const amenities = JSON.stringify(body.amenities || []);

        const result = await env.DB.prepare(`
            UPDATE properties SET 
                property_type_id = ?,
                title = ?,
                description = ?,
                address = ?,
                city = ?,
                state = ?,
                zipcode = ?,
                amount = ?,
                bedrooms = ?,
                bathrooms = ?,
                area_sqft = ?,
                amenities = ?,
                images = ?,
                status = ?,
                featured = ?,
                updated_at = ?
            WHERE id = ?
        `).bind(
            body.property_type_id,
            body.title,
            body.description,
            body.address,
            body.city,
            body.state,
            body.zipcode,
            body.amount,
            body.bedrooms,
            body.bathrooms,
            body.area_sqft,
            amenities,
            images,
            body.status,
            body.featured ? 1 : 0,
            Date.now(),
            propertyId
        ).run();

        if (result.meta.changes === 0) {
            return new Response(JSON.stringify({ 
                error: 'Property not found or not updated' 
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Fetch updated property
        const updatedProperty = await env.DB.prepare(
            'SELECT * FROM properties WHERE id = ?'
        ).bind(propertyId).first();

        // Parse JSON fields
        if (updatedProperty.images && typeof updatedProperty.images === 'string') {
            updatedProperty.images = JSON.parse(updatedProperty.images);
        }
        if (updatedProperty.amenities && typeof updatedProperty.amenities === 'string') {
            updatedProperty.amenities = JSON.parse(updatedProperty.amenities);
        }

        console.log('Property updated successfully:', propertyId);

        return new Response(JSON.stringify({
            success: true,
            message: 'Property updated successfully',
            data: updatedProperty
        }), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error updating property:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to update property',
            details: error.message 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function onRequestDelete(context) {
    try {
        const { params, env } = context;
        const propertyId = params.id;

        const result = await env.DB.prepare(
            'DELETE FROM properties WHERE id = ?'
        ).bind(propertyId).run();

        if (result.meta.changes === 0) {
            return new Response(JSON.stringify({ 
                error: 'Property not found' 
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log('Property deleted successfully:', propertyId);

        return new Response(JSON.stringify({
            success: true,
            message: 'Property deleted successfully'
        }), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error deleting property:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to delete property',
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
            'Access-Control-Allow-Methods': 'GET, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400'
        }
    });
}
