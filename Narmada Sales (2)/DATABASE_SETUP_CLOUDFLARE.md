# Narmada Sales - Database Setup for Cloudflare Deployment

## Complete Database Import Queries

### 1. CREATE USERS (Admin, Buyers, Sellers)

```sql
-- Admin User
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image)
VALUES (
  'admin-001',
  'admin@narmadasales.com',
  'admin123',
  'admin',
  'Narmada Sales Admin',
  '+91-94283-61305',
  'Narmada Sales Office, India',
  'active',
  'https://ui-avatars.com/api/?name=Admin&background=ff6b35&color=fff'
);

-- Buyer 1
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image)
VALUES (
  'buyer-001',
  'rajesh.kumar@email.com',
  'buyer123',
  'buyer',
  'Rajesh Kumar',
  '+91-98765-43210',
  '123, Green Park, Delhi, India 110016',
  'active',
  'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=10b981&color=fff'
);

-- Buyer 2
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image)
VALUES (
  'buyer-002',
  'priya.sharma@email.com',
  'buyer123',
  'buyer',
  'Priya Sharma',
  '+91-98765-43211',
  '456, Koramangala, Bangalore, Karnataka 560034',
  'active',
  'https://ui-avatars.com/api/?name=Priya+Sharma&background=10b981&color=fff'
);

-- Seller 1
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image)
VALUES (
  'seller-001',
  'amit.properties@email.com',
  'seller123',
  'seller',
  'Amit Real Estate',
  '+91-98765-43212',
  '789, Bandra West, Mumbai, Maharashtra 400050',
  'active',
  'https://ui-avatars.com/api/?name=Amit+Real+Estate&background=ff6b35&color=fff'
);

-- Seller 2
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image)
VALUES (
  'seller-002',
  'sunita.homes@email.com',
  'seller123',
  'seller',
  'Sunita Premium Homes',
  '+91-98765-43213',
  '321, Jubilee Hills, Hyderabad, Telangana 500033',
  'active',
  'https://ui-avatars.com/api/?name=Sunita+Homes&background=ff6b35&color=fff'
);
```

### 2. CREATE PROPERTY TYPES

```sql
INSERT INTO property_types (id, name, description) VALUES
('type-001', 'Apartment', 'Multi-unit residential building'),
('type-002', 'Villa', 'Luxury standalone residence'),
('type-003', 'Independent House', 'Single-family detached home'),
('type-004', 'Flat', 'Residential unit in a multi-story building'),
('type-005', 'Penthouse', 'Luxury apartment on top floor'),
('type-006', 'Bungalow', 'Single-story detached house'),
('type-007', 'Duplex', 'Two-floor residential unit'),
('type-008', 'Studio Apartment', 'Open-plan living space'),
('type-009', 'Row House', 'Terraced house in a row'),
('type-010', 'Farmhouse', 'Rural property with land');
```

### 3. CREATE PROPERTIES (Indian Real Estate)

