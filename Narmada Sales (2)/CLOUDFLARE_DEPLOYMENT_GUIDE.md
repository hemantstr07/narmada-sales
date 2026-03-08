# Database Setup Queries for Narmada Sales

## IMPORTANT: For Cloudflare Deployment

This document contains SQL queries and instructions for setting up the database for Narmada Sales property booking platform.

---

## 1. Admin User Setup

```sql
-- Create Admin User
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image)
VALUES (
    'user-admin-001',
    'admin@narmadasales.com',
    'admin123',
    'admin',
    'Admin User',
    '+91 94283 61305',
    'Narmada Sales HQ, Mumbai, Maharashtra',
    'active',
    'https://ui-avatars.com/api/?name=Admin+User&background=d4a574&color=fff'
);
```

---

## 2. Sample Buyer Accounts

```sql
-- Buyer 1
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image)
VALUES (
    'user-buyer-001',
    'buyer1@example.com',
    'buyer123',
    'buyer',
    'Rajesh Kumar',
    '+91 98765 43210',
    '123 MG Road, Bangalore, Karnataka',
    'active',
    'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=28a745&color=fff'
);

-- Buyer 2
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image)
VALUES (
    'user-buyer-002',
    'buyer2@example.com',
    'buyer123',
    'buyer',
    'Priya Sharma',
    '+91 99887 76655',
    '456 Park Street, Kolkata, West Bengal',
    'active',
    'https://ui-avatars.com/api/?name=Priya+Sharma&background=28a745&color=fff'
);
```

---

## 3. Sample Seller Accounts

```sql
-- Seller 1
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image)
VALUES (
    'user-seller-001',
    'seller1@example.com',
    'seller123',
    'seller',
    'Amit Patel',
    '+91 97654 32109',
    '789 Ring Road, Ahmedabad, Gujarat',
    'active',
    'https://ui-avatars.com/api/?name=Amit+Patel&background=007bff&color=fff'
);

-- Seller 2
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image)
VALUES (
    'user-seller-002',
    'seller2@example.com',
    'seller123',
    'seller',
    'Sunita Reddy',
    '+91 96543 21098',
    '321 Banjara Hills, Hyderabad, Telangana',
    'active',
    'https://ui-avatars.com/api/?name=Sunita+Reddy&background=007bff&color=fff'
);
```

---

## 4. Property Types Setup

```sql
-- Apartment
INSERT INTO property_types (id, name, description)
VALUES ('type-001', 'Apartment', 'Modern apartments in prime locations');

-- Villa
INSERT INTO property_types (id, name, description)
VALUES ('type-002', 'Villa', 'Luxury villas with premium amenities');

-- Independent House
INSERT INTO property_types (id, name, description)
VALUES ('type-003', 'Independent House', 'Spacious independent houses');

-- Plot
INSERT INTO property_types (id, name, description)
VALUES ('type-004', 'Plot', 'Residential and commercial plots');

-- Commercial Space
INSERT INTO property_types (id, name, description)
VALUES ('type-005', 'Commercial Space', 'Office spaces and shops');
```

---

## 5. Using REST API (For Cloudflare or any REST backend)

### Create Admin User (cURL)
```bash
curl -X POST https://your-domain.com/tables/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "user-admin-001",
    "email": "admin@narmadasales.com",
    "password": "admin123",
    "role": "admin",
    "name": "Admin User",
    "phone": "+91 94283 61305",
    "address": "Narmada Sales HQ, Mumbai, Maharashtra",
    "status": "active",
    "profile_image": "https://ui-avatars.com/api/?name=Admin+User&background=d4a574&color=fff"
  }'
```

### Batch Create Multiple Users (JavaScript)
```javascript
const users = [
  {
    id: 'user-admin-001',
    email: 'admin@narmadasales.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    phone: '+91 94283 61305',
    address: 'Narmada Sales HQ, Mumbai, Maharashtra',
    status: 'active',
    profile_image: 'https://ui-avatars.com/api/?name=Admin+User&background=d4a574&color=fff'
  },
  // Add more users...
];

async function createUsers() {
  for (const user of users) {
    const response = await fetch('https://your-domain.com/tables/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    const result = await response.json();
    console.log('Created user:', result);
  }
}

createUsers();
```

---

## 6. Quick Setup Script (Copy & Paste into Browser Console)

