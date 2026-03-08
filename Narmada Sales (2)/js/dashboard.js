// Dashboard Management - Role-based content loading

async function loadDashboard() {
    if (!state.currentUser) {
        showPage('login');
        return;
    }

    const role = state.currentUser.role;

    // Load appropriate sidebar based on role
    if (role === 'admin') {
        loadAdminSidebar();
        await loadAdminDashboard();
    } else if (role === 'buyer') {
        loadBuyerSidebar();
        await loadBuyerDashboard();
    } else if (role === 'seller') {
        loadSellerSidebar();
        await loadSellerDashboard();
    }
}

// Sidebar Loading Functions
function loadAdminSidebar() {
    const sidebar = document.getElementById('dashboardSidebar');
    sidebar.innerHTML = `
        <div class="dashboard-sidebar-item active" onclick="loadAdminDashboard()">
            <i class="fas fa-chart-line"></i> Overview
        </div>
        <div class="dashboard-sidebar-item" onclick="loadManageBuyers()">
            <i class="fas fa-users"></i> Manage Buyers
        </div>
        <div class="dashboard-sidebar-item" onclick="loadManageSellers()">
            <i class="fas fa-building"></i> Manage Sellers
        </div>
        <div class="dashboard-sidebar-item" onclick="loadManagePropertyTypes()">
            <i class="fas fa-list"></i> Property Types
        </div>
        <div class="dashboard-sidebar-item" onclick="loadVerifyDocuments()">
            <i class="fas fa-file-check"></i> Verify Documents
        </div>
        <div class="dashboard-sidebar-item" onclick="loadAllBookings()">
            <i class="fas fa-calendar"></i> All Bookings
        </div>
        <div class="dashboard-sidebar-item" onclick="loadAllPayments()">
            <i class="fas fa-money-bill"></i> Payments
        </div>
        <div class="dashboard-sidebar-item" onclick="loadAllFeedback()">
            <i class="fas fa-comments"></i> Feedback
        </div>
        <div class="dashboard-sidebar-item" onclick="loadGenerateInvoices()">
            <i class="fas fa-file-invoice"></i> Generate Invoice
        </div>
    `;
}

function loadBuyerSidebar() {
    const sidebar = document.getElementById('dashboardSidebar');
    sidebar.innerHTML = `
        <div class="dashboard-sidebar-item active" onclick="loadBuyerDashboard()">
            <i class="fas fa-chart-line"></i> Overview
        </div>
        <div class="dashboard-sidebar-item" onclick="showPage('properties')">
            <i class="fas fa-search"></i> Search Properties
        </div>
        <div class="dashboard-sidebar-item" onclick="loadMyBookings()">
            <i class="fas fa-calendar-check"></i> My Appointments
        </div>
        <div class="dashboard-sidebar-item" onclick="loadMyPayments()">
            <i class="fas fa-credit-card"></i> Payments
        </div>
        <div class="dashboard-sidebar-item" onclick="loadMyInvoices()">
            <i class="fas fa-file-invoice"></i> Invoices
        </div>
        <div class="dashboard-sidebar-item" onclick="loadMyFeedback()">
            <i class="fas fa-star"></i> My Feedback
        </div>
    `;
}

function loadSellerSidebar() {
    const sidebar = document.getElementById('dashboardSidebar');
    sidebar.innerHTML = `
        <div class="dashboard-sidebar-item active" onclick="loadSellerDashboard()">
            <i class="fas fa-chart-line"></i> Overview
        </div>
        <div class="dashboard-sidebar-item" onclick="loadMembershipPage()">
            <i class="fas fa-crown"></i> Membership
        </div>
        <div class="dashboard-sidebar-item" onclick="loadMyProperties()">
            <i class="fas fa-home"></i> My Properties
        </div>
        <div class="dashboard-sidebar-item" onclick="loadMyDocuments()">
            <i class="fas fa-file-alt"></i> Documents
        </div>
        <div class="dashboard-sidebar-item" onclick="loadPropertyBookings()">
            <i class="fas fa-calendar-alt"></i> Booking Requests
        </div>
        <div class="dashboard-sidebar-item" onclick="loadSellerPayments()">
            <i class="fas fa-rupee-sign"></i> Payments Received
        </div>
        <div class="dashboard-sidebar-item" onclick="loadPropertyFeedback()">
            <i class="fas fa-comments"></i> Property Feedback
        </div>
    `;
}

// Update sidebar active state
function updateSidebarActive(clickedElement) {
    document.querySelectorAll('.dashboard-sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    if (clickedElement && clickedElement.classList) {
        clickedElement.classList.add('active');
    }
}

