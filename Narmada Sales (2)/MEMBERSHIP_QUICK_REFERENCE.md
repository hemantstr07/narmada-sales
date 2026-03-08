# Membership Feature - Quick Reference

## 🚀 Quick Setup (5 Minutes)

### 1. Run Database Migration
```bash
wrangler d1 execute narmadasales-db --file=schema-update-membership.sql
```

### 2. Deploy to Cloudflare
```bash
git add .
git commit -m "Add membership feature"
git push origin main
```

### 3. Test
- Login as seller
- Go to "Membership" in dashboard
- Try purchasing a plan with test card: 4111 1111 1111 1111

## 📊 Membership Plans

| Plan | Price | Properties | Best For |
|------|-------|-----------|----------|
| **Free** | ₹0 | 3 | Getting started |
| **Basic** | ₹1,000/yr | 10 | Growing sellers |
| **Standard** | ₹1,500/yr | 15 | Active sellers |
| **Premium** | ₹2,000/yr | 20 | Professional sellers |

## 🔑 Key Features

### For Sellers
✅ View current membership status
✅ Track property usage (X/Y properties)
✅ Upgrade membership instantly
✅ Automatic limit increase after payment
✅ Property limit enforcement
✅ Expiry tracking

### For Admins
✅ All membership plans stored in database
✅ Transaction history tracking
✅ Razorpay payment integration
✅ Automatic user updates

## 🛠️ API Endpoints

### Get Plans
```
GET /memberships
```

### Get User Status
```
GET /memberships/status/:userId
```

### Purchase Membership
```
POST /memberships/purchase
{
  "userId": "user_id",
  "planId": "plan_basic",
  "razorpayPaymentId": "pay_xxx",
  "razorpayOrderId": "order_xxx",
  "razorpaySignature": "signature_xxx"
}
```

### Create Property (with limit check)
```
POST /properties
```
Returns 403 if limit reached.

## 🎯 User Experience Flow

### First Time Seller
1. Register as seller
2. Automatically gets **Free Plan** (3 properties)
3. Can list up to 3 properties
4. Sees "Membership" menu in dashboard

### Adding Properties
1. Click "Add Property"
2. System checks membership limit
3. If limit reached → Upgrade prompt
4. If expired → Renew prompt
5. If within limit → Add property modal opens

### Upgrading Membership
1. Go to "Membership" page
2. Compare plans
3. Click "Upgrade Now" on desired plan
4. Razorpay checkout opens
5. Complete payment
6. Membership updated instantly
7. Can add more properties immediately

## 🐛 Common Issues & Fixes

### Issue: Plans not loading
```bash
# Check if plans exist
wrangler d1 execute narmadasales-db --command="SELECT * FROM membership_plans"

# If empty, re-run migration
wrangler d1 execute narmadasales-db --file=schema-update-membership.sql
```

### Issue: Property limit not enforced
```bash
# Check user has property_limit
wrangler d1 execute narmadasales-db --command="SELECT email, property_limit FROM users WHERE role='seller'"

# If NULL, update manually
wrangler d1 execute narmadasales-db --command="UPDATE users SET property_limit=3 WHERE role='seller' AND property_limit IS NULL"
```

### Issue: Payment succeeds but membership not updated
```bash
# Check transactions table
wrangler d1 execute narmadasales-db --command="SELECT * FROM membership_transactions ORDER BY created_at DESC LIMIT 5"

# Manually update user
wrangler d1 execute narmadasales-db --command="UPDATE users SET membership_type='plan_basic', property_limit=10, membership_expiry=CAST((julianday('now') + 365) * 24 * 60 * 60 * 1000 AS INTEGER) WHERE id='USER_ID'"
```

## 📱 UI Components

### Membership Banner (Dashboard)
Shows on seller dashboard:
- 🔵 **Info** (blue): Normal status, plenty of slots
- 🟡 **Warning** (yellow): Low slots (≤2 remaining)
- 🔴 **Error** (red): Expired or limit reached

### Membership Page
- Current status card
- Property usage stats
- Plans comparison grid
- FAQ section

### Add Property Check
- Pre-validation before modal opens
- API validation on submit
- Upgrade prompts on limit reached

## 🧪 Testing Checklist

- [ ] Free plan assigned to new sellers
- [ ] Can list up to 3 properties on free plan
- [ ] Blocked from listing 4th property
- [ ] Membership page loads correctly
- [ ] All 4 plans visible
- [ ] Razorpay checkout opens
- [ ] Test payment succeeds
- [ ] Membership updates after payment
- [ ] Property limit increases
- [ ] Can add more properties
- [ ] Expiry date set correctly (365 days)
- [ ] Membership banner shows on dashboard

## 💡 Tips

1. **Test with Demo Seller**:
   - Email: seller1@example.com
   - Password: seller123

2. **Quick Property Count Check**:
   ```bash
   wrangler d1 execute narmadasales-db --command="SELECT u.email, COUNT(p.id) as count, u.property_limit FROM users u LEFT JOIN properties p ON u.id=p.seller_id WHERE u.role='seller' GROUP BY u.id"
   ```

3. **Reset Seller for Testing**:
   ```bash
   # Delete all properties
   wrangler d1 execute narmadasales-db --command="DELETE FROM properties WHERE seller_id='SELLER_ID'"
   
   # Reset to free plan
   wrangler d1 execute narmadasales-db --command="UPDATE users SET membership_type='free', property_limit=3, membership_expiry=NULL WHERE id='SELLER_ID'"
   ```

## 📞 Support

**Questions?** See:
- `MEMBERSHIP_DEPLOYMENT_GUIDE.md` - Full deployment guide
- `README.md` - Project overview
- `TROUBLESHOOTING.md` - Common issues

**Contact**: info@narmadasales.com

---

**Version**: 1.0.0 | **Last Updated**: 2026-03-05
