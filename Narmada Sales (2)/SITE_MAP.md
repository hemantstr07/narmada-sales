# 🗺️ PropBook - Complete Site Map

## 📍 Navigation Structure

```
PropBook Platform
│
├── 🏠 HOME (Public)
│   ├── Hero Section with Search
│   ├── Featured Properties (3 properties)
│   ├── Why Choose Us
│   └── Footer
│
├── 🏘️ PROPERTIES (Public)
│   ├── Search Bar
│   ├── Filters (Type, Price, Bedrooms)
│   ├── Properties Grid
│   └── Property Detail Page
│       ├── Image Gallery
│       ├── Property Info
│       ├── Amenities
│       ├── Customer Reviews
│       └── Book Appointment (requires login)
│
├── ℹ️ ABOUT (Public)
│   └── Platform Information
│
├── 📞 CONTACT (Public)
│   ├── Contact Information
│   └── Contact Form
│
├── 🔐 LOGIN
│   ├── Email/Password Fields
│   ├── Role Selector
│   ├── Demo Account Buttons
│   └── Link to Register
│
├── ✍️ REGISTER
│   ├── Registration Form
│   └── Link to Login
│
└── 👤 USER DASHBOARD (Protected - Role-Based)
    │
    ├── 🛡️ ADMIN DASHBOARD
    │   ├── Overview
    │   │   ├── Statistics (4 cards)
    │   │   └── Recent Bookings Table
    │   │
    │   ├── Manage Buyers
    │   │   └── Buyers List with Activate/Deactivate
    │   │
    │   ├── Manage Sellers
    │   │   └── Sellers List with Activate/Deactivate
    │   │
    │   ├── Property Types
    │   │   ├── Property Types List
    │   │   └── Add New Type
    │   │
    │   ├── Verify Documents
    │   │   ├── Documents List
    │   │   └── Approve/Reject Actions
    │   │
    │   ├── All Bookings
    │   │   └── Complete Bookings List
    │   │
    │   ├── Payments
    │   │   └── All Payments List
    │   │
    │   ├── Feedback
    │   │   ├── All Feedback List
    │   │   └── Show/Hide Actions
    │   │
    │   └── Generate Invoice
    │       ├── Bookings Without Invoice
    │       ├── Invoice Generation Form
    │       └── All Invoices List
    │
    ├── 👤 BUYER DASHBOARD
    │   ├── Overview
    │   │   ├── Statistics (4 cards)
    │   │   └── Search Properties Button
    │   │
    │   ├── Search Properties
    │   │   └── → Redirects to Properties Page
    │   │
    │   ├── My Appointments
    │   │   ├── Bookings List
    │   │   ├── Make Payment (for accepted)
    │   │   └── Give Feedback (for completed)
    │   │
    │   ├── Payments
    │   │   └── Payment History
    │   │
    │   ├── Invoices
    │   │   └── All Invoices List
    │   │
    │   └── My Feedback
    │       └── Feedback History
    │
    └── 🏢 SELLER DASHBOARD
        ├── Overview
        │   ├── Statistics (4 cards)
        │   ├── Add New Property Button
        │   └── Upload Document Button
        │
        ├── My Properties
        │   ├── Properties List
        │   ├── Add Property Form (Modal)
        │   ├── Edit Property Form (Modal)
        │   └── Delete Property (Confirmation)
        │
        ├── Documents
        │   ├── Documents List
        │   ├── Upload Document Form (Modal)
        │   └── View Document Status
        │
        ├── Booking Requests
        │   ├── Bookings List
        │   ├── Accept Booking
        │   └── Reject Booking
        │
        ├── Payments Received
        │   └── Payments List
        │
        └── Property Feedback
            └── Feedback for Seller's Properties
```

---

## 🎯 User Flow Diagrams

### Visitor → Buyer Flow

```
Visitor (No Login)
    ↓
Browse Properties
    ↓
Find Property of Interest
    ↓
Click "Login to Book Appointment"
    ↓
Login Page
    ↓
Don't have account? → Register
    ↓
Fill Registration Form (as Buyer)
    ↓
Auto-Login after Registration
    ↓
Redirected to Buyer Dashboard
    ↓
Search Properties
    ↓
View Property Details
    ↓
Click "Book Appointment"
    ↓
Fill Booking Form
    ↓
Submit Booking
    ↓
Wait for Seller Acceptance
    ↓
Seller Accepts
    ↓
Make Payment
    ↓
Complete Booking
    ↓
Give Feedback
```

### Seller Flow

```
Register as Seller
    ↓
Login
    ↓
Seller Dashboard
    ↓
Add New Property
    ↓
Fill Property Details
    ↓
Submit Property
    ↓
Upload Documents
    ↓
Wait for Admin Verification
    ↓
Receive Booking Request
    ↓
Review Booking Details
    ↓
Accept/Reject Booking
    ↓
If Accepted:
    ↓
Buyer Makes Payment
    ↓
Receive Payment
    ↓
View Feedback
```

### Admin Flow

