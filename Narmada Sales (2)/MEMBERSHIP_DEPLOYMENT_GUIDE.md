# Membership Feature Deployment Guide

## 🎉 Overview

The membership feature allows sellers to upgrade their accounts and list more properties. This comprehensive system includes:

- **Free Plan**: 3 properties (default for all sellers)
- **Basic Plan (₹1,000)**: 10 properties
- **Standard Plan (₹1,500)**: 15 properties
- **Premium Plan (₹2,000)**: 20 properties

## 📋 Deployment Steps for Cloudflare D1

### Step 1: Update Database Schema

Run the migration script to add membership tables and fields:

```bash
wrangler d1 execute narmadasales-db --file=schema-update-membership.sql
```

This will:
- Add `membership_type`, `property_limit`, and `membership_expiry` columns to users table
- Create `membership_plans` table with 4 default plans
- Create `membership_transactions` table to track purchases
- Update existing sellers to free plan (3 properties)

### Step 2: Verify Database Changes

Check that tables were created successfully:

```bash
wrangler d1 execute narmadasales-db --command="SELECT * FROM membership_plans"
wrangler d1 execute narmadasales-db --command="PRAGMA table_info(users)"
```

### Step 3: Deploy to Cloudflare Pages

The following files have been added/updated:

**New Files:**
- `functions/memberships/index.js` - Get membership plans
- `functions/memberships/purchase.js` - Purchase membership
- `functions/memberships/status/[userId].js` - Get user membership status
- `js/membership.js` - Frontend membership management
- `css/membership.css` - Membership UI styles
- `schema-update-membership.sql` - Database migration script

**Updated Files:**
- `schema.sql` - Updated with membership tables
- `functions/properties/index.js` - Added property limit check
- `js/dashboard.js` - Added membership menu and status banner
- `js/properties.js` - Added limit check before adding property
- `index.html` - Added membership CSS and JS includes

Deploy changes:
```bash
git add .
git commit -m "Add membership feature for sellers"
git push origin main
```

Cloudflare Pages will automatically deploy.

### Step 4: Test Membership Feature

1. **Login as a seller** (use existing demo account or create new)
2. **Navigate to Dashboard** → Click "Membership" in sidebar
3. **View Current Status**:
   - Should show "Free Plan"
   - 0/3 properties listed
   - Available slots: 3
4. **Try to add 4th property**:
   - Add 3 properties first
   - Try adding a 4th property
   - Should be blocked with upgrade prompt
5. **Purchase Membership**:
   - Click "Upgrade Now" on any paid plan
   - Razorpay checkout should open
   - Use test credentials:
     - Card: 4111 1111 1111 1111
     - CVV: Any 3 digits
     - Expiry: Any future date
6. **Verify Upgrade**:
   - Membership page should refresh
   - New plan should show as "Current Plan"
   - Property limit should increase
   - Can now add more properties

## 🔍 API Endpoints

### Get Membership Plans
```
GET /memberships
```
Returns all active membership plans with features.

### Get User Membership Status
```
GET /memberships/status/:userId
```
Returns user's current membership info, property count, and remaining slots.

### Purchase Membership
```
POST /memberships/purchase
Body: {
  userId: string,
  planId: string,
  razorpayPaymentId: string,
  razorpayOrderId: string,
  razorpaySignature: string
}
```
Records membership purchase and updates user limits.

### Create Property (Updated)
```
POST /properties
```
Now checks membership limits before allowing property creation.

## 🎨 Frontend Features

### Seller Dashboard Enhancements

1. **Membership Banner** - Shows at top of dashboard:
   - Active status (blue) for healthy accounts
   - Warning (yellow) for low slots (<= 2 remaining)
   - Error (red) for expired or limit reached

2. **Membership Management Page**:
   - Current membership status card
   - Property usage statistics
   - Available plans grid
   - Plan comparison
   - FAQ section

3. **Property Limit Enforcement**:
   - Pre-check before opening add property modal
   - API-level validation
   - Graceful error handling with upgrade prompts

### Membership Menu Item
New "Membership" item added to seller sidebar with crown icon.

## 💳 Payment Integration

Uses existing Razorpay integration for secure payments:
- All transactions in INR (₹)
- Test mode enabled
- Real-time payment verification
- Transaction history stored in database

## 🔒 Security Features

1. **API-Level Validation**: Property limits enforced in Cloudflare Functions
2. **Expiry Checks**: Membership expiry verified before property creation
3. **Transaction Recording**: All purchases tracked with Razorpay IDs
4. **User Updates**: Membership info synced after purchase