**IMPORTANT: Replace `YOUR_DOMAIN` with your actual Cloudflare deployment URL**

```javascript
// Configuration
const API_BASE = 'https://YOUR_DOMAIN.com'; // ⚠️ CHANGE THIS!

// Helper function
async function create(table, data) {
    const res = await fetch(`${API_BASE}/tables/${table}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await res.json();
}

// Run this to create everything
async function setupDatabase() {
    console.log('Creating admin...');
    await create('users', {
        id: 'user-admin-001',
        email: 'admin@narmadasales.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        phone: '+91 94283 61305',
        address: 'Narmada Sales HQ, Mumbai, Maharashtra',
        status: 'active',
        profile_image: 'https://ui-avatars.com/api/?name=Admin+User&background=d4a574&color=fff'
    });
    
    console.log('Creating buyers...');
    await create('users', {
        id: 'user-buyer-001',
        email: 'buyer1@example.com',
        password: 'buyer123',
        role: 'buyer',
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        address: '123 MG Road, Bangalore, Karnataka',
        status: 'active',
        profile_image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=28a745&color=fff'
    });
    
    console.log('Creating sellers...');
    await create('users', {
        id: 'user-seller-001',
        email: 'seller1@example.com',
        password: 'seller123',
        role: 'seller',
        name: 'Amit Patel',
        phone: '+91 97654 32109',
        address: '789 Ring Road, Ahmedabad, Gujarat',
        status: 'active',
        profile_image: 'https://ui-avatars.com/api/?name=Amit+Patel&background=007bff&color=fff'
    });
    
    console.log('Creating property types...');
    await create('property_types', {
        id: 'type-001',
        name: 'Apartment',
        description: 'Modern apartments in prime locations'
    });
    
    await create('property_types', {
        id: 'type-002',
        name: 'Villa',
        description: 'Luxury villas with premium amenities'
    });
    
    await create('property_types', {
        id: 'type-003',
        name: 'Independent House',
        description: 'Spacious independent houses'
    });
    
    console.log('✅ Basic setup completed!');
    console.log('Use database-import.js for full property data import');
}

// Execute setup
setupDatabase();
```

---

## 7. Default Login Credentials

After running the setup, you can login with these accounts:

### Admin Account
- **Email:** admin@narmadasales.com
- **Password:** admin123
- **Role:** Admin

### Buyer Account
- **Email:** buyer1@example.com
- **Password:** buyer123
- **Role:** Buyer

### Seller Account
- **Email:** seller1@example.com
- **Password:** seller123
- **Role:** Seller

---

## 8. Deployment Instructions for Cloudflare

### Step 1: Deploy on Cloudflare Pages
1. Go to Cloudflare Dashboard → Pages
2. Connect your GitHub repository
3. Set build settings:
   - Build command: (leave empty for static site)
   - Build output directory: `/`
4. Deploy!

### Step 2: Set up Database
1. Your database tables are already configured in the code
2. Open your deployed site in browser
3. Open Browser Console (F12)
4. Copy and paste the "Quick Setup Script" from above
5. Update `API_BASE` with your actual domain
6. Run the script

### Step 3: Import Full Property Data
1. Open `database-import.js` in a code editor
2. Update `API_BASE_URL` with your Cloudflare Pages URL
3. Open browser console on your deployed site
4. Copy and paste the entire content of `database-import.js`
5. Run: `importAllData()`

---

## 9. Verification

After setup, verify by:
1. Visit your deployed site
2. Click "Login"
3. Use admin credentials: admin@narmadasales.com / admin123
4. Check if properties are loading on homepage
5. Test all features (search, booking, payment)

---

## 10. Production Notes

### Security (IMPORTANT!)
⚠️ **Before going to production:**
1. Change all default passwords
2. Implement proper password hashing
3. Add authentication middleware
4. Enable HTTPS only
5. Add rate limiting
6. Implement CORS properly

### Database Backup
- Export data regularly using REST API
- Keep backups of all user and property data

### Contact Information
- **Phone:** +91 94283 61305
- **Email:** info@narmadasales.com

---

## Need Help?

If you encounter any issues:
1. Check browser console for errors
2. Verify API endpoint URLs are correct
3. Ensure database tables are created
4. Check network tab for failed requests

---

**Last Updated:** 2025-01-14
**Version:** 1.0
