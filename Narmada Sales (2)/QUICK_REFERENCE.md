# 🚀 Quick Start Guide - Narmada Sales

## 📋 What You Need to Know in 2 Minutes

### 🎯 What is Narmada Sales?
Indian property booking platform with:
- 🏠 Property listings across India
- 💳 Razorpay payments in INR
- 👥 Admin, Buyer, Seller roles
- 📱 Responsive design
- 🎨 Professional beige theme

### 📞 Contact
- **Phone:** +91 94283 61305
- **Email:** info@narmadasales.com

---

## ⚡ Quick Deploy (5 Minutes)

### 1. Deploy to Cloudflare Pages (2 min)
```
1. Push to GitHub
2. Go to Cloudflare Pages
3. Connect repo → Deploy
```

### 2. Setup Database (2 min)
Open deployed site → Press F12 → Run:
```javascript
const API_BASE = 'https://YOUR-DOMAIN.com'; // Change this!

async function quickSetup() {
    const create = async (table, data) => {
        await fetch(`${API_BASE}/tables/${table}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    };

    // Admin
    await create('users', {
        id: 'user-admin-001',
        email: 'admin@narmadasales.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        phone: '+91 94283 61305',
        address: 'Mumbai, Maharashtra',
        status: 'active',
        profile_image: 'https://ui-avatars.com/api/?name=Admin&background=d4a574&color=fff'
    });

    // Property Types
    await create('property_types', {
        id: 'type-001',
        name: 'Apartment',
        description: 'Modern apartments'
    });

    await create('property_types', {
        id: 'type-002',
        name: 'Villa',
        description: 'Luxury villas'
    });

    console.log('✅ Setup complete!');
}

quickSetup();
```

### 3. Test (1 min)
- Login: admin@narmadasales.com / admin123
- Add a property as seller
- Test payment flow

---

## 🔑 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@narmadasales.com | admin123 |
| Buyer | buyer1@example.com | buyer123 |
| Seller | seller1@example.com | seller123 |

---

## 💳 Test Razorpay Payments

### Test Cards:
- **4111 1111 1111 1111** ✅ Success
- **5555 5555 5555 4444** ✅ Success
- CVV: 123, Expiry: 12/25

### Test UPI:
- **success@razorpay** ✅
- **failure@razorpay** ❌ (for testing)

---

## 📁 Important Files

### For Deployment:
- `CLOUDFLARE_DEPLOYMENT_GUIDE.md` - Full deployment guide
- `database-import.js` - 10 Indian properties
- `TROUBLESHOOTING.md` - Fix common issues

### For Reference:
- `README.md` - Complete documentation
- `COMPLETE_UPDATE_SUMMARY.md` - All changes made

---

## 🐛 Common Issues

### Razorpay not working?
```javascript
// Check if loaded
console.log('Razorpay:', typeof Razorpay);
// Should show: 'function'
```

### Properties not showing?
```javascript
// Reload properties
loadAllProperties();
```

### Images not displaying?
- Use valid image URLs
- Check browser console for errors

**Full solutions:** See `TROUBLESHOOTING.md`

---

## 📊 What's Included

### Website:
- ✅ Homepage with featured properties
- ✅ Property search and filters
- ✅ User authentication (3 roles)
- ✅ Razorpay payment gateway
- ✅ Admin dashboard
- ✅ Seller property management
- ✅ Buyer booking system

### Database (Ready to Import):
- ✅ 10 Indian properties
- ✅ 5 users (admin, buyers, sellers)
- ✅ 5 property types
- ✅ Sample bookings and payments

### Documentation:
- ✅ README with full details
- ✅ Deployment guide
- ✅ Troubleshooting guide
- ✅ Database import scripts

---

## 🎨 Features Highlights

### Visitor (No Login):
- Browse properties
- Search by location, price
- View details
- Register

### Buyer:
- Search properties
- Book appointments
- Pay via Razorpay (INR)
- Give feedback

### Seller:
- Add properties
- Upload images
- Manage bookings
- Track payments

### Admin:
- Manage users
- Verify documents
- View analytics
- Generate invoices

---

## 💡 Pro Tips

1. **Use Chrome/Firefox** for best experience
2. **Enable JavaScript** (required)
3. **Check console** (F12) for errors
4. **Test in incognito** to verify clean install
5. **Use test mode** for Razorpay initially

---

## 📞 Need Help?

**Quick Help:**
- Check `TROUBLESHOOTING.md`
- Run diagnostics in console
- Check browser console for errors

**Contact:**
- Email: info@narmadasales.com
- Phone: +91 94283 61305

---

## ✅ Checklist Before Launch

- [ ] Deployed to Cloudflare Pages
- [ ] Database setup completed
- [ ] Admin login works
- [ ] Properties are showing
- [ ] Razorpay opens correctly
- [ ] Test payment successful
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled

---

## 🎉 You're Ready!

Your Narmada Sales platform is ready to use with:
- 🎨 Professional beige theme
- 💳 Razorpay payments in INR
- 🏠 Indian property listings
- 📱 Responsive design
- 🔐 Secure authentication

**Start by:** Opening your deployed site and logging in!

---

**Narmada Sales** - Your trusted property booking platform 🏡

*Last Updated: January 14, 2025*
