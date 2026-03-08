# 💳 Razorpay Testing - Quick Reference Card

## 🎯 Quick Test Guide

### Step 1: Login as Buyer
```
Email: john.buyer@email.com
Password: buyer123
```

### Step 2: Book a Property
1. Go to "Properties" page
2. Select any property
3. Click "Book Appointment"
4. Choose date/time
5. Submit booking

### Step 3: Get Booking Accepted
**Option A:** Login as seller and accept
```
Logout → Login as Seller
Email: mike.seller@email.com
Password: seller123
Go to: Booking Requests → Click "Accept"
```

**Option B:** Use existing accepted booking
- Sample bookings are pre-loaded in database

### Step 4: Make Payment
1. Login back as Buyer
2. Go to "My Appointments"
3. Find accepted booking
4. Click "Make Payment"
5. Review payment details
6. Click "Pay via Razorpay"

### Step 5: Complete Payment in Razorpay
**Test Card Details:**
```
Card Number: 4111 1111 1111 1111
CVV: 123
Expiry: 12/25
Name: Test User
```

**Or use UPI:**
```
UPI ID: success@razorpay
```

### Step 6: Verify Success
- ✅ Success toast notification
- ✅ Booking status → "Completed"
- ✅ Payment in "Payments" section
- ✅ Razorpay transaction ID saved

---

## 🧪 Test Cards

### Success Cards
| Card Network | Card Number | Result |
|-------------|-------------|---------|
| Visa | 4111 1111 1111 1111 | ✅ Success |
| Mastercard | 5555 5555 5555 4444 | ✅ Success |
| Rupay | 6074 8200 0000 0007 | ✅ Success |

### Failure Cards
| Card Number | Result |
|-------------|---------|
| 4000 0000 0000 0002 | ❌ Card Declined |
| 4000 0000 0000 0069 | ❌ Expired Card |

### Common CVV & Expiry
- **CVV:** Any 3 digits (e.g., 123, 456, 789)
- **Expiry:** Any future date (e.g., 12/25, 06/26, 12/30)

---

## 🔄 Test UPI

### Success UPI IDs
```
success@razorpay
successfulpayment@razorpay
```

### Failure UPI IDs
```
failure@razorpay
failedpayment@razorpay
```

---

## 💰 Test Scenarios

### Scenario 1: Successful Payment
```
Property: Luxury Beach Villa ($3,500,000)
Deposit (10%): $350,000
In Razorpay: ₹2,90,50,000

Steps:
1. Book appointment
2. Get it accepted
3. Make payment
4. Use card: 4111 1111 1111 1111
5. Complete payment
6. ✅ Success!
```

### Scenario 2: Failed Payment
```
Use card: 4000 0000 0000 0002
Result: Payment declined
Booking status: Remains "Accepted"
User can retry payment
```

### Scenario 3: User Cancels Payment
```
Click outside Razorpay modal OR
Click "X" on Razorpay modal
Result: Payment cancelled
Booking status: Remains "Accepted"
```

---

## 📊 Payment Flow Summary

```
Booking (Pending)
      ↓
Seller Accepts
      ↓
Booking (Accepted)
      ↓
Buyer Clicks "Make Payment"
      ↓
Payment Modal Opens
      ↓
USD → INR Conversion Shown
      ↓
Click "Pay via Razorpay"
      ↓
Razorpay Checkout Opens
      ↓
Select Payment Method
      ↓
Enter Test Details
      ↓
Submit Payment
      ↓
✅ Success → Booking (Completed)
❌ Failure → Booking (Accepted) - Can Retry
```

---

## 🎨 What You'll See

### Payment Modal
```
┌─────────────────────────────────┐
│  Make Payment              [X]  │
├─────────────────────────────────┤
│                                 │
│  Property: Luxury Beach Villa   │
│  Location: Miami Beach, FL      │
│  Total Price: $3,500,000 USD    │
│  ────────────────────────────   │
│  Deposit (10%): $350,000 USD    │
│  ≈ ₹2,90,50,000 INR (Razorpay) │
│                                 │
│  🔒 Secure payment via Razorpay │
│                                 │
│  [razorpay logo]                │
│                                 │
│  [Cancel] [Pay ₹2,90,50,000]   │
└─────────────────────────────────┘
```

### Razorpay Checkout
```
┌─────────────────────────────────┐
│  PropBook                       │
│  Property Booking - Villa       │
│  ₹2,90,50,000                  │
├─────────────────────────────────┤
│  Cards | UPI | NetBanking | ... │
├─────────────────────────────────┤
│  Card Number                    │
│  [4111 1111 1111 1111]         │
│                                 │
│  Expiry        CVV              │
│  [12/25]      [123]             │
│                                 │
│  Name                           │
│  [Test User]                    │
│                                 │
│         [Pay ₹2,90,50,000]      │
└─────────────────────────────────┘
```

---

## ✅ Verification Checklist

After payment:
- [ ] Success toast notification appears
- [ ] Razorpay payment ID shown in toast
- [ ] Booking status changes to "Completed"
- [ ] Payment appears in "Payments" section
- [ ] Transaction ID matches Razorpay ID
- [ ] Amount stored correctly
- [ ] Can give feedback now

---

## 🐛 Troubleshooting

### Issue: Razorpay modal not opening
**Fix:** Check browser console, reload page

### Issue: Payment stuck
**Fix:** Close modal, retry payment

### Issue: Amount showing 0
**Fix:** Refresh page, check property price

### Issue: Success but status not updated
**Fix:** Check console errors, refresh page

---

## 📞 Quick Links

- **Razorpay Dashboard:** https://dashboard.razorpay.com
- **Test Cards:** https://razorpay.com/docs/payment-gateway/test-card-details/
- **Full Guide:** RAZORPAY_INTEGRATION.md

---

## 🎯 Current Configuration

```javascript
Key ID: rzp_test_RyTlLv8NtADLfJ
Mode: TEST MODE ⚠️
Currency: INR (₹)
Conversion: 1 USD = 83 INR
```

---

## 🎉 Ready to Test!

**Most Common Test:**
```
1. Login as john.buyer@email.com / buyer123
2. Go to My Appointments
3. Click "Make Payment" on any accepted booking
4. Use card: 4111 1111 1111 1111 (CVV: 123, Exp: 12/25)
5. Success! ✅
```

---

**Happy Testing!** 💳✨

---

**Quick Tip:** Keep this card open while testing for easy reference!