## 🐛 Troubleshooting

### Membership Plans Not Loading

**Issue**: Plans don't appear on membership page

**Solution**:
```bash
# Verify plans exist in database
wrangler d1 execute narmadasales-db --command="SELECT * FROM membership_plans"

# If empty, re-run migration
wrangler d1 execute narmadasales-db --file=schema-update-membership.sql
```

### Property Limit Not Enforced

**Issue**: Can add more properties than allowed

**Solution**:
1. Check users table has membership columns:
```bash
wrangler d1 execute narmadasales-db --command="PRAGMA table_info(users)"
```

2. Verify user has property_limit set:
```bash
wrangler d1 execute narmadasales-db --command="SELECT id, email, property_limit FROM users WHERE role='seller'"
```

3. Check property creation API is updated (functions/properties/index.js)

### Membership Status API Error

**Issue**: `/memberships/status/:userId` returns 500 error

**Solution**:
1. Verify Cloudflare Function deployed correctly
2. Check D1 database binding in wrangler.toml
3. View function logs in Cloudflare dashboard

### Payment Not Processing

**Issue**: Razorpay payment succeeds but membership not upgraded

**Solution**:
1. Check `/memberships/purchase` endpoint logs
2. Verify transaction was recorded:
```bash
wrangler d1 execute narmadasales-db --command="SELECT * FROM membership_transactions ORDER BY created_at DESC LIMIT 5"
```

3. Manually update user if needed:
```bash
wrangler d1 execute narmadasales-db --command="UPDATE users SET membership_type='plan_basic', property_limit=10, membership_expiry=CAST((julianday('now') + 365) * 24 * 60 * 60 * 1000 AS INTEGER) WHERE id='USER_ID'"
```

## 📊 Database Queries

### Check All Sellers and Their Limits
```sql
SELECT id, email, name, membership_type, property_limit, 
       datetime(membership_expiry/1000, 'unixepoch') as expiry
FROM users 
WHERE role = 'seller'
ORDER BY created_at DESC;
```

### View Recent Membership Purchases
```sql
SELECT mt.id, u.email, mp.name as plan_name, mt.amount,
       datetime(mt.purchased_at/1000, 'unixepoch') as purchased,
       datetime(mt.expires_at/1000, 'unixepoch') as expires,
       mt.status
FROM membership_transactions mt
JOIN users u ON mt.user_id = u.id
JOIN membership_plans mp ON mt.plan_id = mp.id
ORDER BY mt.created_at DESC
LIMIT 10;
```

### Property Count by Seller
```sql
SELECT u.email, u.property_limit, COUNT(p.id) as property_count,
       (u.property_limit - COUNT(p.id)) as remaining_slots
FROM users u
LEFT JOIN properties p ON u.id = p.seller_id
WHERE u.role = 'seller'
GROUP BY u.id
ORDER BY property_count DESC;
```

## ✅ Testing Checklist

- [ ] Database migration completed successfully
- [ ] Membership plans visible in database
- [ ] Existing users have free plan assigned
- [ ] Membership page loads without errors
- [ ] Can view membership plans
- [ ] Razorpay checkout opens on upgrade
- [ ] Test payment completes successfully
- [ ] Membership updates after payment
- [ ] Property limit enforced correctly
- [ ] Can add properties within limit
- [ ] Cannot add properties over limit
- [ ] Upgrade prompt shown when limit reached
- [ ] Membership banner shows on dashboard
- [ ] Expiry dates calculated correctly

## 🚀 Go Live Checklist

Before deploying to production:

1. **Update Razorpay to Live Mode**:
   - Get live API keys from Razorpay dashboard
   - Update `js/razorpay-config.js`
   - Test with small real transaction

2. **Set Production Prices**:
   - Review and adjust plan prices if needed
   - Update in `schema-update-membership.sql`
   - Re-run migration on production database

3. **Add Terms & Conditions**:
   - Add membership terms link
   - Add refund policy
   - Add auto-renewal notice (if applicable)

4. **Monitor Initial Purchases**:
   - Watch for payment errors
   - Verify database updates
   - Check email notifications (if implemented)

## 📝 Future Enhancements

Consider adding:
- Email notifications for membership purchases
- Auto-renewal before expiry
- Prorated upgrades
- Membership history page
- Admin panel for membership management
- Discount codes/coupons
- Referral program

## 📞 Support

For issues or questions:
- Check Cloudflare Functions logs
- Review D1 database queries
- Test API endpoints directly
- Contact: info@narmadasales.com

---

**Last Updated**: 2026-03-05
**Version**: 1.0.0
