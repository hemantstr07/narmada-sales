// Get All Membership Plans - GET /memberships
export async function onRequestGet({ env }) {
  try {
    const stmt = env.DB.prepare(`
      SELECT * FROM membership_plans 
      WHERE status = 'active'
      ORDER BY price ASC
    `);
    
    const { results } = await stmt.all();
    
    // Parse features JSON
    const plans = results.map(plan => ({
      ...plan,
      features: plan.features ? JSON.parse(plan.features) : []
    }));
    
    return new Response(JSON.stringify(plans), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Error fetching membership plans:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch membership plans',
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
