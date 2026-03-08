// Create New Property - POST /properties
export async function onRequestPost({ request, env }) {
  try {
    const property = await request.json();
    
    // Check user's membership and property limit
    const userStmt = env.DB.prepare(`
      SELECT membership_type, property_limit, membership_expiry 
      FROM users 
      WHERE id = ?
    `);
    const user = await userStmt.bind(property.seller_id).first();
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Check if membership is expired
    if (user.membership_expiry && user.membership_expiry < Date.now()) {
      return new Response(JSON.stringify({ 
        error: 'Membership expired',
        message: 'Your membership has expired. Please upgrade to continue listing properties.'
      }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Count existing properties
    const countStmt = env.DB.prepare(`
      SELECT COUNT(*) as count 
      FROM properties 
      WHERE seller_id = ?
    `);
    const countResult = await countStmt.bind(property.seller_id).first();
    const propertyCount = countResult.count || 0;
    
    // Check if limit reached
    const propertyLimit = user.property_limit || 3;
    if (propertyCount >= propertyLimit) {
      return new Response(JSON.stringify({ 
        error: 'Property limit reached',
        message: `You have reached your property limit of ${propertyLimit}. Please upgrade your membership to list more properties.`,
        current_count: propertyCount,
        limit: propertyLimit
      }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Generate ID if not provided
    const id = property.id || crypto.randomUUID();
    
    // Convert arrays to JSON strings for storage
    const amenities = JSON.stringify(property.amenities || []);
    const images = JSON.stringify(property.images || []);
    
    const stmt = env.DB.prepare(`
      INSERT INTO properties (
        id, seller_id, property_type_id, title, description,
        address, city, state, zipcode, amount,
        bedrooms, bathrooms, area_sqft, amenities, images,
        status, featured, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = await stmt.bind(
      id,
      property.seller_id,
      property.property_type_id,
      property.title,
      property.description,
      property.address,
      property.city,
      property.state,
      property.zipcode,
      property.amount,
      property.bedrooms,
      property.bathrooms,
      property.area_sqft,
      amenities,
      images,
      property.status || 'available',
      property.featured ? 1 : 0,
      Date.now(),
      Date.now()
    ).run();
    
    // Return the created property
    const createdProperty = {
      ...property,
      id,
      amenities: property.amenities || [],
      images: property.images || [],
      created_at: Date.now(),
      updated_at: Date.now()
    };
    
    return new Response(JSON.stringify(createdProperty), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Error creating property:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to create property',
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Handle OPTIONS for CORS
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
