# Narmada Sales - Property Booking Platform

![Narmada Sales](https://www.genspark.ai/api/files/s/pyzgKm3j)

A comprehensive property booking and management platform built for the Indian real estate market with role-based access control for Admins, Buyers, Sellers, and Visitors.

## 🎯 Project Overview

Narmada Sales is a full-featured real estate platform that connects property buyers and sellers across India with advanced booking, payment, and management capabilities. The system includes comprehensive admin controls for managing users, verifying documents, generating invoices, and overseeing all transactions.

**Contact Information:**
- **Phone:** +91 94283 61305
- **Email:** info@narmadasales.com
- **Website:** Narmada Sales
- **Location:** India

## ✨ Key Features

### 👁️ Visitor Features (No Login Required)
- Browse and search properties by location, type, price, and bedrooms
- View detailed property information including:
  - Address and location
  - Price and property details
  - Image gallery
  - Amenities list
  - Customer reviews and ratings
- Filter properties by type, price range, and bedrooms
- Register as a Buyer or Seller

### 👤 Buyer Features
- **Account Management**
  - User registration and login
  - Profile editing (name, phone, address)
  
- **Property Search & Booking**
  - Advanced property search and filtering
  - View detailed property information
  - Book appointments with sellers
  - Track booking status (pending, accepted, rejected, completed)
  
- **Payment & Invoices**
  - **Razorpay Integration** - Secure payment processing for Indian market
  - Make secure payments in INR via Razorpay
  - Multiple payment methods (Cards, UPI, Net Banking, Wallets)
  - Real-time payment verification
  - View payment history with Razorpay transaction IDs
  - Safe and encrypted transactions
  - Receive and view invoices
  - Track invoice status and due dates
  
- **Feedback**
  - Submit property reviews and ratings (1-5 stars)
  - View own feedback history

### 🏢 Seller Features
- **Account Management**
  - User registration and login
  - Profile editing
  
- **Membership Management** 🆕
  - **Free Plan**: List up to 3 properties (default)
  - **Basic Plan (₹1,000/year)**: List up to 10 properties
  - **Standard Plan (₹1,500/year)**: List up to 15 properties
  - **Premium Plan (₹2,000/year)**: List up to 20 properties
  - Real-time membership status tracking
  - Property limit enforcement
  - Razorpay-powered secure upgrades
  - Automatic limit increases after purchase
  
- **Property Management**
  - Add new properties with full details:
    - Title, description, location
    - Price, bedrooms, bathrooms, area
    - Amenities
    - Multiple image upload
    - Featured property option
  - Property limit based on membership tier
  - Edit existing properties
  - Delete properties
  - Change property status (available, sold, rented)
  
- **Document Management**
  - Upload property documents (deeds, certificates, etc.)
  - Track document verification status
  - View admin feedback on documents
  
- **Booking Management**
  - View all booking requests
  - Accept or reject appointment requests
  - Add notes for buyers
  
- **Payment Tracking**
  - View all payments received
  - Track payment methods and transaction IDs
  
- **Feedback Monitoring**
  - View all feedback for owned properties

### 🛡️ Admin Features
- **User Management**
  - View all buyers and sellers
  - Activate/deactivate user accounts
  - Monitor user activities
  
- **Property Type Management**
  - Add new property types (Apartment, Villa, House, etc.)
  - Edit and delete property types
  
- **Document Verification**
  - Review seller-uploaded documents
  - Approve or reject documents
  - Add verification notes
  
- **Booking Oversight**
  - View all bookings across the platform
  - Monitor booking statuses
  
- **Payment Monitoring**
  - View all payment transactions
  - Track payment statuses and methods
  - Monitor total revenue
  
- **Feedback Management**
  - View all customer feedback
  - Show or hide feedback from public view
  
- **Invoice Generation**
  - Generate invoices for accepted bookings
  - Set invoice amounts, tax, and due dates
  - Track invoice payment status
  
- **Reports & Analytics**
  - Dashboard with key metrics:
    - Total buyers and sellers
    - Total properties
    - Total revenue
    - Recent bookings overview

## 🗄️ Database Structure

### Tables

1. **users**
   - id, email, password, role (admin/buyer/seller)
   - name, phone, address
   - status (active/inactive/pending)
   - profile_image
   - membership_type (free/plan_basic/plan_standard/plan_premium) 🆕
   - property_limit (default: 3) 🆕
   - membership_expiry (timestamp) 🆕

2. **property_types**
   - id, name, description

3. **properties**
   - id, seller_id, property_type_id
   - title, description, address, city, state, zipcode
   - amount, bedrooms, bathrooms, area_sqft
   - amenities (array), images (array)
   - status (available/sold/rented), featured (boolean)

4. **bookings**
   - id, buyer_id, property_id, seller_id
   - appointment_date, status (pending/accepted/rejected/completed/cancelled)
   - notes, seller_notes

5. **documents**
   - id, seller_id, property_id
   - document_type, document_url, document_name
   - status (pending/approved/rejected), admin_notes

6. **payments**
   - id, booking_id, buyer_id, seller_id
   - amount, payment_method, transaction_id
   - status (pending/completed/failed/refunded), payment_date

7. **invoices**
   - id, booking_id, buyer_id, invoice_number
   - amount, tax, total_amount
   - invoice_date, due_date, status (pending/paid/overdue)

8. **feedback**
   - id, buyer_id, property_id
   - rating (1-5), comment
   - status (visible/hidden)

9. **membership_plans** 🆕
   - id, name, price, property_limit
   - duration_days (default: 365)
   - description, features (JSON array)
   - status (active/inactive)

10. **membership_transactions** 🆕
    - id, user_id, plan_id, amount
    - payment_method, razorpay_order_id, razorpay_payment_id
    - status (pending/completed/failed)
    - purchased_at, expires_at

## 🔐 Demo Accounts

### Admin
- **Email:** admin@narmadasales.com
- **Password:** admin123
- **Role:** admin

### Buyer Accounts
- **Email:** buyer1@example.com / buyer2@example.com
- **Password:** buyer123
- **Role:** buyer

### Seller Accounts
- **Email:** seller1@example.com / seller2@example.com
- **Password:** seller123
- **Role:** seller

## 📋 Current Features

### ✅ Completed Features
1. ✅ User authentication and role-based access control
2. ✅ Visitor property browsing and search
3. ✅ Buyer registration, login, and profile management
4. ✅ Seller registration, login, and profile management
5. ✅ Admin user management (activate/deactivate accounts)
6. ✅ Property listing with full details and image galleries
7. ✅ Advanced property search and filtering
8. ✅ Appointment booking system
9. ✅ Booking status management (accept/reject by seller)
10. ✅ Payment processing and tracking
11. ✅ Invoice generation and management
12. ✅ Document upload and verification system
13. ✅ Customer feedback and rating system
14. ✅ Property type management
15. ✅ Responsive design for all devices
16. ✅ Dashboard with analytics for all user roles
17. ✅ RESTful API integration with Cloudflare D1 database
18. ✅ **Seller Membership System** 🆕
    - Multiple membership tiers (Free, Basic, Standard, Premium)
    - Property limit enforcement based on membership
    - Razorpay payment integration for upgrades
    - Real-time membership status tracking
    - Automatic expiry management

## 🚀 Getting Started

### Access the Application
1. Open `index.html` in your web browser
2. Browse properties as a visitor (no login required)
3. Click "Login" to access role-specific features
4. Use the demo accounts above for testing

### User Flows

#### As a Visitor:
1. Browse properties on the home page
2. Use search and filters to find properties
3. Click on a property to view full details
4. Register as a Buyer to book appointments

#### As a Buyer:
1. Login with buyer credentials
2. Search and view properties
3. Click "Book Appointment" on property details
4. View bookings in dashboard
5. Make payments when booking is accepted
6. Give feedback after viewing

#### As a Seller:
1. Login with seller credentials
2. **Check membership status** (Dashboard shows current plan and limits) 🆕
3. Add new properties from dashboard (within membership limit)
4. **Upgrade membership** to list more properties 🆕
5. Upload property documents
6. View and manage booking requests
7. Accept or reject appointments
8. Track payments received
9. View property feedback

#### As an Admin:
1. Login with admin credentials
2. Manage buyers and sellers
3. Add/edit property types
4. Verify seller documents
5. View all bookings and payments
6. Generate invoices for bookings
7. Manage feedback visibility
8. Monitor platform analytics

## 💳 Razorpay Payment Integration

The platform integrates Razorpay for secure payment processing in Indian Rupees (INR):

### Features
- **Secure Payment Gateway** - Industry-standard security with PCI DSS compliance
- **Multiple Payment Methods** - Credit/Debit Cards, UPI, Net Banking, Wallets
- **INR Currency** - All transactions in Indian Rupees (₹)
- **Transaction Tracking** - Razorpay payment IDs stored for reference
- **Test Mode** - Currently configured for testing
- **Instant Confirmation** - Real-time payment verification

### Configuration
The Razorpay credentials are configured in `js/razorpay-config.js`:
```javascript
RAZORPAY_KEY_ID: rzp_test_RyTlLv8NtADLfJ
RAZORPAY_KEY_SECRET: ejf5D47qV6EK5x4ZzAjA708A
```

### Testing Payments
Use Razorpay test credentials for testing:

**Test Cards:**
- **Card Number:** 4111 1111 1111 1111 (Success)
- **Card Number:** 5555 5555 5555 4444 (Success)
- **CVV:** Any 3 digits
- **Expiry:** Any future date

**Test UPI:**
- **UPI ID:** success@razorpay
- **UPI ID:** failure@razorpay (for testing failures)

### Payment Flow
1. Buyer books an appointment
2. Seller accepts the booking
3. Buyer clicks "Make Payment"
4. Razorpay checkout opens showing amount in INR (₹)
5. Buyer selects payment method (Card/UPI/Net Banking/Wallet)
6. Payment is processed securely through Razorpay
7. Success/failure is handled automatically
8. Transaction ID is stored in database
9. Booking status is updated to "completed"

### Currency
- **All prices are in INR (₹)** - Indian Rupees
- **Deposit amount:** 10% of property price
- **Display format:** ₹1,25,00,000 (₹1.25 Crore)
- Razorpay processes all transactions in INR

## 🎨 Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Custom CSS with CSS Variables, Flexbox, Grid
- **Icons:** Font Awesome 6.4.0
- **Fonts:** Google Fonts (Inter)
- **Payment Gateway:** Razorpay (Supports membership upgrades & booking payments)
- **Database:** Cloudflare D1 (SQLite-based)
- **Hosting:** Cloudflare Pages with Functions
- **Architecture:** Single Page Application (SPA)

## 📱 Responsive Design

The platform is fully responsive and works seamlessly on:
- Desktop computers (1920px+)
- Laptops (1024px - 1920px)
- Tablets (768px - 1024px)
- Mobile phones (320px - 768px)

## 🔄 API Endpoints

All data operations use the RESTful Table API:

- **GET** `tables/{table}` - List records with pagination
- **GET** `tables/{table}/{id}` - Get single record
- **POST** `tables/{table}` - Create new record
- **PUT** `tables/{table}/{id}` - Update record (full)
- **PATCH** `tables/{table}/{id}` - Update record (partial)
- **DELETE** `tables/{table}/{id}` - Delete record

## 📊 Sample Data

The platform comes pre-loaded with:
- 5 property types
- 5 sample properties with images
- 5 users (1 admin, 2 buyers, 2 sellers)
- 3 sample bookings
- 2 sample payments
- 2 sample invoices
- 2 sample feedback entries
- 2 sample documents

## 🔜 Future Enhancements

### Recommended Next Steps:
1. **Advanced Search**
   - Map-based property search
   - Nearby amenities (schools, hospitals, etc.)
   - Virtual property tours

2. **Communication Features**
   - In-app messaging between buyers and sellers
   - Email notifications for bookings and payments
   - SMS alerts for important updates

3. **Enhanced Analytics**
   - Admin reports with charts and graphs
   - Property performance metrics
   - Revenue analytics and forecasting

4. **Payment Gateway Integration**
   - Real payment processing with Stripe/PayPal
   - Multiple currency support
   - Payment plans and installments

5. **Advanced Document Management**
   - Real file upload capability
   - Document preview in browser
   - Bulk document upload

6. **Social Features**
   - Property sharing on social media
   - Favorite properties list
   - Property comparison tool

7. **Mobile App**
   - Native iOS and Android apps
   - Push notifications
   - Offline mode

8. **AI Features**
   - Property recommendations based on user preferences
   - Automatic property valuation
   - Chatbot for customer support

## 🚀 Cloudflare Deployment

### Quick Deployment Steps:
1. **Deploy to Cloudflare Pages**
   - Push code to GitHub repository
   - Connect repository to Cloudflare Pages
   - Deploy with one click

2. **Setup Database**
   - Use the provided `database-import.js` script
   - Run setup script in browser console on deployed site
   - Import sample Indian properties

3. **Configure Domain**
   - Add custom domain in Cloudflare
   - Update DNS settings
   - Enable HTTPS

**Detailed Guide:** See `CLOUDFLARE_DEPLOYMENT_GUIDE.md` for complete instructions

## 📦 Quick Start Scripts

### Database Import
```javascript
// Run in browser console after deployment
// See database-import.js for full script
```

### Troubleshooting
If you encounter issues, see `TROUBLESHOOTING.md` for solutions to common problems.

## 📁 Project Structure

```
narmadasales/
├── index.html                      # Main HTML file
├── css/
│   ├── styles.css                  # Beige theme styling
│   └── membership.css              # 🆕 Membership UI styles
├── js/
│   ├── app.js                      # Core application logic
│   ├── auth.js                     # Authentication functions
│   ├── properties.js               # Property management
│   ├── dashboard.js                # Dashboard features
│   ├── membership.js               # 🆕 Membership management
│   └── razorpay-config.js         # Razorpay payment integration
├── functions/                      # 🆕 Cloudflare Functions (API)
│   ├── properties/
│   │   ├── index.js               # Property CRUD (with limit check)
│   │   └── [id].js                # Single property operations
│   ├── bookings/                  # Booking endpoints
│   ├── memberships/               # 🆕 Membership API
│   │   ├── index.js               # Get plans
│   │   ├── purchase.js            # Purchase membership
│   │   └── status/[userId].js    # Get user status
│   └── payments.js                # Razorpay order creation
├── schema.sql                      # 🆕 Complete D1 database schema
├── schema-update-membership.sql    # 🆕 Membership migration
├── MEMBERSHIP_DEPLOYMENT_GUIDE.md  # 🆕 Membership setup guide
├── database-import.js              # Database import script with Indian properties
├── CLOUDFLARE_DEPLOYMENT_GUIDE.md  # Deployment instructions
├── TROUBLESHOOTING.md              # Common issues and solutions
└── README.md                       # This file
```

## 🐛 Known Issues & Solutions

See `TROUBLESHOOTING.md` for detailed solutions to:
- Property images not showing
- Property cards not clickable
- Razorpay payment issues
- Currency display problems
- And more...

## 🎨 Color Theme

The website uses a warm beige color scheme suitable for Indian real estate:
- **Primary:** Beige/Brown tones (#d4a574)
- **Secondary:** Complementary earth tones
- **Background:** Light beige (#f5eee6)
- Professional and trustworthy appearance

## 📄 License

This project is available for commercial use.

## 👥 Contact & Support

**Narmada Sales**
- **Phone:** +91 94283 61305
- **Email:** info@narmadasales.com
- **Location:** India

For technical support or queries about the platform, feel free to reach out!

---

**Narmada Sales** - Your trusted property booking platform for India's real estate market 🏡✨
