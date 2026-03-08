-- Migration script to add membership features to existing database
-- Execute with: wrangler d1 execute narmadasales-db --file=schema-update-membership.sql

-- Add membership columns to users table
ALTER TABLE users ADD COLUMN membership_type TEXT DEFAULT 'free';
ALTER TABLE users ADD COLUMN property_limit INTEGER DEFAULT 3;
ALTER TABLE users ADD COLUMN membership_expiry INTEGER;

-- Create membership plans table
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

-- Create membership transactions table
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

-- Insert default membership plans
INSERT INTO membership_plans (id, name, price, property_limit, duration_days, description, features, status, created_at, updated_at)
VALUES 
    ('plan_free', 'Free Plan', 0, 3, 365, 'Perfect for getting started', '["List up to 3 properties", "Basic property listing", "Standard support", "Property management dashboard"]', 'active', strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000),
    ('plan_basic', 'Basic Plan', 1000, 10, 365, 'Great for growing sellers', '["List up to 10 properties", "Priority listing", "Email support", "Property analytics", "Featured property option"]', 'active', strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000),
    ('plan_standard', 'Standard Plan', 1500, 15, 365, 'Most popular choice', '["List up to 15 properties", "Premium listing placement", "Priority support", "Advanced analytics", "Multiple featured properties", "Social media promotion"]', 'active', strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000),
    ('plan_premium', 'Premium Plan', 2000, 20, 365, 'For professional sellers', '["List up to 20 properties", "Top priority placement", "24/7 dedicated support", "Complete analytics suite", "Unlimited featured properties", "Marketing assistance", "Custom branding"]', 'active', strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000);

-- Update existing users to have free plan limits
UPDATE users SET membership_type = 'free', property_limit = 3 WHERE role = 'seller';