```sql
-- Property 1: Luxury Villa in Goa
INSERT INTO properties (
  id, seller_id, property_type_id, title, description, 
  address, city, state, zipcode, amount, 
  bedrooms, bathrooms, area_sqft, amenities, images, status, featured
) VALUES (
  'prop-001',
  'seller-001',
  'type-002',
  'Luxury Beach Villa in North Goa',
  'Stunning 4-bedroom villa with private pool, located just 500m from Anjuna Beach. Perfect for luxury living with modern amenities and breathtaking sea views. Fully furnished with imported fixtures.',
  'Beach Road, Anjuna',
  'Goa',
  'Goa',
  '403509',
  85000000,
  4,
  4,
  3500,
  '["Private Pool", "Beach Access", "Gym", "Garden", "Parking", "24/7 Security", "Power Backup", "Modular Kitchen"]',
  '["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"]',
  'available',
  true
);

-- Property 2: Modern Apartment in Bangalore
INSERT INTO properties (
  id, seller_id, property_type_id, title, description,
  address, city, state, zipcode, amount,
  bedrooms, bathrooms, area_sqft, amenities, images, status, featured
) VALUES (
  'prop-002',
  'seller-001',
  'type-001',
  '3BHK Modern Apartment in Whitefield',
  'Spacious 3-bedroom apartment in prime Whitefield location. Walking distance to tech parks, malls, and schools. Gated community with all modern amenities.',
  '123, ITPL Main Road, Whitefield',
  'Bangalore',
  'Karnataka',
  '560066',
  12500000,
  3,
  3,
  1850,
  '["Gym", "Swimming Pool", "Parking", "Clubhouse", "Children Play Area", "24/7 Security", "Power Backup", "Lift"]',
  '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"]',
  'available',
  true
);

-- Property 3: Independent House in Delhi
INSERT INTO properties (
  id, seller_id, property_type_id, title, description,
  address, city, state, zipcode, amount,
  bedrooms, bathrooms, area_sqft, amenities, images, status, featured
) VALUES (
  'prop-003',
  'seller-002',
  'type-003',
  'Spacious 4BHK Independent House in South Delhi',
  'Beautiful independent house in prime South Delhi location. Large garden, parking for 3 cars, and separate servant quarters. Perfect for large families.',
  '456, Greater Kailash-1',
  'New Delhi',
  'Delhi',
  '110048',
  65000000,
  4,
  4,
  3200,
  '["Garden", "Parking", "Terrace", "Modular Kitchen", "Study Room", "Servant Room", "Solar Panels"]',
  '["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800", "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800"]',
  'available',
  true
);

-- Property 4: Luxury Penthouse in Mumbai
INSERT INTO properties (
  id, seller_id, property_type_id, title, description,
  address, city, state, zipcode, amount,
  bedrooms, bathrooms, area_sqft, amenities, images, status, featured
) VALUES (
  'prop-004',
  'seller-002',
  'type-005',
  'Premium Penthouse with Sea View - Worli',
  'Spectacular penthouse with panoramic Arabian Sea views. Top floor luxury living with private terrace, Jacuzzi, and world-class amenities. Fully automated smart home.',
  'Worli Sea Face',
  'Mumbai',
  'Maharashtra',
  '400018',
  250000000,
  4,
  5,
  5000,
  '["Sea View", "Private Terrace", "Jacuzzi", "Gym", "Concierge", "Parking", "Smart Home", "Wine Cellar", "Home Theater"]',
  '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"]',
  'available',
  true
);

-- Property 5: Villa in Hyderabad
INSERT INTO properties (
  id, seller_id, property_type_id, title, description,
  address, city, state, zipcode, amount,
  bedrooms, bathrooms, area_sqft, amenities, images, status, featured
) VALUES (
  'prop-005',
  'seller-002',
  'type-002',
  'Contemporary Villa in Jubilee Hills',
  'Modern villa with designer interiors in prestigious Jubilee Hills. Private pool, home theater, and landscaped garden. Perfect blend of luxury and comfort.',
  'Road No. 45, Jubilee Hills',
  'Hyderabad',
  'Telangana',
  '500033',
  45000000,
  4,
  4,
  4000,
  '["Private Pool", "Home Theater", "Garden", "Parking", "Gym", "Security", "Power Backup", "Servant Quarter"]',
  '["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"]',
  'available',
  false
);

-- Property 6: Apartment in Pune
INSERT INTO properties (
  id, seller_id, property_type_id, title, description,
  address, city, state, zipcode, amount,
  bedrooms, bathrooms, area_sqft, amenities, images, status, featured
) VALUES (
  'prop-006',
  'seller-001',
  'type-001',
  '2BHK Premium Apartment in Koregaon Park',
  'Luxury 2-bedroom apartment in the heart of Koregaon Park. Walking distance to cafes, restaurants, and shopping. Fully furnished with modern amenities.',
  'Lane 7, Koregaon Park',
  'Pune',
  'Maharashtra',
  '411001',
  8500000,
  2,
  2,
  1200,
  '["Gym", "Parking", "Security", "Lift", "Power Backup", "Clubhouse", "Swimming Pool"]',
  '["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"]',
  'available',
  false
);

-- Property 7: Duplex in Chennai
INSERT INTO properties (
  id, seller_id, property_type_id, title, description,
  address, city, state, zipcode, amount,
  bedrooms, bathrooms, area_sqft, amenities, images, status, featured
) VALUES (
  'prop-007',
  'seller-001',
  'type-007',
  '4BHK Duplex in OMR IT Corridor',
  'Spacious duplex apartment in prime OMR location. Close to IT parks and schools. Modern amenities and excellent ventilation.',
  'OMR Main Road, Thoraipakkam',
  'Chennai',
  'Tamil Nadu',
  '600097',
  15000000,
  4,
  3,
  2400,
  '["Parking", "Gym", "Security", "Lift", "Power Backup", "Clubhouse", "Children Play Area"]',
  '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"]',
  'available',
  false
);

-- Property 8: Bungalow in Ahmedabad
INSERT INTO properties (
  id, seller_id, property_type_id, title, description,
  address, city, state, zipcode, amount,
  bedrooms, bathrooms, area_sqft, amenities, images, status, featured
) VALUES (
  'prop-008',
  'seller-002',
  'type-006',
  'Elegant Bungalow in Satellite Area',
  'Beautiful single-story bungalow with large plot. Perfect for joint families. Traditional architecture with modern amenities.',
  'Satellite Road',
  'Ahmedabad',
  'Gujarat',
  '380015',
  35000000,
  5,
  4,
  4500,
  '["Garden", "Parking", "Terrace", "Solar Panels", "Bore Well", "Servant Quarter", "Store Room"]',
  '["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"]',
  'available',
  false
);

-- Property 9: Flat in Kolkata
INSERT INTO properties (
  id, seller_id, property_type_id, title, description,
  address, city, state, zipcode, amount,
  bedrooms, bathrooms, area_sqft, amenities, images, status, featured
) VALUES (
  'prop-009',
  'seller-001',
  'type-004',
  '3BHK Premium Flat in Salt Lake',
  'Modern flat in well-maintained society. Close to City Centre mall and IT hub. Excellent connectivity to airport and railway station.',
  'Sector-V, Salt Lake',
  'Kolkata',
  'West Bengal',
  '700091',
  9500000,
  3,
  2,
  1600,
  '["Parking", "Lift", "Security", "Power Backup", "Park", "Gym"]',
  '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"]',
  'available',
  false
);

-- Property 10: Farmhouse in Lonavala
INSERT INTO properties (
  id, seller_id, property_type_id, title, description,
  address, city, state, zipcode, amount,
  bedrooms, bathrooms, area_sqft, amenities, images, status, featured
) VALUES (
  'prop-010',
  'seller-002',
  'type-010',
  'Luxury Farmhouse with Valley View',
  'Spectacular farmhouse on 2 acres with valley view. Private pool, landscaped gardens, and organic farm. Perfect weekend getaway near Mumbai and Pune.',
  'Old Mumbai-Pune Highway',
  'Lonavala',
  'Maharashtra',
  '410401',
  55000000,
  5,
  5,
  6000,
  '["Private Pool", "Valley View", "Organic Farm", "Garden", "Parking", "Gazebo", "Waterfall View", "BBQ Area"]',
  '["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"]',
  'available',
  false
);
```

