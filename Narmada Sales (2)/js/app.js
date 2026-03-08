// Global State
const state = {
    currentUser: null,
    currentPage: 'home',
    properties: [],
    propertyTypes: [],
    selectedProperty: null
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    // Check if user is logged in
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        state.currentUser = JSON.parse(userData);
        updateNavigation();
    }

    // Load property types
    await loadPropertyTypes();

    // Load initial data
    await loadFeaturedProperties();
    await loadAllProperties();

    // Setup event listeners
    setupEventListeners();

    // Show home page
    showPage('home');
}

function setupEventListeners() {
    // User dropdown toggle
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userBtn) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        if (userDropdown) {
            userDropdown.classList.remove('show');
        }
    });

    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}
function normalizeProperty(property) {
    // Normalize images
    if (Array.isArray(property.images)) {
        // ok
    } else if (typeof property.images === 'string') {
        try {
            const parsed = JSON.parse(property.images);
            property.images = Array.isArray(parsed) ? parsed : [];
        } catch {
            property.images = [];
        }
    } else {
        property.images = [];
    }

    // Normalize amenities
    if (Array.isArray(property.amenities)) {
        // ok
    } else if (typeof property.amenities === 'string') {
        try {
            const parsed = JSON.parse(property.amenities);
            property.amenities = Array.isArray(parsed) ? parsed : [];
        } catch {
            property.amenities = [];
        }
    } else {
        property.amenities = [];
    }

    return property;
}

// Navigation
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const page = document.getElementById(pageName + 'Page');
    if (page) {
        page.classList.add('active');
        state.currentPage = pageName;

        // Load page-specific data
        switch (pageName) {
            case 'properties':
                loadAllProperties();
                break;
            case 'dashboard':
                if (state.currentUser) {
                    loadDashboard();
                } else {
                    showPage('login');
                }
                break;
            case 'profile':
                if (state.currentUser) {
                    loadProfile();
                } else {
                    showPage('login');
                }
                break;
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }
}

function updateNavigation() {
    const visitorNav = document.querySelectorAll('.visitor-nav');
    const userNav = document.querySelectorAll('.user-nav');

    if (state.currentUser) {
        visitorNav.forEach(el => el.style.display = 'none');
        userNav.forEach(el => el.style.display = 'flex');

        // Update user info in nav
        document.getElementById('navUserName').textContent = state.currentUser.name;
        document.getElementById('navUserImage').src = state.currentUser.profile_image || 
            `https://ui-avatars.com/api/?name=${encodeURIComponent(state.currentUser.name)}`;
    } else {
        visitorNav.forEach(el => el.style.display = 'flex');
        userNav.forEach(el => el.style.display = 'none');
    }
}

// Authentication
function logout() {
    localStorage.removeItem('currentUser');
    state.currentUser = null;
    updateNavigation();
    showPage('home');
    showToast('Logged out successfully', 'success');
}

function quickLogin(email, password, role) {
    document.getElementById('loginEmail').value = email;
    document.getElementById('loginPassword').value = password;
    document.getElementById('loginRole').value = role;
    document.getElementById('loginForm').dispatchEvent(new Event('submit'));
}

