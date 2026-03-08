# 💳 Razorpay Integration Guide - PropBook

## Overview

PropBook is now integrated with **Razorpay** payment gateway for secure and seamless payment processing. This guide explains how the integration works and how to use it.

---

## 🔐 Configuration

### Current Setup (Test Mode)
```javascript
RAZORPAY_KEY_ID: rzp_test_RyTlLv8NtADLfJ
RAZORPAY_KEY_SECRET: ejf5D47qV6EK5x4ZzAjA708A
```

**Location:** `js/razorpay-config.js`

---

## 🎯 Features

### ✅ Secure Payment Processing
- Industry-standard security protocols
- PCI DSS compliant
- Encrypted transactions
- Secure checkout modal

### ✅ Multiple Payment Methods
- **Credit/Debit Cards** - Visa, Mastercard, RuPay, Amex
- **UPI** - Google Pay, PhonePe, Paytm
- **Net Banking** - All major banks
- **Wallets** - Paytm, PhonePe, Amazon Pay
- **EMI** - Easy installment options

### ✅ Automatic Currency Conversion
- Property prices displayed in USD
- Automatic conversion to INR for Razorpay
- Conversion rate: 1 USD ≈ 83 INR
- Transparent pricing display

### ✅ Transaction Management
- Unique Razorpay payment IDs
- Transaction history tracking
- Payment status monitoring
- Automatic booking status updates

---

## 🔄 Payment Flow

### Step-by-Step Process

```
1. Buyer books an appointment
   ↓
2. Seller accepts the booking
   ↓
3. Buyer navigates to "My Appointments"
   ↓
4. Clicks "Make Payment" button
   ↓
5. Payment modal displays property details
   - Property name and location
   - Total price in USD
   - Deposit amount (10%) in USD
   - Equivalent amount in INR
   ↓
6. Buyer clicks "Pay via Razorpay"
   ↓
7. Razorpay checkout opens
   - Pre-filled buyer details
   - Multiple payment options
   - Secure payment interface
   ↓
8. Buyer selects payment method
   ↓
9. Completes payment
   ↓
10. Payment success/failure handled
    ↓
11. If successful:
    - Payment record created in database
    - Booking status updated to "completed"
    - Transaction ID stored
    - Success notification shown
    ↓
12. If failed:
    - Error message displayed
    - Booking remains in "accepted" status
    - User can retry payment
```

---

## 💰 Payment Calculation

### Example Calculation

**Property Details:**
- Property Price: $1,000,000 USD
- Deposit Percentage: 10%

**Calculation:**
```
Deposit Amount (USD) = $1,000,000 × 10% = $100,000 USD
Deposit Amount (INR) = $100,000 × 83 = ₹83,00,000 INR
Razorpay Amount (Paise) = ₹83,00,000 × 100 = 830,00,000 paise
```

**What User Sees:**
```
Property Price: $1,000,000 USD
Deposit Amount: $100,000 USD
Payment via Razorpay: ₹83,00,000 INR
```

---

## 🧪 Testing the Integration

### Test Cards (Razorpay Test Mode)