### 4. CREATE SAMPLE BOOKINGS

```sql
INSERT INTO bookings (id, buyer_id, property_id, seller_id, appointment_date, status, notes, seller_notes)
VALUES (
  'book-001',
  'buyer-001',
  'prop-001',
  'seller-001',
  '2025-01-20T10:00:00Z',
  'accepted',
  'Interested in viewing the beach villa this weekend',
  'Confirmed for Saturday morning'
);

INSERT INTO bookings (id, buyer_id, property_id, seller_id, appointment_date, status, notes, seller_notes)
VALUES (
  'book-002',
  'buyer-002',
  'prop-003',
  'seller-002',
  '2025-01-22T14:00:00Z',
  'pending',
  'Would like to see the house and neighborhood',
  ''
);

INSERT INTO bookings (id, buyer_id, property_id, seller_id, appointment_date, status, notes, seller_notes)
VALUES (
  'book-003',
  'buyer-001',
  'prop-004',
  'seller-002',
  '2025-01-18T11:00:00Z',
  'completed',
  'Interested in the penthouse sea view',
  'Showed all amenities'
);
```

### 5. CREATE SAMPLE DOCUMENTS

```sql
INSERT INTO documents (id, seller_id, property_id, document_type, document_url, document_name, status, admin_notes)
VALUES (
  'doc-001',
  'seller-001',
  'prop-001',
  'Property Deed',
  '#',
  'property_deed_goa_villa.pdf',
  'approved',
  'All documents verified and approved'
);

INSERT INTO documents (id, seller_id, property_id, document_type, document_url, document_name, status, admin_notes)
VALUES (
  'doc-002',
  'seller-002',
  'prop-003',
  'Title Certificate',
  '#',
  'title_certificate_delhi_house.pdf',
  'pending',
  ''
);
```

