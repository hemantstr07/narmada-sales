// Razorpay Configuration and Payment Handler

// Razorpay Credentials
const RAZORPAY_CONFIG = {
    key: 'rzp_test_RyTlLv8NtADLfJ',
    secret: 'ejf5D47qV6EK5x4ZzAjA708A'
};

// Check if Razorpay SDK is loaded
if (typeof Razorpay === 'undefined') {
    console.error('Razorpay SDK not loaded! Please check if the script is included.');
}

// Initialize Razorpay Payment
function initializeRazorpayPayment(bookingId, propertyId, sellerId, amount, propertyTitle, buyerDetails) {
    console.log('Initializing Razorpay payment...', { bookingId, propertyId, sellerId, amount, propertyTitle });
    
    // Check if Razorpay is available
    if (typeof Razorpay === 'undefined') {
        console.error('Razorpay SDK not loaded!');
        showToast('Payment system not available. Please refresh the page.', 'error');
        return;
    }

    const options = {
        key: RAZORPAY_CONFIG.key,
        amount: Math.round(amount * 100), // Razorpay expects amount in paise (multiply by 100)
        currency: 'INR',
        name: 'Narmada Sales',
        description: `Property Booking - ${propertyTitle}`,
        image: 'https://image2url.com/r2/default/images/1768622643545-04e59dc1-8278-4ef2-96d7-3d5acc8adf5f.png',
        handler: function (response) {
            // Payment successful
            console.log('Payment successful:', response);
            handleRazorpaySuccess(response, bookingId, sellerId, amount);
        },
        prefill: {
            name: buyerDetails.name,
            email: buyerDetails.email,
            contact: buyerDetails.phone
        },
        notes: {
            booking_id: bookingId,
            property_id: propertyId,
            seller_id: sellerId
        },
        theme: {
            color: '#d4a574'
        },
        modal: {
            ondismiss: function() {
                console.log('Payment modal dismissed');
                hideLoading();
                showToast('Payment cancelled', 'error');
            }
        }
    };

    console.log('Razorpay options:', options);

    try {
        const razorpayInstance = new Razorpay(options);
        
        razorpayInstance.on('payment.failed', function (response) {
            console.log('Payment failed:', response);
            handleRazorpayFailure(response);
        });

        razorpayInstance.open();
        console.log('Razorpay modal opened');
    } catch (error) {
        console.error('Error initializing Razorpay:', error);
        showToast('Failed to initialize payment. Please try again.', 'error');
    }
}

// Handle Successful Payment
async function handleRazorpaySuccess(razorpayResponse, bookingId, sellerId, amount) {
    try {
        showLoading();

        // Create payment record with Razorpay details
        const payment = {
            id: generateId('pay'),
            booking_id: bookingId,
            buyer_id: state.currentUser.id,
            seller_id: sellerId,
            amount: amount,
            payment_method: 'Razorpay',
            transaction_id: razorpayResponse.razorpay_payment_id,
            status: 'completed',
            payment_date: new Date().toISOString()
        };

        // ✅ NEW: Call Cloudflare Pages Function
        const response = await fetch('/payments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payment)
        });

        if (response.ok) {
            // Update booking status to completed
            await fetch(`/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'completed' })
            });

            showToast('Payment successful! Transaction ID: ' + razorpayResponse.razorpay_payment_id, 'success');
            closeModal();
            
            // Reload bookings to show updated status
            setTimeout(() => {
                loadMyBookings();
            }, 1000);
        } else {
            throw new Error('Failed to save payment details');
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        showToast('Payment completed but failed to update records. Please contact support.', 'error');
    } finally {
        hideLoading();
    }
}

// Handle Failed Payment
function handleRazorpayFailure(response) {
    hideLoading();
    
    const errorMessage = response.error.description || 'Payment failed. Please try again.';
    showToast(errorMessage, 'error');
    
    console.error('Razorpay Payment Error:', {
        code: response.error.code,
        description: response.error.description,
        source: response.error.source,
        step: response.error.step,
        reason: response.error.reason
    });
}
