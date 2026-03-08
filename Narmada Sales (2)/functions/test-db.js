// Test Database Connection
export async function onRequestGet({ env }) {
  try {
    // Test if DB binding exists
    if (!env.DB) {
      return new Response(JSON.stringify({
        success: false,
        error: 'D1 database binding not found',
        message: 'Please configure D1 binding in Cloudflare Dashboard: Settings → Functions → D1 database bindings'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Test DB connection
    const testQuery = await env.DB.prepare('SELECT 1 as test').first();
    
    // Test if tables exist
    const tablesQuery = await env.DB.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' 
      ORDER BY name
    `).all();
    
    // Test if membership_plans exists
    let plansCount = 0;
    try {
      const plansQuery = await env.DB.prepare('SELECT COUNT(*) as count FROM membership_plans').first();
      plansCount = plansQuery.count;
    } catch (e) {
      // Table doesn't exist
    }
    
    return new Response(JSON.stringify({
      success: true,
      db_connected: true,
      test_result: testQuery,
      tables: tablesQuery.results.map(t => t.name),
      membership_plans_count: plansCount,
      message: plansCount === 0 
        ? '⚠️ Database connected but membership_plans table is empty. Run: wrangler d1 execute narmadasales-db --file=schema-update-membership.sql'
        : '✅ Everything looks good!'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack,
      message: 'Database connection failed. Check D1 binding configuration.'
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
