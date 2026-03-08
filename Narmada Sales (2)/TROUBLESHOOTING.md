# Troubleshooting Guide - Narmada Sales

## Common Issues and Solutions

### Issue 1: Property Images Not Showing

**Symptoms:**
- When seller adds a property, images don't display
- Placeholder image shows instead of actual property images

**Possible Causes & Solutions:**

#### Solution A: Check Image URL Format
1. Images must be entered as valid URLs (one per line)
2. Example format:
   ```
   https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800
   https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800
   ```

#### Solution B: Verify Image Array Storage
1. Open Browser Console (F12)
2. Run this to check a property:
   ```javascript
   fetch('tables/properties')
     .then(r => r.json())
     .then(data => {
       const prop = data.data[0];
       console.log('Images:', prop.images);
       console.log('Is Array?', Array.isArray(prop.images));
     });
   ```

#### Solution C: Fix Image Array if Stored as String
If images are stored as string instead of array, run this fix:
```javascript
async function fixPropertyImages() {
    const response = await fetch('tables/properties?limit=1000');
    const result = await response.json();
    
    for (const property of result.data) {
        if (typeof property.images === 'string') {
            // Convert string to array
            const imagesArray = property.images.split(',').map(url => url.trim());
            
            await fetch(`tables/properties/${property.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ images: imagesArray })
            });
            console.log(`Fixed images for: ${property.title}`);
        }
    }
    console.log('✅ All property images fixed!');
}

// Run the fix
fixPropertyImages();
```

---

### Issue 2: Property Card Not Clickable / Not Redirecting

**Symptoms:**
- Clicking on property cards does nothing
- Property details page doesn't open

**Solutions:**

#### Solution A: Check for JavaScript Errors
1. Open Browser Console (F12)
2. Look for any red error messages
3. Click on a property card
4. Check if any errors appear

#### Solution B: Verify viewPropertyDetail Function
Run this in console:
```javascript
// Test if function exists
console.log('viewPropertyDetail exists?', typeof viewPropertyDetail === 'function');

// Test manually
viewPropertyDetail('prop-001'); // Use actual property ID
```

#### Solution C: Check Event Listener
Run this to debug click events:
```javascript
document.querySelectorAll('.property-card').forEach((card, index) => {
    console.log(`Card ${index}:`, card.onclick);
    card.addEventListener('click', (e) => {
        console.log('Card clicked!', e.target);
    });
});
```

---

### Issue 3: Razorpay Payment Not Working

**Symptoms:**
- Clicking "Pay with Razorpay" does nothing
- No payment modal appears

**Solutions:**

#### Solution A: Check Razorpay SDK Loading
```javascript
// Check if Razorpay is loaded
console.log('Razorpay loaded?', typeof Razorpay !== 'undefined');

// Check SDK URL in HTML
console.log('Script tags:', document.querySelectorAll('script[src*="razorpay"]'));
```

#### Solution B: Verify Razorpay Credentials
```javascript
// Check config (in razorpay-config.js)
console.log('Razorpay Key:', RAZORPAY_CONFIG.key);
// Should show: rzp_test_RyTlLv8NtADLfJ
```

#### Solution C: Test Payment Function
```javascript
// Check if function exists
console.log('initializeRazorpayPayment exists?', 
    typeof initializeRazorpayPayment === 'function');

// Test with dummy data
const testPayment = () => {
    initializeRazorpayPayment(
        'booking-test-001',
        'prop-001',
        'seller-001',
        10000, // Amount in INR
        'Test Property',
        {
            name: 'Test User',
            email: 'test@example.com',
            phone: '+919876543210'
        }
    );
};

// Run test
testPayment();
```

#### Solution D: Check Console for Errors
When you click "Pay with Razorpay", check console for:
1. "Initializing Razorpay payment..." message
2. Any error messages
3. "Razorpay options:" log
4. "Razorpay modal opened" message

---

### Issue 4: Property Not Appearing After Adding

**Symptoms:**
- Seller adds property
- Property doesn't show in listings
- No error message

**Solutions:**

#### Solution A: Check if Property Was Created
```javascript
async function checkMyProperties() {
    const response = await fetch('tables/properties?limit=1000');
    const result = await response.json();
    
    // Get current user ID from localStorage
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const myProps = result.data.filter(p => p.seller_id === user.id);
    
    console.log('My properties:', myProps);
    console.log('Total count:', myProps.length);
}

