// Membership Management Functions

let membershipPlans = [];
let membershipStatus = null;

// Load membership plans from API
async function loadMembershipPlans() {
    try {
        const response = await fetch('/memberships');
        if (response.ok) {
            membershipPlans = await response.json();
            return membershipPlans;
        }
    } catch (error) {
        console.error('Error loading membership plans:', error);
        showToast('Error loading membership plans', 'error');
    }
    return [];
}

// Get user's current membership status
async function getMembershipStatus(userId) {
    try {
        const response = await fetch(`/memberships/status/${userId}`);
        if (response.ok) {
            membershipStatus = await response.json();
            return membershipStatus;
        }
    } catch (error) {
        console.error('Error loading membership status:', error);
        showToast('Error loading membership status', 'error');
    }
    return null;
}

// Load membership page in seller dashboard
async function loadMembershipPage() {
    try {
        showLoading();
        updateSidebarActive(event?.target);
        
        // Load plans and status
        await loadMembershipPlans();
        const status = await getMembershipStatus(state.currentUser.id);
        
        if (!status) {
            showToast('Error loading membership information', 'error');
            return;
        }
        
        const isExpired = status.is_expired;
        const currentPlanName = status.plan_details ? status.plan_details.name : 'Free Plan';
        const expiryDate = status.membership_expiry ? new Date(status.membership_expiry).toLocaleDateString('en-IN') : 'Never';
        
        const content = `
            <div class="dashboard-header">
                <h1>Membership Management</h1>
                <p>Manage your subscription and property limits</p>
            </div>
            
            <div class="membership-status-card">
                <div class="membership-status-header">
                    <h2>Current Membership</h2>
                    ${isExpired ? '<span class="badge badge-danger">Expired</span>' : '<span class="badge badge-success">Active</span>'}
                </div>
                <div class="membership-status-body">
                    <div class="membership-stat">
                        <i class="fas fa-crown"></i>
                        <div>
                            <h3>${currentPlanName}</h3>
                            <p>Current Plan</p>
                        </div>
                    </div>
                    <div class="membership-stat">
                        <i class="fas fa-home"></i>
                        <div>
                            <h3>${status.property_count} / ${status.property_limit}</h3>
                            <p>Properties Listed</p>
                        </div>
                    </div>
                    <div class="membership-stat">
                        <i class="fas fa-calendar"></i>
                        <div>
                            <h3>${expiryDate}</h3>
                            <p>Expires On</p>
                        </div>
                    </div>
                    <div class="membership-stat">
                        <i class="fas fa-plus-circle"></i>
                        <div>
                            <h3>${status.remaining_slots}</h3>
                            <p>Available Slots</p>
                        </div>
                    </div>
                </div>
                ${isExpired ? `
                    <div class="membership-alert alert-danger">
                        <i class="fas fa-exclamation-triangle"></i>
                        Your membership has expired. Please upgrade to continue listing properties.
                    </div>
                ` : status.remaining_slots === 0 ? `
                    <div class="membership-alert alert-warning">
                        <i class="fas fa-exclamation-circle"></i>
                        You've reached your property limit. Upgrade to list more properties!
                    </div>
                ` : ''}
            </div>
            
            <div class="membership-plans-section">
                <h2>Available Membership Plans</h2>
                <p class="section-subtitle">Choose the plan that best fits your needs</p>
                
                <div class="membership-plans-grid">
                    ${membershipPlans.map(plan => {
                        const isCurrent = status.membership_type === plan.id;
                        const isUpgrade = !isCurrent && plan.property_limit > status.property_limit;
                        const features = plan.features || [];
                        
                        return `
                            <div class="membership-plan-card ${isCurrent ? 'current-plan' : ''} ${plan.id === 'plan_standard' ? 'popular-plan' : ''}">
                                ${plan.id === 'plan_standard' ? '<div class="popular-badge">Most Popular</div>' : ''}
                                ${isCurrent ? '<div class="current-badge">Current Plan</div>' : ''}
                                
                                <div class="plan-header">
                                    <h3>${plan.name}</h3>
                                    <div class="plan-price">
                                        <span class="currency">₹</span>
                                        <span class="amount">${plan.price.toLocaleString('en-IN')}</span>
                                        <span class="period">/year</span>
                                    </div>
                                    <p class="plan-description">${plan.description}</p>
                                </div>
                                
                                <div class="plan-features">
                                    <div class="feature-highlight">
                                        <i class="fas fa-home"></i>
                                        <strong>${plan.property_limit} Properties</strong>
                                    </div>
                                    ${features.map(feature => `
                                        <div class="feature-item">
                                            <i class="fas fa-check"></i>
                                            <span>${feature}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                <div class="plan-action">
                                    ${isCurrent ? `
                                        <button class="btn-outline" disabled>
                                            <i class="fas fa-check-circle"></i> Current Plan
                                        </button>
                                    ` : plan.id === 'plan_free' ? `
                                        <button class="btn-outline" disabled>
                                            Free Plan
                                        </button>
                                    ` : `
                                        <button class="btn-primary" onclick="purchaseMembership('${plan.id}', ${plan.price}, '${plan.name}')">
                                            <i class="fas fa-shopping-cart"></i> ${isUpgrade ? 'Upgrade Now' : 'Purchase'}
                                        </button>
                                    `}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="membership-faq">
                <h2>Frequently Asked Questions</h2>
                <div class="faq-grid">
                    <div class="faq-item">
                        <h3><i class="fas fa-question-circle"></i> How does membership work?</h3>
                        <p>Each membership plan allows you to list a specific number of properties. Upgrading gives you more slots and additional features.</p>
                    </div>
                    <div class="faq-item">
                        <h3><i class="fas fa-question-circle"></i> Can I upgrade anytime?</h3>
                        <p>Yes! You can upgrade your membership at any time. Your new limits will be available immediately after payment.</p>
                    </div>
                    <div class="faq-item">
                        <h3><i class="fas fa-question-circle"></i> What happens when membership expires?</h3>
                        <p>Your existing properties remain visible, but you won't be able to add new ones until you renew your membership.</p>
                    </div>
                    <div class="faq-item">
                        <h3><i class="fas fa-question-circle"></i> Is payment secure?</h3>
                        <p>Yes! We use Razorpay, a trusted payment gateway with bank-level security for all transactions.</p>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('dashboardContent').innerHTML = content;
        
    } catch (error) {
        console.error('Error loading membership page:', error);
        showToast('Error loading membership page', 'error');
    } finally {
        hideLoading();
    }
}

// Purchase membership with Razorpay
async function purchaseMembership(planId, amount, planName) {
    try {
        showLoading();
        
        // Create Razorpay order
        const orderResponse = await fetch('/payments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: amount * 100, // Convert to paise
                currency: 'INR',
                receipt: `membership_${planId}_${Date.now()}`
            })
        });
        
        if (!orderResponse.ok) {
            throw new Error('Failed to create payment order');
        }
        
        const orderData = await orderResponse.json();
        
        // Configure Razorpay options
        const options = {
            key: RAZORPAY_CONFIG.KEY_ID,
            amount: amount * 100,
            currency: 'INR',
            name: 'Narmada Sales',
            description: `${planName} Membership`,
            order_id: orderData.id,
            handler: async function(response) {
                await handleMembershipPaymentSuccess(
                    planId,
                    response.razorpay_payment_id,
                    response.razorpay_order_id,
                    response.razorpay_signature
                );
            },
            prefill: {
                name: state.currentUser.name,
                email: state.currentUser.email,
                contact: state.currentUser.phone || ''
            },
            theme: {
                color: '#d4a574'
            },
            modal: {
                ondismiss: function() {
                    hideLoading();
                    showToast('Payment cancelled', 'info');
                }
            }
        };
        
        // Open Razorpay checkout
        const razorpay = new Razorpay(options);
        razorpay.open();
        
        hideLoading();
        
    } catch (error) {
        console.error('Error purchasing membership:', error);
        showToast('Error initiating payment: ' + error.message, 'error');
        hideLoading();
    }
}

// Handle successful membership payment
async function handleMembershipPaymentSuccess(planId, paymentId, orderId, signature) {
    try {
        showLoading();
        
        // Record membership purchase
        const response = await fetch('/memberships/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: state.currentUser.id,
                planId: planId,
                razorpayPaymentId: paymentId,
                razorpayOrderId: orderId,
                razorpaySignature: signature
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to process membership purchase');
        }
        
        const result = await response.json();
        
        // Update current user's membership info
        const updatedUser = await fetch(`/tables/users/${state.currentUser.id}`);
        if (updatedUser.ok) {
            state.currentUser = await updatedUser.json();
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        }
        
        showToast('Membership upgraded successfully! 🎉', 'success');
        
        // Reload membership page to show new status
        await loadMembershipPage();
        
    } catch (error) {
        console.error('Error processing membership:', error);
        showToast('Error processing membership: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Check membership before adding property
async function checkPropertyLimitBeforeAdd() {
    try {
        const status = await getMembershipStatus(state.currentUser.id);
        
        if (!status) {
            showToast('Error checking membership status', 'error');
            return false;
        }
        
        if (status.is_expired) {
            showToast('Your membership has expired. Please renew to add properties.', 'error');
            loadMembershipPage();
            return false;
        }
        
        if (status.remaining_slots <= 0) {
            const confirmUpgrade = confirm(
                `You've reached your property limit (${status.property_limit} properties).\n\n` +
                `Would you like to upgrade your membership to list more properties?`
            );
            
            if (confirmUpgrade) {
                loadMembershipPage();
            }
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error checking property limit:', error);
        return true; // Allow in case of error to not block users
    }
}