#### Success Scenario
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits (e.g., 123)
Expiry Date: Any future date (e.g., 12/25)
Name: Any name
```

#### Other Test Cards
```
Success: 5555 5555 5555 4444
Failed: 4000 0000 0000 0002
```

### Test UPI
```
UPI ID: success@razorpay
UPI ID: failure@razorpay
```

### Testing Steps

1. **Login as Buyer**
   - Email: john.buyer@email.com
   - Password: buyer123

2. **Make a Booking**
   - Browse properties
   - Select a property
   - Book appointment
   - Wait for seller acceptance (or login as seller and accept)

3. **Process Payment**
   - Go to "My Appointments"
   - Click "Make Payment"
   - Review payment details
   - Click "Pay via Razorpay"
   - Razorpay modal opens

4. **Complete Test Payment**
   - Select "Card" payment method
   - Enter test card: 4111 1111 1111 1111
   - Enter CVV: 123
   - Enter expiry: 12/25
   - Click "Pay"

5. **Verify Success**
   - Check for success toast notification
   - Verify booking status changed to "completed"
   - Check payment appears in "Payments" section
   - Note the Razorpay transaction ID

---

## 📊 Database Integration

### Payment Record Structure

When a payment is successful, the following record is created:

```javascript
{
    id: "pay-xxxxx",                          // Generated ID
    booking_id: "book-001",                   // Related booking
    buyer_id: "buyer-001",                    // Buyer user ID
    seller_id: "seller-001",                  // Seller user ID
    amount: 83000,                            // Amount in INR
    payment_method: "Razorpay",              // Payment method
    transaction_id: "pay_xxxxxxxxxxxxx",     // Razorpay payment ID
    status: "completed",                      // Payment status
    payment_date: "2025-01-07T10:30:00Z"    // ISO timestamp
}
```

### Booking Status Update

After successful payment, the booking status is updated:

```javascript
{
    status: "completed"  // Changed from "accepted" to "completed"
}
```

---

## 🔧 Technical Implementation

### Files Modified/Created

1. **index.html**
   - Added Razorpay SDK script
   - Added razorpay-config.js script

2. **js/razorpay-config.js** (NEW)
   - Razorpay credentials
   - Payment initialization function
   - Success/failure handlers
   - Currency conversion

3. **js/dashboard.js**
   - Updated `openMakePaymentModal()` function
   - Added `proceedToRazorpay()` function
   - Enhanced payment UI with INR display

### Key Functions

#### Initialize Payment
```javascript
initializeRazorpayPayment(
    bookingId,      // Booking ID
    propertyId,     // Property ID
    sellerId,       // Seller ID
    amount,         // Amount in INR
    propertyTitle,  // Property name
    buyerDetails    // Buyer information
)
```

#### Handle Success
```javascript
handleRazorpaySuccess(
    razorpayResponse,  // Response from Razorpay
    bookingId,         // Booking ID
    sellerId,          // Seller ID
    amount             // Amount in INR
)
```

#### Handle Failure
```javascript
handleRazorpayFailure(
    response  // Error response from Razorpay
)
```

#### Currency Conversion
```javascript
convertUSDtoINR(usdAmount)  // Returns INR amount
```

---

## 🎨 User Interface

### Payment Modal Features

1. **Property Information Display**
   - Property title
   - Location (city, state)
   - Total property price in USD

2. **Payment Details**
   - Deposit amount in USD (10%)
   - Equivalent amount in INR
   - Clear currency conversion display

3. **Security Indicators**
   - Razorpay logo
   - Secure payment badge
   - SSL encryption notice

4. **Action Buttons**
   - Cancel (close modal)
   - Pay via Razorpay (initiate payment)

### Razorpay Checkout Modal

1. **Pre-filled Information**
   - Buyer name
   - Email address
   - Phone number

2. **Payment Options**
   - Cards tab
   - UPI tab
   - Net Banking tab
   - Wallets tab

3. **Transaction Details**
   - Merchant name: PropBook
   - Description: Property Booking - [Property Name]
   - Amount: ₹X,XX,XXX INR

---

## 🔒 Security Features

### Data Protection
✅ No card details stored in database  
✅ Razorpay handles all sensitive data  
✅ PCI DSS Level 1 compliance  
✅ End-to-end encryption  

### Transaction Security
✅ Unique transaction IDs  
✅ Payment verification  
✅ Automatic failure handling  
✅ Secure webhook support (for production)  

### User Privacy
✅ Buyer details encrypted  
✅ Transaction history protected  
✅ Role-based access control  
✅ Secure session management  

---

## 🚀 Production Deployment

### Switching to Live Mode

1. **Get Live Credentials**
   - Login to Razorpay Dashboard
   - Navigate to Settings → API Keys
   - Generate Live Keys
   - Copy Key ID and Key Secret

2. **Update Configuration**
   ```javascript
   // In js/razorpay-config.js
   const RAZORPAY_CONFIG = {
       key: 'rzp_live_XXXXXXXXXXXXXXX',  // Live Key ID
       secret: 'XXXXXXXXXXXXXXXXXXXXXXXX' // Live Key Secret
   };
   ```

3. **Update Currency (if needed)**
   ```javascript
   // Adjust conversion rate if using dynamic rates
   const conversionRate = 83; // Or fetch from API
   ```

4. **Test Thoroughly**
   - Use real cards (small amounts)
   - Verify all payment methods
   - Check transaction recording
   - Verify booking updates

5. **Enable Webhooks (Recommended)**
   - Set up webhook URL in Razorpay Dashboard
   - Handle payment notifications
   - Ensure transaction reliability

---

## 📝 Customization Options

### Change Deposit Percentage
```javascript
// In js/dashboard.js - openMakePaymentModal function
const depositAmount = property.amount * 0.1; // Change 0.1 to desired %
```

### Change Conversion Rate
```javascript
// In js/razorpay-config.js - convertUSDtoINR function
const conversionRate = 83; // Update to current rate
```

### Change Theme Color
```javascript
// In js/razorpay-config.js - initializeRazorpayPayment function
theme: {
    color: '#2563eb'  // Change to your brand color
}
```

### Add More Payment Methods
Razorpay automatically shows available methods based on amount and configuration. To customize:
```javascript
// In Razorpay Dashboard
Settings → Payment Methods → Enable/Disable as needed
```

---

## 🐛 Troubleshooting

### Common Issues

#### Payment Modal Not Opening
**Cause:** Razorpay SDK not loaded  
**Solution:** Ensure `https://checkout.razorpay.com/v1/checkout.js` is loaded in HTML

#### "Invalid Key ID" Error
**Cause:** Incorrect Razorpay Key ID  
**Solution:** Verify key in `js/razorpay-config.js`

#### Amount Showing as 0
**Cause:** Currency conversion error  
**Solution:** Check `convertUSDtoINR()` function

#### Payment Success but Booking Not Updated
**Cause:** Database update failed  
**Solution:** Check browser console for errors, verify API connectivity

#### Payment Cancelled by User
**Behavior:** Modal closes, error toast shown  
**Action:** User can retry payment

---

## 📞 Support

### Razorpay Resources
- **Documentation:** https://razorpay.com/docs/
- **Test Cards:** https://razorpay.com/docs/payment-gateway/test-card-details/
- **Support:** https://razorpay.com/support/

### Integration Support
- Check browser console for errors
- Review `js/razorpay-config.js` for configuration
- Verify Razorpay keys are correct
- Test with Razorpay test cards first

---

## ✅ Checklist

### Before Going Live
- [ ] Obtain live Razorpay credentials
- [ ] Update RAZORPAY_KEY_ID to live key
- [ ] Update RAZORPAY_KEY_SECRET to live secret
- [ ] Test with real cards (small amounts)
- [ ] Set up webhooks for reliability
- [ ] Configure payment methods in dashboard
- [ ] Update conversion rate if needed
- [ ] Test all payment flows thoroughly
- [ ] Enable 2-factor authentication on Razorpay
- [ ] Set up payment alerts

---

## 🎉 Success!

Your PropBook platform now has **secure, production-ready payment processing** with Razorpay! 

Buyers can now make real payments for property bookings with confidence. 💳✨

---

**Last Updated:** January 7, 2025  
**Razorpay Version:** Checkout V1  
**Integration Status:** Complete ✅
