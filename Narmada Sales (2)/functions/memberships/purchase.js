// Purchase Membership - POST /memberships/purchase
export async function onRequestPost({ request, env }) {
  try {
    const { userId, planId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = await request.json();
    
    // Get plan details
    const planStmt = env.DB.prepare(`
      SELECT * FROM membership_plans WHERE id = ?
    `);
    const plan = await planStmt.bind(planId).first();
    
    if (!plan) {
      return new Response(JSON.stringify({ error: 'Plan not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Create transaction record
    const transactionId = crypto.randomUUID();
    const purchasedAt = Date.now();
    const expiresAt = purchasedAt + (plan.duration_days * 24 * 60 * 60 * 1000);
    
    const transactionStmt = env.DB.prepare(`
      INSERT INTO membership_transactions (
        id, user_id, plan_id, amount, payment_method,
        razorpay_order_id, razorpay_payment_id, razorpay_signature,
        status, purchased_at, expires_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    await transactionStmt.bind(
      transactionId,
      userId,
      planId,
      plan.price,
      'razorpay',
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      'completed',
      purchasedAt,
      expiresAt,
      purchasedAt
    ).run();
    
    // Update user membership
    const userStmt = env.DB.prepare(`
      UPDATE users 
      SET membership_type = ?,
          property_limit = ?,
          membership_expiry = ?,
          updated_at = ?
      WHERE id = ?
    `);
    
    await userStmt.bind(
      planId,
      plan.property_limit,
      expiresAt,
      Date.now(),
      userId
    ).run();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Membership purchased successfully',
      transaction_id: transactionId,
      expires_at: expiresAt
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Error purchasing membership:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to purchase membership',
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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
