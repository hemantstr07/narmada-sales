-- Narmada Sales Database Schema for Cloudflare D1
-- Execute with: wrangler d1 execute narmadasales-db --file=schema.sql

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    status TEXT DEFAULT 'active',
    profile_image TEXT,
    membership_type TEXT DEFAULT 'free',
    property_limit INTEGER DEFAULT 3,
    membership_expiry INTEGER,
    created_at INTEGER,
    updated_at INTEGER
);

-- Property types table
CREATE TABLE IF NOT EXISTS property_types (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at INTEGER
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
    id TEXT PRIMARY KEY,
    seller_id TEXT NOT NULL,
    property_type_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zipcode TEXT,
    amount REAL,
    bedrooms INTEGER,
    bathrooms INTEGER,
    area_sqft REAL,
    amenities TEXT,
    images TEXT,
    status TEXT DEFAULT 'available',
    featured INTEGER DEFAULT 0,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY (seller_id) REFERENCES users(id),
    FOREIGN KEY (property_type_id) REFERENCES property_types(id)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    buyer_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    seller_id TEXT NOT NULL,
    appointment_date TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    seller_notes TEXT,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (seller_id) REFERENCES users(id)
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    booking_id TEXT NOT NULL,
    buyer_id TEXT NOT NULL,
    seller_id TEXT NOT NULL,
    amount REAL,
    payment_method TEXT,
    transaction_id TEXT,
    status TEXT DEFAULT 'pending',
    payment_date TEXT,
    created_at INTEGER,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (seller_id) REFERENCES users(id)
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    seller_id TEXT NOT NULL,
    property_id TEXT,
    document_type TEXT,
    document_url TEXT,
    document_name TEXT,
    status TEXT DEFAULT 'pending',
    admin_notes TEXT,
    created_at INTEGER,
    FOREIGN KEY (seller_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    booking_id TEXT NOT NULL,
    buyer_id TEXT NOT NULL,
    invoice_number TEXT,
    amount REAL,
    tax REAL,
    total_amount REAL,
    invoice_date TEXT,
    due_date TEXT,
    status TEXT DEFAULT 'pending',
    created_at INTEGER,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id TEXT PRIMARY KEY,
    buyer_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    rating INTEGER,
    comment TEXT,
    status TEXT DEFAULT 'visible',
    created_at INTEGER,
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Membership plans table
CREATE TABLE IF NOT EXISTS membership_plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    property_limit INTEGER NOT NULL,
    duration_days INTEGER DEFAULT 365,
    description TEXT,
    features TEXT,
    status TEXT DEFAULT 'active',
    created_at INTEGER,
    updated_at INTEGER
);

-- Membership transactions table
CREATE TABLE IF NOT EXISTS membership_transactions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    plan_id TEXT NOT NULL,
    amount REAL NOT NULL,
    payment_method TEXT,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    status TEXT DEFAULT 'pending',
    purchased_at INTEGER,
    expires_at INTEGER,
    created_at INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (plan_id) REFERENCES membership_plans(id)
);