```
Admin Login
    ↓
Admin Dashboard
    ↓
View Statistics
    ↓
Manage Users (Buyers/Sellers)
    ↓
Activate/Deactivate Accounts
    ↓
Verify Documents
    ↓
Approve/Reject Documents
    ↓
View All Bookings
    ↓
Monitor Payments
    ↓
Generate Invoices
    ↓
Manage Feedback
    ↓
View Reports
```

---

## 🔗 Page Connections

### Public Pages (Accessible to All)
```
Home ←→ Properties ←→ Property Detail
  ↓         ↓              ↓
About   Contact       Login/Register
```

### Protected Pages (After Login)
```
Dashboard (Role-Based)
    ↓
├── Admin Dashboard (9 sections)
├── Buyer Dashboard (6 sections)
└── Seller Dashboard (6 sections)

Profile (All Roles)
    ↓
Edit Profile
    ↓
Update Information
```

---

## 📱 Mobile Navigation Flow

```
Mobile Menu (Hamburger)
    ↓
Opens Navigation Drawer
    ↓
├── Home
├── Properties
├── About
├── Contact
├── Login (if not logged in)
└── Profile/Logout (if logged in)
```

---

## 🔐 Authentication Flow

```
Visitor
    ↓
Click Login
    ↓
Login Page
    ├── Enter Credentials
    │   ├── Email
    │   ├── Password
    │   └── Role
    │
    ├── OR Use Demo Account
    │   ├── Click Admin Demo
    │   ├── Click Buyer Demo
    │   └── Click Seller Demo
    │
    └── OR Register New Account
        ↓
    Validate Credentials
        ↓
    Check Role
        ↓
    ├── Admin → Admin Dashboard
    ├── Buyer → Buyer Dashboard
    └── Seller → Seller Dashboard
```

---

## 🎨 Modal/Popup Flows

### Booking Modal Flow
```
Property Detail Page
    ↓
Click "Book Appointment"
    ↓
Booking Modal Opens
    ├── Property Details Display
    ├── Date/Time Selector
    └── Notes Field
    ↓
Submit Booking
    ↓
Success Notification
    ↓
Redirect to Dashboard
```

### Payment Modal Flow
```
My Appointments
    ↓
Click "Make Payment" (for accepted booking)
    ↓
Payment Modal Opens
    ├── Property Details
    ├── Deposit Amount (10%)
    ├── Payment Method Selector
    └── Card Details Field
    ↓
Submit Payment
    ↓
Update Booking Status
    ↓
Success Notification
```

### Add Property Modal Flow
```
Seller Dashboard
    ↓
Click "Add New Property"
    ↓
Property Form Modal Opens
    ├── Property Details Fields
    ├── Location Fields
    ├── Pricing Field
    ├── Features Fields
    ├── Amenities Field
    ├── Images Field
    └── Featured Checkbox
    ↓
Submit Property
    ↓
Property Added to Database
    ↓
Success Notification
    ↓
Refresh My Properties
```

---

## 📊 Data Flow Architecture

```
User Action
    ↓
JavaScript Function
    ↓
API Request (Fetch)
    ↓
RESTful Table API
    ↓
├── GET → Retrieve Data
├── POST → Create Record
├── PATCH → Update Record
└── DELETE → Remove Record
    ↓
Database Operation
    ↓
Response
    ↓
Update UI
    ↓
Show Notification
```

---

## 🗂️ Database Relationships

```
USERS (Admin/Buyer/Seller)
    │
    ├── Buyers
    │   ├── → BOOKINGS (buyer_id)
    │   ├── → PAYMENTS (buyer_id)
    │   ├── → INVOICES (buyer_id)
    │   └── → FEEDBACK (buyer_id)
    │
    └── Sellers
        ├── → PROPERTIES (seller_id)
        ├── → DOCUMENTS (seller_id)
        ├── → BOOKINGS (seller_id)
        └── → PAYMENTS (seller_id)

PROPERTIES
    ├── → PROPERTY_TYPES (property_type_id)
    ├── → BOOKINGS (property_id)
    ├── → DOCUMENTS (property_id)
    └── → FEEDBACK (property_id)

BOOKINGS
    ├── → PAYMENTS (booking_id)
    └── → INVOICES (booking_id)
```

---

## 🎯 Feature Access Matrix

| Feature | Visitor | Buyer | Seller | Admin |
|---------|---------|-------|--------|-------|
| Browse Properties | ✅ | ✅ | ✅ | ✅ |
| Search/Filter | ✅ | ✅ | ✅ | ✅ |
| View Details | ✅ | ✅ | ✅ | ✅ |
| Book Appointment | ❌ | ✅ | ❌ | ❌ |
| Make Payment | ❌ | ✅ | ❌ | ❌ |
| Give Feedback | ❌ | ✅ | ❌ | ❌ |
| Add Property | ❌ | ❌ | ✅ | ❌ |
| Edit Property | ❌ | ❌ | ✅ | ❌ |
| Upload Documents | ❌ | ❌ | ✅ | ❌ |
| Accept/Reject Bookings | ❌ | ❌ | ✅ | ❌ |
| Manage Users | ❌ | ❌ | ❌ | ✅ |
| Verify Documents | ❌ | ❌ | ❌ | ✅ |
| Generate Invoices | ❌ | ❌ | ❌ | ✅ |
| View All Data | ❌ | ❌ | ❌ | ✅ |

