// Get User Membership Status - GET /memberships/status/:userId
export async function onRequest({ params, env }) {
  try {
    const userId = params.userId;
    
    // Get user membership info
    const userStmt = env.DB.prepare(`
      SELECT membership_type, property_limit, membership_expiry 
      FROM users 
      WHERE id = ?
    `);
    const user = await userStmt.bind(userId).first();
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Get property count
    const countStmt = env.DB.prepare(`
      SELECT COUNT(*) as count 
      FROM properties 
      WHERE seller_id = ?
    `);
    const countResult = await countStmt.bind(userId).first();
    const propertyCount = countResult.count || 0;
    
    // Get plan details
    let planDetails = null;
    if (user.membership_type && user.membership_type !== 'free') {
      const planStmt = env.DB.prepare(`
        SELECT * FROM membership_plans 
        WHERE id = ?
      `);
      planDetails = await planStmt.bind(user.membership_type).first();
      if (planDetails && planDetails.features) {
        planDetails.features = JSON.parse(planDetails.features);
      }
    }
    
    // Check if membership is expired
    const isExpired = user.membership_expiry && user.membership_expiry < Date.now();
    
    return new Response(JSON.stringify({
      membership_type: user.membership_type || 'free',
      property_limit: user.property_limit || 3,
      property_count: propertyCount,
      remaining_slots: Math.max(0, (user.property_limit || 3) - propertyCount),
      membership_expiry: user.membership_expiry,
      is_expired: isExpired,
      plan_details: planDetails
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Error fetching membership status:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch membership status',
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