// ADMIN DASHBOARD FUNCTIONS
async function loadAdminDashboard() {
    try {
        showLoading();
        
        // Fetch all data
        const [usersRes, propertiesRes, bookingsRes, paymentsRes] = await Promise.all([
            fetch('tables/users?limit=1000'),
            fetch('tables/properties?limit=1000'),
            fetch('tables/bookings?limit=1000'),
            fetch('tables/payments?limit=1000')
        ]);

        const users = (await usersRes.json()).data;
        const properties = (await propertiesRes.json()).data;
        const bookings = (await bookingsRes.json()).data;
        const payments = (await paymentsRes.json()).data;

        const buyersCount = users.filter(u => u.role === 'buyer').length;
        const sellersCount = users.filter(u => u.role === 'seller').length;
        const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

        const content = `
            <div class="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome back, ${state.currentUser.name}</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Total Buyers</h3>
                        <div class="stat-card-icon" style="background: #dbeafe; color: #1e40af;">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                    <div class="stat-value">${buyersCount}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Total Sellers</h3>
                        <div class="stat-card-icon" style="background: #fef3c7; color: #92400e;">
                            <i class="fas fa-building"></i>
                        </div>
                    </div>
                    <div class="stat-value">${sellersCount}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Total Properties</h3>
                        <div class="stat-card-icon" style="background: #d1fae5; color: #065f46;">
                            <i class="fas fa-home"></i>
                        </div>
                    </div>
                    <div class="stat-value">${properties.length}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Total Revenue</h3>
                        <div class="stat-card-icon" style="background: #fce7f3; color: #9f1239;">
                            <i class="fas fa-rupee-sign"></i>
                        </div>
                    </div>
                    <div class="stat-value">₹${totalRevenue.toLocaleString('en-IN')}</div>
                </div>
            </div>

            <div class="data-table">
                <div class="table-header">
                    <h3>Recent Bookings</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Buyer</th>
                            <th>Property</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${await generateBookingsRows(bookings.slice(0, 10), users, properties)}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading admin dashboard:', error);
        showToast('Error loading dashboard', 'error');
    } finally {
        hideLoading();
    }
}

async function loadManageBuyers() {
    try {
        showLoading();
        const response = await fetch('tables/users?limit=1000');
        const result = await response.json();
        const buyers = result.data.filter(u => u.role === 'buyer');

        const content = `
            <div class="dashboard-header">
                <h1>Manage Buyers</h1>
            </div>

            <div class="data-table">
                <div class="table-header">
                    <h3>All Buyers</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${buyers.map(buyer => `
                            <tr>
                                <td>${buyer.name}</td>
                                <td>${buyer.email}</td>
                                <td>${buyer.phone}</td>
                                <td><span class="status-badge status-${buyer.status}">${buyer.status}</span></td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn action-btn-edit" onclick="toggleUserStatus('${buyer.id}', '${buyer.status}')">
                                            ${buyer.status === 'active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading buyers:', error);
        showToast('Error loading buyers', 'error');
    } finally {
        hideLoading();
    }
}

async function loadManageSellers() {
    try {
        showLoading();
        const response = await fetch('tables/users?limit=1000');
        const result = await response.json();
        const sellers = result.data.filter(u => u.role === 'seller');

        const content = `
            <div class="dashboard-header">
                <h1>Manage Sellers</h1>
            </div>

            <div class="data-table">
                <div class="table-header">
                    <h3>All Sellers</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sellers.map(seller => `
                            <tr>
                                <td>${seller.name}</td>
                                <td>${seller.email}</td>
                                <td>${seller.phone}</td>
                                <td><span class="status-badge status-${seller.status}">${seller.status}</span></td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn action-btn-edit" onclick="toggleUserStatus('${seller.id}', '${seller.status}')">
                                            ${seller.status === 'active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading sellers:', error);
        showToast('Error loading sellers', 'error');
    } finally {
        hideLoading();
    }
}

async function toggleUserStatus(userId, currentStatus) {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
        showLoading();
        const response = await fetch(`tables/users/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
            showToast('User status updated', 'success');
            loadDashboard();
        }
    } catch (error) {
        console.error('Error updating user status:', error);
        showToast('Error updating user status', 'error');
    } finally {
        hideLoading();
    }
}

async function loadManagePropertyTypes() {
    try {
        showLoading();
        const response = await fetch('tables/property_types?limit=1000');
        const result = await response.json();

        const content = `
            <div class="dashboard-header">
                <h1>Property Types</h1>
                <button class="btn-primary" onclick="openAddPropertyTypeModal()">
                    <i class="fas fa-plus"></i> Add Property Type
                </button>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${result.data.map(type => `
                            <tr>
                                <td>${type.name}</td>
                                <td>${type.description}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn action-btn-delete" onclick="deletePropertyType('${type.id}')">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading property types:', error);
        showToast('Error loading property types', 'error');
    } finally {
        hideLoading();
    }
}

function openAddPropertyTypeModal() {
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add Property Type</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="addPropertyTypeForm" onsubmit="handleAddPropertyType(event)">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" id="propTypeName" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="propTypeDesc" required></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.getElementById('modalContainer').innerHTML = modalContent;
    document.getElementById('modalContainer').classList.add('show');
}

async function handleAddPropertyType(event) {
    event.preventDefault();

    const propertyType = {
        id: generateId('type'),
        name: document.getElementById('propTypeName').value,
        description: document.getElementById('propTypeDesc').value
    };

    try {
        showLoading();
        const response = await fetch('tables/property_types', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(propertyType)
        });

        if (response.ok) {
            showToast('Property type added', 'success');
            closeModal();
            await loadPropertyTypes();
            loadManagePropertyTypes();
        }
    } catch (error) {
        console.error('Error adding property type:', error);
        showToast('Error adding property type', 'error');
    } finally {
        hideLoading();
    }
}

async function deletePropertyType(typeId) {
    if (!confirm('Are you sure you want to delete this property type?')) return;

    try {
        showLoading();
        await fetch(`tables/property_types/${typeId}`, { method: 'DELETE' });
        showToast('Property type deleted', 'success');
        await loadPropertyTypes();
        loadManagePropertyTypes();
    } catch (error) {
        console.error('Error deleting property type:', error);
        showToast('Error deleting property type', 'error');
    } finally {
        hideLoading();
    }
}

async function loadVerifyDocuments() {
    try {
        showLoading();
        const [docsRes, usersRes, propsRes] = await Promise.all([
            fetch('tables/documents?limit=1000'),
            fetch('tables/users?limit=1000'),
            fetch('tables/properties?limit=1000')
        ]);

        const documents = (await docsRes.json()).data;
        const users = (await usersRes.json()).data;
        const properties = (await propsRes.json()).data;

        const content = `
            <div class="dashboard-header">
                <h1>Document Verification</h1>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Seller</th>
                            <th>Document Type</th>
                            <th>Property</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${documents.map(doc => {
                            const seller = users.find(u => u.id === doc.seller_id);
                            const property = properties.find(p => p.id === doc.property_id);
                            return `
                                <tr>
                                    <td>${seller ? seller.name : 'Unknown'}</td>
                                    <td>${doc.document_type}</td>
                                    <td>${property ? property.title : 'N/A'}</td>
                                    <td><span class="status-badge status-${doc.status}">${doc.status}</span></td>
                                    <td>
                                        <div class="action-buttons">
                                            <button class="action-btn action-btn-view" onclick="window.open('${doc.document_url}', '_blank')">View</button>
                                            ${doc.status === 'pending' ? `
                                                <button class="action-btn action-btn-edit" onclick="verifyDocument('${doc.id}', 'approved')">Approve</button>
                                                <button class="action-btn action-btn-delete" onclick="verifyDocument('${doc.id}', 'rejected')">Reject</button>
                                            ` : ''}
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading documents:', error);
        showToast('Error loading documents', 'error');
    } finally {
        hideLoading();
    }
}

async function verifyDocument(docId, status) {
    try {
        showLoading();
        await fetch(`tables/documents/${docId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, admin_notes: `Document ${status} by admin` })
        });

        showToast(`Document ${status}`, 'success');
        loadVerifyDocuments();
    } catch (error) {
        console.error('Error verifying document:', error);
        showToast('Error verifying document', 'error');
    } finally {
        hideLoading();
    }
}

async function loadAllBookings() {
    try {
        showLoading();
        const [bookingsRes, usersRes, propsRes] = await Promise.all([
            fetch('tables/bookings?limit=1000'),
            fetch('tables/users?limit=1000'),
            fetch('tables/properties?limit=1000')
        ]);

        const bookings = (await bookingsRes.json()).data;
        const users = (await usersRes.json()).data;
        const properties = (await propsRes.json()).data;

        const content = `
            <div class="dashboard-header">
                <h1>All Bookings</h1>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Buyer</th>
                            <th>Seller</th>
                            <th>Property</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${await generateBookingsRows(bookings, users, properties)}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading bookings:', error);
        showToast('Error loading bookings', 'error');
    } finally {
        hideLoading();
    }
}

async function generateBookingsRows(bookings, users, properties) {
    return bookings.map(booking => {
        const buyer = users.find(u => u.id === booking.buyer_id);
        const seller = users.find(u => u.id === booking.seller_id);
        const property = properties.find(p => p.id === booking.property_id);
        
        return `
            <tr>
                <td>${booking.id}</td>
                <td>${buyer ? buyer.name : 'Unknown'}</td>
                <td>${seller ? seller.name : 'Unknown'}</td>
                <td>${property ? property.title : 'Unknown'}</td>
                <td>${formatDate(booking.appointment_date)}</td>
                <td><span class="status-badge status-${booking.status}">${booking.status}</span></td>
            </tr>
        `;
    }).join('');
}

async function loadAllPayments() {
    try {
        showLoading();
        const [paymentsRes, usersRes, bookingsRes] = await Promise.all([
            fetch('tables/payments?limit=1000'),
            fetch('tables/users?limit=1000'),
            fetch('tables/bookings?limit=1000')
        ]);

        const payments = (await paymentsRes.json()).data;
        const users = (await usersRes.json()).data;
        const bookings = (await bookingsRes.json()).data;

        const content = `
            <div class="dashboard-header">
                <h1>All Payments</h1>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Buyer</th>
                            <th>Seller</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${payments.map(payment => {
                            const buyer = users.find(u => u.id === payment.buyer_id);
                            const seller = users.find(u => u.id === payment.seller_id);
                            return `
                                <tr>
                                    <td>${payment.id}</td>
                                    <td>${buyer ? buyer.name : 'Unknown'}</td>
                                    <td>${seller ? seller.name : 'Unknown'}</td>
                                    <td>₹${payment.amount.toLocaleString('en-IN')}</td>
                                    <td>${payment.payment_method}</td>
                                    <td><span class="status-badge status-${payment.status}">${payment.status}</span></td>
                                    <td>${formatDate(payment.payment_date)}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading payments:', error);
        showToast('Error loading payments', 'error');
    } finally {
        hideLoading();
    }
}

async function loadAllFeedback() {
    try {
        showLoading();
        const [feedbackRes, usersRes, propsRes] = await Promise.all([
            fetch('tables/feedback?limit=1000'),
            fetch('tables/users?limit=1000'),
            fetch('tables/properties?limit=1000')
        ]);

        const feedback = (await feedbackRes.json()).data;
        const users = (await usersRes.json()).data;
        const properties = (await propsRes.json()).data;

        const content = `
            <div class="dashboard-header">
                <h1>All Feedback</h1>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Buyer</th>
                            <th>Property</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${feedback.map(fb => {
                            const buyer = users.find(u => u.id === fb.buyer_id);
                            const property = properties.find(p => p.id === fb.property_id);
                            return `
                                <tr>
                                    <td>${buyer ? buyer.name : 'Unknown'}</td>
                                    <td>${property ? property.title : 'Unknown'}</td>
                                    <td>${'★'.repeat(fb.rating)}${'☆'.repeat(5 - fb.rating)}</td>
                                    <td>${fb.comment}</td>
                                    <td><span class="status-badge status-${fb.status === 'visible' ? 'active' : 'inactive'}">${fb.status}</span></td>
                                    <td>
                                        <button class="action-btn action-btn-edit" onclick="toggleFeedbackStatus('${fb.id}', '${fb.status}')">
                                            ${fb.status === 'visible' ? 'Hide' : 'Show'}
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading feedback:', error);
        showToast('Error loading feedback', 'error');
    } finally {
        hideLoading();
    }
}

async function toggleFeedbackStatus(feedbackId, currentStatus) {
    const newStatus = currentStatus === 'visible' ? 'hidden' : 'visible';
    
    try {
        showLoading();
        await fetch(`tables/feedback/${feedbackId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        showToast('Feedback status updated', 'success');
        loadAllFeedback();
    } catch (error) {
        console.error('Error updating feedback:', error);
        showToast('Error updating feedback', 'error');
    } finally {
        hideLoading();
    }
}

async function loadGenerateInvoices() {
    try {
        showLoading();
        const [bookingsRes, usersRes, propsRes, invoicesRes] = await Promise.all([
            fetch('tables/bookings?limit=1000'),
            fetch('tables/users?limit=1000'),
            fetch('tables/properties?limit=1000'),
            fetch('tables/invoices?limit=1000')
        ]);

        const bookings = (await bookingsRes.json()).data;
        const users = (await usersRes.json()).data;
        const properties = (await propsRes.json()).data;
        const invoices = (await invoicesRes.json()).data;

        // Find bookings that don't have invoices yet
        const bookingsWithoutInvoice = bookings.filter(booking => 
            !invoices.find(inv => inv.booking_id === booking.id) &&
            booking.status === 'accepted'
        );

        const content = `
            <div class="dashboard-header">
                <h1>Generate Invoice</h1>
            </div>

            <div class="data-table">
                <div class="table-header">
                    <h3>Bookings Without Invoice</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Buyer</th>
                            <th>Property</th>
                            <th>Property Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${bookingsWithoutInvoice.map(booking => {
                            const buyer = users.find(u => u.id === booking.buyer_id);
                            const property = properties.find(p => p.id === booking.property_id);
                            return `
                                <tr>
                                    <td>${booking.id}</td>
                                    <td>${buyer ? buyer.name : 'Unknown'}</td>
                                    <td>${property ? property.title : 'Unknown'}</td>
                                    <td>₹${property ? property.amount.toLocaleString('en-IN') : 0}</td>
                                    <td>
                                        <button class="action-btn action-btn-edit" onclick="openGenerateInvoiceModal('${booking.id}', '${booking.buyer_id}', ${property ? property.amount : 0})">
                                            Generate Invoice
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>

            <div class="data-table" style="margin-top: 2rem;">
                <div class="table-header">
                    <h3>All Invoices</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Buyer</th>
                            <th>Amount</th>
                            <th>Tax</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoices.map(invoice => {
                            const buyer = users.find(u => u.id === invoice.buyer_id);
                            return `
                                <tr>
                                    <td>${invoice.invoice_number}</td>
                                    <td>${buyer ? buyer.name : 'Unknown'}</td>
                                    <td>₹${invoice.amount.toLocaleString('en-IN')}</td>
                                    <td>₹${invoice.tax.toLocaleString('en-IN')}</td>
                                    <td>₹${invoice.total_amount.toLocaleString('en-IN')}</td>
                                    <td><span class="status-badge status-${invoice.status}">${invoice.status}</span></td>
                                    <td>${formatDate(invoice.due_date)}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading invoices:', error);
        showToast('Error loading invoices', 'error');
    } finally {
        hideLoading();
    }
}

function openGenerateInvoiceModal(bookingId, buyerId, propertyAmount) {
    const tax = propertyAmount * 0.1; // 10% tax
    const total = propertyAmount + tax;

    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Generate Invoice</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="generateInvoiceForm" onsubmit="handleGenerateInvoice(event, '${bookingId}', '${buyerId}')">
                    <div class="form-group">
                        <label>Base Amount ($)</label>
                        <input type="number" id="invoiceAmount" value="${propertyAmount}" required readonly>
                    </div>
                    <div class="form-group">
                        <label>Tax (10%)</label>
                        <input type="number" id="invoiceTax" value="${tax}" required readonly>
                    </div>
                    <div class="form-group">
                        <label>Total Amount ($)</label>
                        <input type="number" id="invoiceTotal" value="${total}" required readonly>
                    </div>
                    <div class="form-group">
                        <label>Due Date</label>
                        <input type="date" id="invoiceDueDate" required>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Generate Invoice</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.getElementById('modalContainer').innerHTML = modalContent;
    document.getElementById('modalContainer').classList.add('show');

    // Set default due date to 7 days from now
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    document.getElementById('invoiceDueDate').value = dueDate.toISOString().split('T')[0];
}

async function handleGenerateInvoice(event, bookingId, buyerId) {
    event.preventDefault();

    const invoice = {
        id: generateId('inv'),
        booking_id: bookingId,
        buyer_id: buyerId,
        invoice_number: `INV-${Date.now()}`,
        amount: parseFloat(document.getElementById('invoiceAmount').value),
        tax: parseFloat(document.getElementById('invoiceTax').value),
        total_amount: parseFloat(document.getElementById('invoiceTotal').value),
        invoice_date: new Date().toISOString(),
        due_date: new Date(document.getElementById('invoiceDueDate').value).toISOString(),
        status: 'pending'
    };

    try {
        showLoading();
        const response = await fetch('tables/invoices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invoice)
        });

        if (response.ok) {
            showToast('Invoice generated successfully!', 'success');
            closeModal();
            loadGenerateInvoices();
        }
    } catch (error) {
        console.error('Error generating invoice:', error);
        showToast('Error generating invoice', 'error');
    } finally {
        hideLoading();
    }
}

// BUYER DASHBOARD FUNCTIONS
async function loadBuyerDashboard() {
    try {
        showLoading();
        
        const [bookingsRes, paymentsRes, invoicesRes] = await Promise.all([
            fetch('tables/bookings?limit=1000'),
            fetch('tables/payments?limit=1000'),
            fetch('tables/invoices?limit=1000')
        ]);

        const allBookings = (await bookingsRes.json()).data;
        const allPayments = (await paymentsRes.json()).data;
        const allInvoices = (await invoicesRes.json()).data;

        const myBookings = allBookings.filter(b => b.buyer_id === state.currentUser.id);
        const myPayments = allPayments.filter(p => p.buyer_id === state.currentUser.id);
        const myInvoices = allInvoices.filter(i => i.buyer_id === state.currentUser.id);
        const pendingBookings = myBookings.filter(b => b.status === 'pending').length;

        const content = `
            <div class="dashboard-header">
                <h1>Buyer Dashboard</h1>
                <p>Welcome back, ${state.currentUser.name}</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>My Appointments</h3>
                        <div class="stat-card-icon" style="background: #dbeafe; color: #1e40af;">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                    </div>
                    <div class="stat-value">${myBookings.length}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Pending Appointments</h3>
                        <div class="stat-card-icon" style="background: #fef3c7; color: #92400e;">
                            <i class="fas fa-clock"></i>
                        </div>
                    </div>
                    <div class="stat-value">${pendingBookings}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Total Payments</h3>
                        <div class="stat-card-icon" style="background: #d1fae5; color: #065f46;">
                            <i class="fas fa-rupee-sign"></i>
                        </div>
                    </div>
                    <div class="stat-value">${myPayments.length}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Invoices</h3>
                        <div class="stat-card-icon" style="background: #fce7f3; color: #9f1239;">
                            <i class="fas fa-file-invoice"></i>
                        </div>
                    </div>
                    <div class="stat-value">${myInvoices.length}</div>
                </div>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button class="btn-primary" onclick="showPage('properties')">
                    <i class="fas fa-search"></i> Search Properties
                </button>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading buyer dashboard:', error);
        showToast('Error loading dashboard', 'error');
    } finally {
        hideLoading();
    }
}

async function loadMyBookings() {
    try {
        showLoading();
        const [bookingsRes, propsRes, usersRes, paymentsRes] = await Promise.all([
            fetch('tables/bookings?limit=1000'),
            fetch('tables/properties?limit=1000'),
            fetch('tables/users?limit=1000'),
            fetch('tables/payments?limit=1000')
        ]);

        const allBookings = (await bookingsRes.json()).data;
        const properties = (await propsRes.json()).data;
        const users = (await usersRes.json()).data;
        const allPayments = (await paymentsRes.json()).data;

        const myBookings = allBookings.filter(b => b.buyer_id === state.currentUser.id);

        const content = `
            <div class="dashboard-header">
                <h1>My Appointments</h1>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Seller</th>
                            <th>Appointment Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myBookings.map(booking => {
                            const property = properties.find(p => p.id === booking.property_id);
                            const seller = users.find(u => u.id === booking.seller_id);
                            // Check if payment exists for this booking
                            const hasPayment = allPayments.some(p => p.booking_id === booking.id && p.status === 'completed');
                            
                            return `
                                <tr>
                                    <td>${property ? property.title : 'Unknown'}</td>
                                    <td>${seller ? seller.name : 'Unknown'}</td>
                                    <td>${formatDate(booking.appointment_date)}</td>
                                    <td><span class="status-badge status-${booking.status}">${booking.status}</span></td>
                                    <td>
                                        ${booking.status === 'accepted' && !hasPayment ? `
                                            <button class="action-btn action-btn-edit" onclick="openMakePaymentModal('${booking.id}', '${booking.property_id}', '${booking.seller_id}')">
                                                Make Payment
                                            </button>
                                        ` : ''}
                                        ${(booking.status === 'completed' || hasPayment) ? `
                                            <button class="action-btn action-btn-edit" onclick="openFeedbackModal('${booking.property_id}')">
                                                Give Feedback
                                            </button>
                                        ` : ''}
                                        ${booking.status === 'pending' ? `
                                            <span style="color: var(--warning-color); font-size: 0.875rem;">Waiting for seller approval</span>
                                        ` : ''}
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading bookings:', error);
        showToast('Error loading bookings', 'error');
    } finally {
        hideLoading();
    }
}

function openMakePaymentModal(bookingId, propertyId, sellerId) {
    // Get property details
    fetch(`tables/properties/${propertyId}`)
        .then(response => response.json())
        .then(property => {
            const depositAmount = property.amount * 0.1; // 10% deposit in INR

            const modalContent = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Make Payment</h2>
                        <button class="modal-close" onclick="closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div style="margin-bottom: 1.5rem; padding: 1.5rem; background: var(--light-color); border-radius: 8px;">
                            <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Payment Details</h3>
                            <div style="display: grid; gap: 0.5rem;">
                                <div><strong>Property:</strong> ${property.title}</div>
                                <div><strong>Location:</strong> ${property.city}, ${property.state}</div>
                                <div><strong>Total Price:</strong> ₹${property.amount.toLocaleString('en-IN')}</div>
                                <div style="padding-top: 0.5rem; border-top: 1px solid var(--border-color); margin-top: 0.5rem;">
                                    <strong>Deposit Amount (10%):</strong> ₹${depositAmount.toLocaleString('en-IN')}
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; background: #fff3e0; border-radius: 8px;">
                                <i class="fas fa-info-circle" style="color: var(--primary-color);"></i>
                                <span style="font-size: 0.875rem;">Payment will be processed securely through Razorpay</span>
                            </div>
                        </div>

                        <div style="text-align: center;">
                            <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" style="height: 30px; margin-bottom: 1rem; opacity: 0.7;">
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                            <button type="button" class="btn-success" onclick="proceedToRazorpay('${bookingId}', '${propertyId}', '${sellerId}', ${depositAmount}, '${property.title.replace(/'/g, "\\'")}')">
                                <i class="fas fa-lock"></i> Pay ₹${depositAmount.toLocaleString('en-IN')} via Razorpay
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('modalContainer').innerHTML = modalContent;
            document.getElementById('modalContainer').classList.add('show');
        })
        .catch(error => {
            console.error('Error loading property:', error);
            showToast('Error loading payment details', 'error');
        });
}

// Proceed to Razorpay Payment
function proceedToRazorpay(bookingId, propertyId, sellerId, amountINR, propertyTitle) {
    if (!state.currentUser) {
        showToast('Please login to make payment', 'error');
        return;
    }

    showLoading();
    
    // Close the modal
    closeModal();
    
    // Get buyer details
    const buyerDetails = {
        name: state.currentUser.name,
        email: state.currentUser.email,
        phone: state.currentUser.phone
    };

    // Initialize Razorpay payment
    setTimeout(() => {
        hideLoading();
        initializeRazorpayPayment(bookingId, propertyId, sellerId, amountINR, propertyTitle, buyerDetails);
    }, 500);
}

async function handleMakePayment(event, bookingId, sellerId, amount) {
    event.preventDefault();

    const payment = {
        id: generateId('pay'),
        booking_id: bookingId,
        buyer_id: state.currentUser.id,
        seller_id: sellerId,
        amount: amount,
        payment_method: document.getElementById('paymentMethod').value,
        transaction_id: `TXN-${Date.now()}`,
        status: 'completed',
        payment_date: new Date().toISOString()
    };

    try {
        showLoading();
        const response = await fetch('tables/payments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payment)
        });

        if (response.ok) {
            // Update booking status to completed
            await fetch(`tables/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'completed' })
            });

            showToast('Payment successful!', 'success');
            closeModal();
            loadMyBookings();
        }
    } catch (error) {
        console.error('Error making payment:', error);
        showToast('Payment failed', 'error');
    } finally {
        hideLoading();
    }
}

async function loadMyPayments() {
    try {
        showLoading();
        const response = await fetch('tables/payments?limit=1000');
        const result = await response.json();
        const myPayments = result.data.filter(p => p.buyer_id === state.currentUser.id);

        const content = `
            <div class="dashboard-header">
                <h1>My Payments</h1>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myPayments.map(payment => `
                            <tr>
                                <td>${payment.transaction_id}</td>
                                <td>₹${payment.amount.toLocaleString('en-IN')}</td>
                                <td>${payment.payment_method}</td>
                                <td><span class="status-badge status-${payment.status}">${payment.status}</span></td>
                                <td>${formatDate(payment.payment_date)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading payments:', error);
        showToast('Error loading payments', 'error');
    } finally {
        hideLoading();
    }
}

async function loadMyInvoices() {
    try {
        showLoading();
        const response = await fetch('tables/invoices?limit=1000');
        const result = await response.json();
        const myInvoices = result.data.filter(i => i.buyer_id === state.currentUser.id);

        const content = `
            <div class="dashboard-header">
                <h1>My Invoices</h1>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Amount</th>
                            <th>Tax</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myInvoices.map(invoice => `
                            <tr>
                                <td>${invoice.invoice_number}</td>
                                <td>₹${invoice.amount.toLocaleString('en-IN')}</td>
                                <td>₹${invoice.tax.toLocaleString('en-IN')}</td>
                                <td>₹${invoice.total_amount.toLocaleString('en-IN')}</td>
                                <td><span class="status-badge status-${invoice.status}">${invoice.status}</span></td>
                                <td>${formatDate(invoice.due_date)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading invoices:', error);
        showToast('Error loading invoices', 'error');
    } finally {
        hideLoading();
    }
}

function openFeedbackModal(propertyId) {
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Give Feedback</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="feedbackForm" onsubmit="handleSubmitFeedback(event, '${propertyId}')">
                    <div class="form-group">
                        <label>Rating</label>
                        <select id="feedbackRating" required>
                            <option value="5">5 Stars - Excellent</option>
                            <option value="4">4 Stars - Very Good</option>
                            <option value="3">3 Stars - Good</option>
                            <option value="2">2 Stars - Fair</option>
                            <option value="1">1 Star - Poor</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Comment</label>
                        <textarea id="feedbackComment" rows="4" required placeholder="Share your experience..."></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Submit Feedback</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.getElementById('modalContainer').innerHTML = modalContent;
    document.getElementById('modalContainer').classList.add('show');
}

async function handleSubmitFeedback(event, propertyId) {
    event.preventDefault();

    const feedback = {
        id: generateId('feed'),
        buyer_id: state.currentUser.id,
        property_id: propertyId,
        rating: parseInt(document.getElementById('feedbackRating').value),
        comment: document.getElementById('feedbackComment').value,
        status: 'visible'
    };

    try {
        showLoading();
        const response = await fetch('tables/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedback)
        });

        if (response.ok) {
            showToast('Feedback submitted successfully!', 'success');
            closeModal();
            loadMyBookings();
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
        showToast('Error submitting feedback', 'error');
    } finally {
        hideLoading();
    }
}

async function loadMyFeedback() {
    try {
        showLoading();
        const [feedbackRes, propsRes] = await Promise.all([
            fetch('tables/feedback?limit=1000'),
            fetch('tables/properties?limit=1000')
        ]);

        const allFeedback = (await feedbackRes.json()).data;
        const properties = (await propsRes.json()).data;

        const myFeedback = allFeedback.filter(f => f.buyer_id === state.currentUser.id);

        const content = `
            <div class="dashboard-header">
                <h1>My Feedback</h1>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myFeedback.map(fb => {
                            const property = properties.find(p => p.id === fb.property_id);
                            return `
                                <tr>
                                    <td>${property ? property.title : 'Unknown'}</td>
                                    <td>${'★'.repeat(fb.rating)}${'☆'.repeat(5 - fb.rating)}</td>
                                    <td>${fb.comment}</td>
                                    <td><span class="status-badge status-${fb.status === 'visible' ? 'active' : 'inactive'}">${fb.status}</span></td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading feedback:', error);
        showToast('Error loading feedback', 'error');
    } finally {
        hideLoading();
    }
}

// SELLER DASHBOARD FUNCTIONS
async function loadSellerDashboard() {
    try {
        showLoading();
        
        const [propsRes, bookingsRes, paymentsRes, membershipStatus] = await Promise.all([
            fetch('tables/properties?limit=1000'),
            fetch('tables/bookings?limit=1000'),
            fetch('tables/payments?limit=1000'),
            getMembershipStatus(state.currentUser.id)
        ]);

        const allProperties = (await propsRes.json()).data;
        const allBookings = (await bookingsRes.json()).data;
        const allPayments = (await paymentsRes.json()).data;

        const myProperties = allProperties.filter(p => p.seller_id === state.currentUser.id);
        const myBookings = allBookings.filter(b => b.seller_id === state.currentUser.id);
        const myPayments = allPayments.filter(p => p.seller_id === state.currentUser.id);
        const pendingBookings = myBookings.filter(b => b.status === 'pending').length;
        
        const membershipBanner = membershipStatus ? `
            <div class="membership-banner ${membershipStatus.is_expired ? 'membership-expired' : membershipStatus.remaining_slots <= 2 ? 'membership-warning' : 'membership-info'}">
                <div class="membership-banner-content">
                    <i class="fas ${membershipStatus.is_expired ? 'fa-exclamation-triangle' : 'fa-crown'}"></i>
                    <div>
                        ${membershipStatus.is_expired ? `
                            <strong>Membership Expired!</strong>
                            <p>Your membership has expired. Please upgrade to continue listing properties.</p>
                        ` : membershipStatus.remaining_slots === 0 ? `
                            <strong>Property Limit Reached!</strong>
                            <p>You've used all ${membershipStatus.property_limit} property slots. Upgrade to list more!</p>
                        ` : membershipStatus.remaining_slots <= 2 ? `
                            <strong>Limited Slots Available</strong>
                            <p>You have ${membershipStatus.remaining_slots} of ${membershipStatus.property_limit} property slots remaining.</p>
                        ` : `
                            <strong>${membershipStatus.plan_details?.name || 'Free Plan'}</strong>
                            <p>You have ${membershipStatus.remaining_slots} of ${membershipStatus.property_limit} property slots available.</p>
                        `}
                    </div>
                </div>
                <button class="btn-outline" onclick="loadMembershipPage()" style="background: white;">
                    ${membershipStatus.is_expired || membershipStatus.remaining_slots === 0 ? 'Upgrade Now' : 'Manage Membership'}
                </button>
            </div>
        ` : '';

        const content = `
            <div class="dashboard-header">
                <h1>Seller Dashboard</h1>
                <p>Welcome back, ${state.currentUser.name}</p>
            </div>
            
            ${membershipBanner}

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>My Properties</h3>
                        <div class="stat-card-icon" style="background: #dbeafe; color: #1e40af;">
                            <i class="fas fa-home"></i>
                        </div>
                    </div>
                    <div class="stat-value">${myProperties.length} ${membershipStatus ? `/ ${membershipStatus.property_limit}` : ''}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Pending Bookings</h3>
                        <div class="stat-card-icon" style="background: #fef3c7; color: #92400e;">
                            <i class="fas fa-clock"></i>
                        </div>
                    </div>
                    <div class="stat-value">${pendingBookings}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Total Bookings</h3>
                        <div class="stat-card-icon" style="background: #d1fae5; color: #065f46;">
                            <i class="fas fa-calendar"></i>
                        </div>
                    </div>
                    <div class="stat-value">${myBookings.length}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Payments Received</h3>
                        <div class="stat-card-icon" style="background: #fce7f3; color: #9f1239;">
                            <i class="fas fa-rupee-sign"></i>
                        </div>
                    </div>
                    <div class="stat-value">₹${myPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString('en-IN')}</div>
                </div>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button class="btn-primary" onclick="openAddPropertyModal()">
                    <i class="fas fa-plus"></i> Add New Property
                </button>
                <button class="btn-primary" onclick="openUploadDocumentModal()">
                    <i class="fas fa-upload"></i> Upload Document
                </button>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading seller dashboard:', error);
        showToast('Error loading dashboard', 'error');
    } finally {
        hideLoading();
    }
}

async function loadMyProperties() {
    try {
        showLoading();
        const response = await fetch('tables/properties?limit=1000');
        const result = await response.json();
        const myProperties = result.data.filter(p => p.seller_id === state.currentUser.id);

        const content = `
            <div class="dashboard-header">
                <h1>My Properties</h1>
                <button class="btn-primary" onclick="openAddPropertyModal()">
                    <i class="fas fa-plus"></i> Add Property
                </button>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Featured</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myProperties.map(property => `
                            <tr>
                                <td>${property.title}</td>
                                <td>${property.city}, ${property.state}</td>
                                <td>₹${property.amount.toLocaleString('en-IN')}</td>
                                <td><span class="status-badge status-${property.status}">${property.status}</span></td>
                                <td>${property.featured ? '⭐' : ''}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="action-btn action-btn-view" onclick="viewPropertyDetail('${property.id}')">View</button>
                                        <button class="action-btn action-btn-edit" onclick="openEditPropertyModal('${property.id}')">Edit</button>
                                        <button class="action-btn action-btn-delete" onclick="deleteProperty('${property.id}')">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading properties:', error);
        showToast('Error loading properties', 'error');
    } finally {
        hideLoading();
    }
}

async function loadMyDocuments() {
    try {
        showLoading();
        const [docsRes, propsRes] = await Promise.all([
            fetch('tables/documents?limit=1000'),
            fetch('tables/properties?limit=1000')
        ]);

        const allDocuments = (await docsRes.json()).data;
        const properties = (await propsRes.json()).data;

        const myDocuments = allDocuments.filter(d => d.seller_id === state.currentUser.id);

        const content = `
            <div class="dashboard-header">
                <h1>My Documents</h1>
                <button class="btn-primary" onclick="openUploadDocumentModal()">
                    <i class="fas fa-upload"></i> Upload Document
                </button>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th>Type</th>
                            <th>Property</th>
                            <th>Status</th>
                            <th>Admin Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myDocuments.map(doc => {
                            const property = properties.find(p => p.id === doc.property_id);
                            return `
                                <tr>
                                    <td>${doc.document_name}</td>
                                    <td>${doc.document_type}</td>
                                    <td>${property ? property.title : 'N/A'}</td>
                                    <td><span class="status-badge status-${doc.status}">${doc.status}</span></td>
                                    <td>${doc.admin_notes || '-'}</td>
                                    <td>
                                        <button class="action-btn action-btn-view" onclick="window.open('${doc.document_url}', '_blank')">View</button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading documents:', error);
        showToast('Error loading documents', 'error');
    } finally {
        hideLoading();
    }
}

async function loadPropertyBookings() {
    try {
        showLoading();
        const [bookingsRes, usersRes, propsRes] = await Promise.all([
            fetch('tables/bookings?limit=1000'),
            fetch('tables/users?limit=1000'),
            fetch('tables/properties?limit=1000')
        ]);

        const allBookings = (await bookingsRes.json()).data;
        const users = (await usersRes.json()).data;
        const properties = (await propsRes.json()).data;

        const myBookings = allBookings.filter(b => b.seller_id === state.currentUser.id);

        const content = `
            <div class="dashboard-header">
                <h1>Booking Requests</h1>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Buyer</th>
                            <th>Property</th>
                            <th>Appointment Date</th>
                            <th>Notes</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myBookings.map(booking => {
                            const buyer = users.find(u => u.id === booking.buyer_id);
                            const property = properties.find(p => p.id === booking.property_id);
                            return `
                                <tr>
                                    <td>${buyer ? buyer.name : 'Unknown'}</td>
                                    <td>${property ? property.title : 'Unknown'}</td>
                                    <td>${formatDate(booking.appointment_date)}</td>
                                    <td>${booking.notes || '-'}</td>
                                    <td><span class="status-badge status-${booking.status}">${booking.status}</span></td>
                                    <td>
                                        ${booking.status === 'pending' ? `
                                            <div class="action-buttons">
                                                <button class="action-btn action-btn-edit" onclick="updateBookingStatus('${booking.id}', 'accepted')">Accept</button>
                                                <button class="action-btn action-btn-delete" onclick="updateBookingStatus('${booking.id}', 'rejected')">Reject</button>
                                            </div>
                                        ` : '-'}
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading bookings:', error);
        showToast('Error loading bookings', 'error');
    } finally {
        hideLoading();
    }
}

async function updateBookingStatus(bookingId, status) {
    try {
        showLoading();
        console.log('Updating booking:', bookingId, 'to status:', status);
        
        // ✅ NEW: Call Cloudflare Pages Function instead of /tables/
        const response = await fetch(`/bookings/${bookingId}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                status,
                seller_notes: status === 'accepted' 
                    ? 'Booking accepted by seller' 
                    : 'Booking rejected by seller'
            })
        });

        // Check response
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server response:', response.status, errorData);
            throw new Error(errorData.error || `Failed to update booking: ${response.status}`);
        }

        const result = await response.json();
        console.log('Booking updated successfully:', result);
        
        showToast(`Booking ${status}!`, 'success');
        
        // Reload bookings to show updated status
        await loadPropertyBookings();
        
    } catch (error) {
        console.error('Error updating booking:', error);
        showToast(`Error updating booking: ${error.message}`, 'error');
    } finally {
        hideLoading();
    }
}

async function loadSellerPayments() {
    try {
        showLoading();
        const response = await fetch('tables/payments?limit=1000');
        const result = await response.json();
        const myPayments = result.data.filter(p => p.seller_id === state.currentUser.id);

        const content = `
            <div class="dashboard-header">
                <h1>Payments Received</h1>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myPayments.map(payment => `
                            <tr>
                                <td>${payment.transaction_id}</td>
                                <td>₹${payment.amount.toLocaleString('en-IN')}</td>
                                <td>${payment.payment_method}</td>
                                <td><span class="status-badge status-${payment.status}">${payment.status}</span></td>
                                <td>${formatDate(payment.payment_date)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading payments:', error);
        showToast('Error loading payments', 'error');
    } finally {
        hideLoading();
    }
}

async function loadPropertyFeedback() {
    try {
        showLoading();
        const [feedbackRes, propsRes, usersRes] = await Promise.all([
            fetch('tables/feedback?limit=1000'),
            fetch('tables/properties?limit=1000'),
            fetch('tables/users?limit=1000')
        ]);

        const allFeedback = (await feedbackRes.json()).data;
        const allProperties = (await propsRes.json()).data;
        const users = (await usersRes.json()).data;

        // Get feedback for seller's properties
        const myProperties = allProperties.filter(p => p.seller_id === state.currentUser.id);
        const myPropertyIds = myProperties.map(p => p.id);
        const myFeedback = allFeedback.filter(f => myPropertyIds.includes(f.property_id));

        const content = `
            <div class="dashboard-header">
                <h1>Property Feedback</h1>
            </div>

            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Buyer</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myFeedback.map(fb => {
                            const property = allProperties.find(p => p.id === fb.property_id);
                            const buyer = users.find(u => u.id === fb.buyer_id);
                            return `
                                <tr>
                                    <td>${property ? property.title : 'Unknown'}</td>
                                    <td>${buyer ? buyer.name : 'Unknown'}</td>
                                    <td>${'★'.repeat(fb.rating)}${'☆'.repeat(5 - fb.rating)}</td>
                                    <td>${fb.comment}</td>
                                    <td><span class="status-badge status-${fb.status === 'visible' ? 'active' : 'inactive'}">${fb.status}</span></td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('dashboardContent').innerHTML = content;
    } catch (error) {
        console.error('Error loading feedback:', error);
        showToast('Error loading feedback', 'error');
    } finally {
        hideLoading();
    }
}
