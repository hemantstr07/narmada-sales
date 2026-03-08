# ✅ Cloudflare D1 Deployment Checklist

## Quick Deployment Steps

### ☑️ STEP 1: Install Wrangler
```bash
npm install -g wrangler
wrangler login
```

### ☑️ STEP 2: Create D1 Database
```bash
wrangler d1 create narmadasales-db
```
**📝 Copy the Database ID from output!**

### ☑️ STEP 3: Create Tables
```bash
wrangler d1 execute narmadasales-db --file=schema.sql
```

### ☑️ STEP 4: Add Sample Data
```bash
wrangler d1 execute narmadasales-db --file=seed.sql
```

### ☑️ STEP 5: Push to GitHub
```bash
git add .
git commit -m "Add Cloudflare D1 integration"
git push origin main
```

### ☑️ STEP 6: Deploy to Cloudflare Pages
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Pages**
3. **Create a project**
4. **Connect to Git**
5. Select your repository
6. Build settings:
   - Build command: (empty)
   - Build output directory: `/`
7. **Save and Deploy**

### ☑️ STEP 7: Bind D1 Database
1. Go to your Pages project
2. **Settings** → **Functions**
3. **D1 database bindings**
4. **Add binding:**
   - Variable name: `DB`
   - D1 database: `narmadasales-db`
5. **Save**
6. **Redeploy** (go to Deployments → Retry deployment)

### ☑️ STEP 8: Test Website
1. Open deployed URL
2. Login as seller: `seller1@example.com` / `seller123`
3. Accept a booking
4. ✅ Status should update
5. ✅ Should persist after refresh

---

## 🎯 Files Created

- ✅ `functions/bookings/[id].js` - Booking operations
- ✅ `functions/bookings/index.js` - Create booking
- ✅ `functions/properties/[id].js` - Property operations  
- ✅ `functions/properties/index.js` - Create property
- ✅ `functions/payments.js` - Payment operations
- ✅ `schema.sql` - Database schema
- ✅ `seed.sql` - Sample data

## 🔄 Files Updated

- ✅ `js/dashboard.js` - Uses `/bookings/:id`
- ✅ `js/properties.js` - Uses `/properties/:id`
- ✅ `js/auth.js` - Uses `/bookings`
- ✅ `js/razorpay-config.js` - Uses `/payments`

---

## ✅ Verification

After deployment, test:

- [ ] Booking status updates work
- [ ] Property edit works
- [ ] Property create works
- [ ] Payment creation works
- [ ] All changes persist after refresh
- [ ] No 405 errors

---

## 🐛 Troubleshooting

**If 405 error:**
- Check D1 binding is configured
- Variable name MUST be: `DB`
- Redeploy after adding binding

**If nothing happens:**
- Check Cloudflare Functions logs
- Check browser console
- Verify D1 database has data

---

## 📞 Need Help?

Read full guide: `CLOUDFLARE_D1_DEPLOYMENT.md`

Contact:
- Email: info@narmadasales.com
- Phone: +91 94283 61305

---

**Last Updated:** January 15, 2025