### 6. CREATE SAMPLE PAYMENTS

```sql
INSERT INTO payments (id, booking_id, buyer_id, seller_id, amount, payment_method, transaction_id, status, payment_date)
VALUES (
  'pay-001',
  'book-003',
  'buyer-001',
  'seller-002',
  25000000,
  'Razorpay',
  'pay_test123456789',
  'completed',
  '2025-01-18T15:30:00Z'
);
```

### 7. CREATE SAMPLE INVOICES

```sql
INSERT INTO invoices (id, booking_id, buyer_id, invoice_number, amount, tax, total_amount, invoice_date, due_date, status)
VALUES (
  'inv-001',
  'book-003',
  'buyer-001',
  'INV-NS-2025-001',
  25000000,
  4500000,
  29500000,
  '2025-01-18T10:00:00Z',
  '2025-01-25T10:00:00Z',
  'paid'
);

INSERT INTO invoices (id, booking_id, buyer_id, invoice_number, amount, tax, total_amount, invoice_date, due_date, status)
VALUES (
  'inv-002',
  'book-001',
  'buyer-001',
  'INV-NS-2025-002',
  8500000,
  1530000,
  10030000,
  '2025-01-20T10:00:00Z',
  '2025-01-27T10:00:00Z',
  'pending'
);
```

### 8. CREATE SAMPLE FEEDBACK

```sql
INSERT INTO feedback (id, buyer_id, property_id, rating, comment, status)
VALUES (
  'feed-001',
  'buyer-001',
  'prop-004',
  5,
  'Amazing penthouse with stunning sea views! The seller was very professional and helpful. Highly recommended property.',
  'visible'
);

INSERT INTO feedback (id, buyer_id, property_id, rating, comment, status)
VALUES (
  'feed-002',
  'buyer-002',
  'prop-001',
  5,
  'Beautiful beach villa in Goa! Perfect location and well-maintained property. Great for vacation home.',
  'visible'
);
```

---

## Quick Import Commands (For REST API)

### For JavaScript/Fetch API:

```javascript
// Add all properties at once
const properties = [
  // Copy all property objects from above
];

properties.forEach(async (property) => {
  await fetch('tables/properties', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(property)
  });
});
```

---

## Demo Login Credentials

### Admin
- **Email:** admin@narmadasales.com
- **Password:** admin123
- **Role:** admin

### Buyers
- **Email:** rajesh.kumar@email.com
- **Password:** buyer123
- **Role:** buyer

- **Email:** priya.sharma@email.com
- **Password:** buyer123
- **Role:** buyer

### Sellers
- **Email:** amit.properties@email.com
- **Password:** seller123
- **Role:** seller

- **Email:** sunita.homes@email.com
- **Password:** seller123
- **Role:** seller

---

## Property Price Reference (INR)

- **Entry Level:** ₹50 Lakhs - ₹1 Crore
- **Mid Range:** ₹1 Crore - ₹5 Crores
- **Premium:** ₹5 Crores - ₹10 Crores
- **Luxury:** ₹10 Crores+

---

## Deployment Notes for Cloudflare

1. **Database:** Use Cloudflare D1 (SQLite-compatible)
2. **Worker:** Create Cloudflare Worker for API
3. **Storage:** Use R2 for images (optional)
4. **Domain:** Configure custom domain
5. **SSL:** Automatic with Cloudflare

---

**Narmada Sales Database Setup Complete!** 🏡✨