checkMyProperties();
```

#### Solution B: Force Reload Properties
```javascript
// Reload properties on the page
if (typeof loadAllProperties === 'function') {
    loadAllProperties();
}
if (typeof loadFeaturedProperties === 'function') {
    loadFeaturedProperties();
}
```

---

### Issue 5: Currency Showing Wrong Format

**Symptoms:**
- Prices showing in USD instead of INR
- Missing ₹ symbol

**Solution: Update Price Display**
Find and update all price displays to use INR format:
```javascript
// Correct format
`₹${amount.toLocaleString('en-IN')}`

// Check current format in console
document.querySelectorAll('.property-price').forEach(el => {
    console.log('Price element:', el.textContent);
});
```

---

### Issue 6: Database Not Updating After Deployment

**Symptoms:**
- Changes made locally don't reflect on deployed site
- Old data showing

**Solution: Clear and Re-import Data**
```javascript
// On your deployed site, open console and run:

// 1. First, check current data
fetch('tables/properties')
  .then(r => r.json())
  .then(d => console.log('Current properties:', d.data.length));

// 2. If you need to re-import, use database-import.js
// Copy the script content and run importAllData()
```

---

## Quick Diagnostic Script

Run this comprehensive diagnostic in browser console:

```javascript
async function runDiagnostics() {
    console.log('=== NARMADA SALES DIAGNOSTICS ===\n');
    
    // 1. Check JavaScript Libraries
    console.log('1. Libraries:');
    console.log('   Razorpay:', typeof Razorpay !== 'undefined' ? '✅' : '❌');
    console.log('');
    
    // 2. Check Functions
    console.log('2. Core Functions:');
    console.log('   viewPropertyDetail:', typeof viewPropertyDetail === 'function' ? '✅' : '❌');
    console.log('   initializeRazorpayPayment:', typeof initializeRazorpayPayment === 'function' ? '✅' : '❌');
    console.log('   loadAllProperties:', typeof loadAllProperties === 'function' ? '✅' : '❌');
    console.log('');
    
    // 3. Check Database
    console.log('3. Database:');
    try {
        const propsRes = await fetch('tables/properties?limit=1');
        const propsData = await propsRes.json();
        console.log('   Properties table:', propsData.data ? '✅' : '❌');
        
        const usersRes = await fetch('tables/users?limit=1');
        const usersData = await usersRes.json();
        console.log('   Users table:', usersData.data ? '✅' : '❌');
    } catch (e) {
        console.log('   Database:', '❌', e.message);
    }
    console.log('');
    
    // 4. Check Current User
    console.log('4. Authentication:');
    const user = localStorage.getItem('currentUser');
    console.log('   Logged in:', user ? '✅' : '❌');
    if (user) {
        const userData = JSON.parse(user);
        console.log('   Role:', userData.role);
        console.log('   Name:', userData.name);
    }
    console.log('');
    
    // 5. Check Property Cards
    console.log('5. Property Cards:');
    const cards = document.querySelectorAll('.property-card');
    console.log('   Cards on page:', cards.length);
    console.log('   Clickable:', cards.length > 0 && cards[0].onclick ? '✅' : '❌');
    console.log('');
    
    // 6. Check Images
    console.log('6. Property Images:');
    const imgs = document.querySelectorAll('.property-image');
    console.log('   Image elements:', imgs.length);
    if (imgs.length > 0) {
        console.log('   First image src:', imgs[0].src);
    }
    console.log('');
    
    console.log('=== DIAGNOSTICS COMPLETE ===');
}

runDiagnostics();
```

---

## Contact Support

If issues persist after trying these solutions:

**Email:** info@narmadasales.com  
**Phone:** +91 94283 61305

**When reporting issues, please include:**
1. Browser name and version
2. Console error messages (screenshot)
3. Steps to reproduce the issue
4. Your user role (admin/buyer/seller)

---

## Quick Links

- [Database Import Script](./database-import.js)
- [Cloudflare Deployment Guide](./CLOUDFLARE_DEPLOYMENT_GUIDE.md)
- [README](./README.md)

---

**Last Updated:** 2025-01-14
