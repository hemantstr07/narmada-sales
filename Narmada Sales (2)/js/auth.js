// Authentication Functions

async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    try {
        showLoading();

        // Fetch all users
        const response = await fetch('tables/users?limit=1000');
        const result = await response.json();

        // Find user with matching credentials
        const user = result.data.find(u => 
            u.email === email && 
            u.password === password && 
            u.role === role &&
            u.status === 'active'
        );

        if (user) {
            // Store user in localStorage and state
            state.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Update navigation
            updateNavigation();
            
            // Redirect to dashboard
            showPage('dashboard');
            showToast(`Welcome back, ${user.name}!`, 'success');
        } else {
            showToast('Invalid email, password, or role', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showToast('Login failed. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

async function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const address = document.getElementById('registerAddress').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value;

    try {
        showLoading();

        // Check if email already exists
        const response = await fetch('tables/users?limit=1000');
        const result = await response.json();
        
        const existingUser = result.data.find(u => u.email === email);
        if (existingUser) {
            showToast('Email already registered', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: generateId('user'),
            email,
            password,
            role,
            name,
            phone,
            address,
            status: 'active',
            profile_image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
        };

        const createResponse = await fetch('tables/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        if (createResponse.ok) {
            const createdUser = await createResponse.json();
            
            // Auto-login after registration
            state.currentUser = createdUser;
            localStorage.setItem('currentUser', JSON.stringify(createdUser));
            updateNavigation();
            
            showToast('Registration successful! Welcome to PropBook.', 'success');
            showPage('dashboard');
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showToast('Registration failed. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Booking Modal
function openBookingModal(propertyId) {
    if (!state.currentUser || state.currentUser.role !== 'buyer') {
        showToast('Only buyers can book appointments', 'error');
        return;
    }

    const property = state.selectedProperty;
    
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Book Appointment</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom: 1rem;">
                    <strong>Property:</strong> ${property.title}<br>
                    <strong>Location:</strong> ${property.city}, ${property.state}<br>
                    <strong>Price:</strong> ₹${property.amount.toLocaleString('en-IN')}
                </div>
                <form id="bookingForm" onsubmit="handleBooking(event, '${propertyId}', '${property.seller_id}')">
                    <div class="form-group">
                        <label>Appointment Date & Time</label>
                        <input type="datetime-local" id="appointmentDate" required 
                               min="${new Date().toISOString().slice(0, 16)}">
                    </div>
                    <div class="form-group">
                        <label>Notes (Optional)</label>
                        <textarea id="bookingNotes" rows="4" 
                                  placeholder="Any special requests or questions..."></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Confirm Booking</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    const modal = document.getElementById('modalContainer');
    modal.innerHTML = modalContent;
    modal.classList.add('show');
}

async function handleBooking(event, propertyId, sellerId) {
    event.preventDefault();

    const appointmentDate = document.getElementById('appointmentDate').value;
    const notes = document.getElementById('bookingNotes').value;

    try {
        showLoading();

        const booking = {
            id: generateId('book'),
            buyer_id: state.currentUser.id,
            property_id: propertyId,
            seller_id: sellerId,
            appointment_date: new Date(appointmentDate).toISOString(),
            status: 'pending',
            notes: notes,
            seller_notes: ''
        };

        const response = await fetch('/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server response:', response.status, errorData);
            throw new Error(errorData.error || 'Booking failed');
        }

        const result = await response.json();
        console.log('Booking created successfully:', result);
        showToast('Appointment booked successfully!', 'success');
        closeModal();
        
        // Redirect to dashboard to see the booking
        setTimeout(() => {
            showPage('dashboard');
        }, 1000);
    } catch (error) {
        console.error('Booking error:', error);
        showToast('Failed to book appointment', 'error');
    } finally {
        hideLoading();
    }
}

function closeModal() {
    const modal = document.getElementById('modalContainer');
    modal.classList.remove('show');
    modal.innerHTML = '';
}

// Click outside modal to close
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modalContainer');
    if (e.target === modal) {
        closeModal();
    }
});
