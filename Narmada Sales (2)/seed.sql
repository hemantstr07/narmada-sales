-- Narmada Sales Sample Data for Cloudflare D1
-- Execute with: wrangler d1 execute narmadasales-db --file=seed.sql

-- Insert admin user
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image, created_at, updated_at)
VALUES (
    'user-admin-001',
    'admin@narmadasales.com',
    'admin123',
    'admin',
    'Admin User',
    '+91 94283 61305',
    'Mumbai, Maharashtra',
    'active',
    'https://ui-avatars.com/api/?name=Admin&background=d4a574&color=fff',
    1704067200000,
    1704067200000
);

-- Insert buyer 1
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image, created_at, updated_at)
VALUES (
    'user-buyer-001',
    'buyer1@example.com',
    'buyer123',
    'buyer',
    'Rajesh Kumar',
    '+91 98765 43210',
    'Bangalore, Karnataka',
    'active',
    'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=28a745&color=fff',
    1704067200000,
    1704067200000
);

-- Insert buyer 2
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image, created_at, updated_at)
VALUES (
    'user-buyer-002',
    'buyer2@example.com',
    'buyer123',
    'buyer',
    'Priya Sharma',
    '+91 99887 76655',
    'Delhi, NCR',
    'active',
    'https://ui-avatars.com/api/?name=Priya+Sharma&background=28a745&color=fff',
    1704067200000,
    1704067200000
);

-- Insert seller 1
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image, created_at, updated_at)
VALUES (
    'user-seller-001',
    'seller1@example.com',
    'seller123',
    'seller',
    'Amit Patel',
    '+91 97654 32109',
    'Ahmedabad, Gujarat',
    'active',
    'https://ui-avatars.com/api/?name=Amit+Patel&background=007bff&color=fff',
    1704067200000,
    1704067200000
);

-- Insert seller 2
INSERT INTO users (id, email, password, role, name, phone, address, status, profile_image, created_at, updated_at)
VALUES (
    'user-seller-002',
    'seller2@example.com',
    'seller123',
    'seller',
    'Sunita Reddy',
    '+91 96543 21098',
    'Hyderabad, Telangana',
    'active',
    'https://ui-avatars.com/api/?name=Sunita+Reddy&background=007bff&color=fff',
    1704067200000,
    1704067200000
);

-- Insert property types
INSERT INTO property_types (id, name, description, created_at)
VALUES 
    ('type-001', 'Apartment', 'Modern apartments in prime locations', 1704067200000),
    ('type-002', 'Villa', 'Luxury villas with premium amenities', 1704067200000),
    ('type-003', 'Independent House', 'Spacious independent houses', 1704067200000),
    ('type-004', 'Plot', 'Residential and commercial plots', 1704067200000),
    ('type-005', 'Commercial Space', 'Office spaces and shops', 1704067200000);

-- Insert sample property 1
INSERT INTO properties (id, seller_id, property_type_id, title, description, address, city, state, zipcode, amount, bedrooms, bathrooms, area_sqft, amenities, images, status, featured, created_at, updated_at)
VALUES (
    'prop-001',
    'user-seller-001',
    'type-001',
    'Luxury 3BHK Apartment in Whitefield',
    'Beautiful 3BHK apartment with modern amenities in Whitefield, Bangalore',
    'EPIP Zone, Whitefield',
    'Bangalore',
    'Karnataka',
    '560066',
    12500000,
    3,
    2,
    1650,
    '["Swimming Pool","Gym","Power Backup","Club House","Security"]',
    '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"]',
    'available',
    1,
    1704067200000,
    1704067200000
);

-- Insert sample property 2
INSERT INTO properties (id, seller_id, property_type_id, title, description, address, city, state, zipcode, amount, bedrooms, bathrooms, area_sqft, amenities, images, status, featured, created_at, updated_at)
VALUES (
    'prop-002',
    'user-seller-001',
    'type-002',
    'Spacious Villa in Gachibowli',
    'Stunning 4BHK villa with private garden in the IT hub of Hyderabad',
    'Gachibowli Financial District',
    'Hyderabad',
    'Telangana',
    '500032',
    28500000,
    4,
    4,
    3200,
    '["Private Garden","Modular Kitchen","Covered Parking","Solar Panels"]',
    '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"]',
    'available',
    1,
    1704067200000,
    1704067200000
);

-- Insert sample property 3
INSERT INTO properties (id, seller_id, property_type_id, title, description, address, city, state, zipcode, amount, bedrooms, bathrooms, area_sqft, amenities, images, status, featured, created_at, updated_at)
VALUES (
    'prop-003',
    'user-seller-002',
    'type-001',
    '2BHK Apartment in Andheri West',
    'Compact 2BHK apartment in prime Andheri West location',
    'SV Road, Andheri West',
    'Mumbai',
    'Maharashtra',
    '400058',
    18500000,
    2,
    2,
    950,
    '["Lift","Reserved Parking","Piped Gas","Intercom"]',
    '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"]',
    'available',
    0,
    1704067200000,
    1704067200000
);