// Property Types
async function loadPropertyTypes() {
    try {
        const response = await fetch('tables/property_types?limit=100');
        const result = await response.json();
        state.propertyTypes = result.data;

        // Populate property type filter
        const filter = document.getElementById('propertyTypeFilter');
        if (filter) {
            state.propertyTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.id;
                option.textContent = type.name;
                filter.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading property types:', error);
    }
}

// Properties
async function loadFeaturedProperties() {
    try {
        showLoading();
        const response = await fetch('tables/properties?limit=100');
        const result = await response.json();
        
        // Filter featured properties
        const featured = result.data.
            filter(prop => prop.featured && prop.status === 'available')
            .map(normalizeProperty);

        
        displayFeaturedProperties(featured.slice(0, 3));
    } catch (error) {
        console.error('Error loading featured properties:', error);
        showToast('Error loading properties', 'error');
    } finally {
        hideLoading();
    }
}

async function loadAllProperties() {
    try {
        showLoading();
        const response = await fetch('tables/properties?limit=100');
        const result = await response.json();
        state.properties = result.data
        .filter(prop => prop.status === 'available')
        .map(normalizeProperty);

        
        displayAllProperties(state.properties);
    } catch (error) {
        console.error('Error loading properties:', error);
        showToast('Error loading properties', 'error');
    } finally {
        hideLoading();
    }
}

function displayFeaturedProperties(properties) {
    const container = document.getElementById('featuredProperties');
    if (!container) return;

    container.innerHTML = properties.map(prop => createPropertyCard(prop)).join('');
}

function displayAllProperties(properties) {
    const container = document.getElementById('allProperties');
    if (!container) return;

    if (properties.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">No properties found</p>';
        return;
    }

    container.innerHTML = properties.map(prop => createPropertyCard(prop)).join('');
}

function createPropertyCard(property) {
    const propertyType = state.propertyTypes.find(t => t.id === property.property_type_id);
    const mainImage = property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/400x300?text=No+Image';

    return `
        <div class="property-card" onclick="viewPropertyDetail('${property.id}')">
            <img src="${mainImage}" alt="${property.title}" class="property-image" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
            <div class="property-content">
                <span class="property-type">${propertyType ? propertyType.name : 'Property'}</span>
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.city}, ${property.state}
                </p>
                <div class="property-details">
                    <span class="property-detail">
                        <i class="fas fa-bed"></i> ${property.bedrooms} Beds
                    </span>
                    <span class="property-detail">
                        <i class="fas fa-bath"></i> ${property.bathrooms} Baths
                    </span>
                    <span class="property-detail">
                        <i class="fas fa-ruler"></i> ${property.area_sqft} sqft
                    </span>
                </div>
                <div class="property-price">₹${property.amount.toLocaleString('en-IN')}</div>
            </div>
        </div>
    `;
}

async function viewPropertyDetail(propertyId) {
    try {
        showLoading();
        const response = await fetch(`tables/properties/${propertyId}`);
        const rawProperty = await response.json();
        state.selectedProperty = normalizeProperty(rawProperty);

        
        // Load feedback for this property
        const feedbackResponse = await fetch(`tables/feedback?limit=100`);
        const feedbackResult = await feedbackResponse.json();
        const propertyFeedback = feedbackResult.data.filter(
            f => f.property_id === propertyId && f.status === 'visible'
        );

        displayPropertyDetail(state.selectedProperty, propertyFeedback);
        showPage('propertyDetail');
    } catch (error) {
        console.error('Error loading property details:', error);
        showToast('Error loading property details', 'error');
    } finally {
        hideLoading();
    }
}

function displayPropertyDetail(property, feedback) {
    const propertyType = state.propertyTypes.find(t => t.id === property.property_type_id);
    const mainImage = property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/800x500?text=No+Image';

    let galleryHtml = '';
    if (property.images && property.images.length > 0) {
        galleryHtml = `
            <div class="property-gallery">
                <img src="${mainImage}" alt="${property.title}" class="gallery-main" id="galleryMain" onerror="this.src='https://via.placeholder.com/800x500?text=No+Image'">
                <div class="gallery-thumbnails">
                    ${property.images.map((img, index) => `
                        <img src="${img}" alt="Gallery ${index + 1}" 
                             class="gallery-thumbnail ${index === 0 ? 'active' : ''}" 
                             onclick="changeGalleryImage('${img}', event)"
                             onerror="this.src='https://via.placeholder.com/100x80?text=No+Image'">
                    `).join('')}
                </div>
            </div>
        `;
    }

    let amenitiesHtml = '';
    if (property.amenities && property.amenities.length > 0) {
        amenitiesHtml = `
            <div class="amenities-grid">
                ${property.amenities.map(amenity => `
                    <div class="amenity-item">
                        <i class="fas fa-check-circle" style="color: var(--secondary-color)"></i>
                        <span>${amenity}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    let feedbackHtml = '';
    if (feedback && feedback.length > 0) {
        feedbackHtml = `
            <div class="feedback-section">
                <h3>Customer Reviews</h3>
                ${feedback.map(fb => `
                    <div class="feedback-item">
                        <div class="feedback-header">
                            <strong>Buyer</strong>
                            <div class="rating">
                                ${'★'.repeat(fb.rating)}${'☆'.repeat(5 - fb.rating)}
                            </div>
                        </div>
                        <p>${fb.comment}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    const bookButton = state.currentUser && state.currentUser.role === 'buyer' 
        ? `<button class="btn-primary" onclick="openBookingModal('${property.id}')">
             <i class="fas fa-calendar-check"></i> Book Appointment
           </button>`
        : state.currentUser 
        ? '' 
        : `<button class="btn-primary" onclick="showPage('login')">
             Login to Book Appointment
           </button>`;

    const content = `
        <div class="property-detail">
            ${galleryHtml}
            <div class="property-detail-content">
                <div class="property-detail-header">
                    <div>
                        <span class="property-type">${propertyType ? propertyType.name : 'Property'}</span>
                        <h1>${property.title}</h1>
                        <p class="property-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${property.address}, ${property.city}, ${property.state} ${property.zipcode}
                        </p>
                    </div>
                    <div class="property-price">₹${property.amount.toLocaleString('en-IN')}</div>
                </div>
                
                <div class="property-details" style="font-size: 1.1rem; margin-bottom: 2rem;">
                    <span class="property-detail">
                        <i class="fas fa-bed"></i> ${property.bedrooms} Bedrooms
                    </span>
                    <span class="property-detail">
                        <i class="fas fa-bath"></i> ${property.bathrooms} Bathrooms
                    </span>
                    <span class="property-detail">
                        <i class="fas fa-ruler"></i> ${property.area_sqft} sqft
                    </span>
                </div>

                <h3>Description</h3>
                <p style="margin-bottom: 2rem; line-height: 1.8;">${property.description}</p>

                ${property.amenities && property.amenities.length > 0 ? '<h3>Amenities</h3>' : ''}
                ${amenitiesHtml}

                <div style="margin-top: 2rem;">
                    ${bookButton}
                </div>

                ${feedbackHtml}
            </div>
        </div>
    `;

    document.getElementById('propertyDetailContent').innerHTML = content;
}

function changeGalleryImage(imageUrl, event) {
    document.getElementById('galleryMain').src = imageUrl;
    document.querySelectorAll('.gallery-thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Search and Filters
function searchFromHero() {
    const searchTerm = document.getElementById('heroSearch').value;
    document.getElementById('searchInput').value = searchTerm;
    showPage('properties');
    applyFilters();
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const propertyType = document.getElementById('propertyTypeFilter').value;
    const priceRange = document.getElementById('priceRangeFilter').value;
    const bedrooms = document.getElementById('bedroomsFilter').value;

    let filtered = state.properties;

    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(prop =>
            prop.title.toLowerCase().includes(searchTerm) ||
            prop.city.toLowerCase().includes(searchTerm) ||
            prop.state.toLowerCase().includes(searchTerm) ||
            prop.address.toLowerCase().includes(searchTerm)
        );
    }

    // Apply property type filter
    if (propertyType) {
        filtered = filtered.filter(prop => prop.property_type_id === propertyType);
    }

    // Apply price range filter
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        filtered = filtered.filter(prop => prop.amount >= min && prop.amount <= max);
    }

    // Apply bedrooms filter
    if (bedrooms) {
        filtered = filtered.filter(prop => prop.bedrooms >= parseInt(bedrooms));
    }

    displayAllProperties(filtered);
}

// Profile Management
async function loadProfile() {
    if (!state.currentUser) return;

    try {
        const response = await fetch(`tables/users/${state.currentUser.id}`);
        const user = await response.json();
        
        document.getElementById('profileImage').src = user.profile_image || 
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`;
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileRole').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
        
        document.getElementById('profileNameInput').value = user.name;
        document.getElementById('profileEmailInput').value = user.email;
        document.getElementById('profilePhoneInput').value = user.phone;
        document.getElementById('profileAddressInput').value = user.address;
    } catch (error) {
        console.error('Error loading profile:', error);
        showToast('Error loading profile', 'error');
    }
}

async function handleProfileUpdate(event) {
    event.preventDefault();
    
    if (!state.currentUser) return;

    const updatedData = {
        name: document.getElementById('profileNameInput').value,
        phone: document.getElementById('profilePhoneInput').value,
        address: document.getElementById('profileAddressInput').value
    };

    try {
        showLoading();
        const response = await fetch(`tables/users/${state.currentUser.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            const updatedUser = await response.json();
            state.currentUser = updatedUser;
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            updateNavigation();
            showToast('Profile updated successfully', 'success');
            loadProfile();
        } else {
            throw new Error('Failed to update profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        showToast('Error updating profile', 'error');
    } finally {
        hideLoading();
    }
}

// Contact Form
function handleContact(event) {
    event.preventDefault();
    showToast('Message sent successfully! We will get back to you soon.', 'success');
    event.target.reset();
}

// Utility Functions
function showLoading() {
    document.getElementById('loadingOverlay').classList.add('show');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('show');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