---

## 🚦 Page Access Control

### Public Pages (No Authentication Required)
- ✅ Home
- ✅ Properties
- ✅ Property Detail
- ✅ About
- ✅ Contact
- ✅ Login
- ✅ Register

### Protected Pages (Authentication Required)
- 🔒 Dashboard (All Roles)
- 🔒 Profile (All Roles)
- 🔒 My Appointments (Buyer Only)
- 🔒 My Properties (Seller Only)
- 🔒 Admin Functions (Admin Only)

---

## 🎨 UI Component Structure

```
Application Shell
├── Navigation Bar
│   ├── Logo
│   ├── Menu Items
│   ├── Auth Buttons (Visitor)
│   └── User Dropdown (Logged In)
│
├── Main Content Area
│   ├── Page Header
│   ├── Content Section
│   │   ├── Cards
│   │   ├── Tables
│   │   ├── Forms
│   │   └── Lists
│   └── Actions
│
├── Sidebar (Dashboard)
│   ├── Menu Items (Role-Based)
│   └── Active State Indicator
│
├── Modals/Dialogs
│   ├── Header
│   ├── Body (Form/Content)
│   └── Footer (Actions)
│
└── Footer
    ├── Links
    ├── Contact Info
    └── Copyright
```

---

## 🔄 Complete User Journeys

### Journey 1: First-Time Buyer
```
1. Land on Homepage
2. Browse Featured Properties
3. Click "View All"
4. Use Filters (Price Range, Bedrooms)
5. Find Desired Property
6. View Property Details
7. See "Login to Book" Button
8. Click Register
9. Fill Registration Form
10. Auto-Login
11. Return to Property
12. Click "Book Appointment"
13. Select Date/Time
14. Add Notes
15. Submit Booking
16. Check Dashboard
17. See Booking Status "Pending"
18. Wait for Seller
19. Booking Status → "Accepted"
20. Click "Make Payment"
21. Enter Payment Details
22. Complete Payment
23. Booking Status → "Completed"
24. Click "Give Feedback"
25. Rate Property 5 Stars
26. Write Review
27. Submit Feedback
28. View in "My Feedback"
```

### Journey 2: New Seller
```
1. Land on Homepage
2. Click Register
3. Select "Seller" Role
4. Fill Registration
5. Auto-Login
6. See Seller Dashboard
7. Click "Add New Property"
8. Fill Property Details
9. Add Images (URLs)
10. List Amenities
11. Set Featured
12. Submit Property
13. Property Appears in "My Properties"
14. Click "Upload Document"
15. Select Document Type
16. Link to Property
17. Provide Document URL
18. Submit Document
19. Document Status → "Pending"
20. Wait for Admin Verification
21. Document Status → "Approved"
22. Receive Booking Request
23. View Buyer Details
24. Read Booking Notes
25. Click "Accept"
26. Add Seller Notes
27. Wait for Payment
28. Receive Payment Notification
29. View in "Payments Received"
30. Check Property Feedback
```

### Journey 3: Admin Oversight
```
1. Login as Admin
2. View Dashboard Statistics
3. See Total Buyers, Sellers, Properties
4. Check Total Revenue
5. Review Recent Bookings
6. Click "Verify Documents"
7. See Pending Documents List
8. Click "View" on Document
9. Review Document
10. Click "Approve"
11. Document Status → "Approved"
12. Go to "Generate Invoice"
13. See Bookings Without Invoice
14. Click "Generate Invoice"
15. Review Auto-Calculated Tax (10%)
16. Set Due Date
17. Generate Invoice
18. Invoice Appears in List
19. Go to "Manage Feedback"
20. Review All Feedback
21. Hide Inappropriate Feedback
22. Go to "Manage Sellers"
23. Deactivate Inactive Seller
24. Return to Dashboard
25. Review Updated Statistics
```

---

## 📍 Quick Navigation Reference

### For Visitors
- **Home:** Browse featured properties
- **Properties:** View all listings with filters
- **Property Detail:** See full property information
- **Login/Register:** Create account or sign in

### For Buyers
- **Dashboard:** Overview and quick actions
- **Properties:** Search and book
- **My Appointments:** Track bookings
- **Payments:** Payment history
- **Invoices:** View invoices
- **My Feedback:** Review history

### For Sellers
- **Dashboard:** Property statistics
- **My Properties:** Manage listings
- **Documents:** Upload and track
- **Bookings:** Accept/reject requests
- **Payments:** Track earnings
- **Feedback:** Monitor reviews

### For Admins
- **Dashboard:** Platform overview
- **Users:** Manage buyers/sellers
- **Documents:** Verify uploads
- **Bookings:** Monitor all appointments
- **Payments:** Track all transactions
- **Invoices:** Generate and manage
- **Feedback:** Control visibility

---

**PropBook Site Map** - Complete navigation and flow reference 🗺️✨
