// Property Management Functions (for Sellers)

async function openAddPropertyModal() {
    // Check membership limit before opening modal
    const canAdd = await checkPropertyLimitBeforeAdd();
    if (!canAdd) {
        return;
    }
    
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add New Property</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="addPropertyForm" onsubmit="handleAddProperty(event)">
                    <div class="form-group">
                        <label>Property Title</label>
                        <input type="text" id="propTitle" required>
                    </div>
                    <div class="form-group">
                        <label>Property Type</label>
                        <select id="propType" required>
                            ${state.propertyTypes.map(type => 
                                `<option value="${type.id}">${type.name}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="propDescription" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <input type="text" id="propAddress" required>
                    </div>
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" id="propCity" required>
                    </div>
                    <div class="form-group">
                        <label>State</label>
                        <input type="text" id="propState" required>
                    </div>
                    <div class="form-group">
                        <label>Zip Code</label>
                        <input type="text" id="propZipcode" required>
                    </div>
                    <div class="form-group">
                        <label>Price (₹)</label>
                        <input type="number" id="propAmount" required min="0" placeholder="Enter price in INR">
                    </div>
                    <div class="form-group">
                        <label>Bedrooms</label>
                        <input type="number" id="propBedrooms" required min="0">
                    </div>
                    <div class="form-group">
                        <label>Bathrooms</label>
                        <input type="number" id="propBathrooms" required min="0">
                    </div>
                    <div class="form-group">
                        <label>Area (sqft)</label>
                        <input type="number" id="propArea" required min="0">
                    </div>
                    <div class="form-group">
                        <label>Amenities (comma-separated)</label>
                        <input type="text" id="propAmenities" placeholder="Pool, Gym, Parking, Garden">
                    </div>
                    <div class="form-group">
                        <label>Image URLs (one per line)</label>
                        <textarea id="propImages" rows="3" placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"></textarea>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="propFeatured">
                            Featured Property
                        </label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Add Property</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    const modal = document.getElementById('modalContainer');
    modal.innerHTML = modalContent;
    modal.classList.add('show');
}

async function handleAddProperty(event) {
    event.preventDefault();

    const amenitiesText = document.getElementById('propAmenities').value;
    const amenities = amenitiesText ? amenitiesText.split(',').map(a => a.trim()).filter(a => a) : [];

    const imagesText = document.getElementById('propImages').value;
    const images = imagesText ? imagesText.split('\n').map(i => i.trim()).filter(i => i) : [];

    const property = {
        id: generateId('prop'),
        seller_id: state.currentUser.id,
        property_type_id: document.getElementById('propType').value,
        title: document.getElementById('propTitle').value,
        description: document.getElementById('propDescription').value,
        address: document.getElementById('propAddress').value,
        city: document.getElementById('propCity').value,
        state: document.getElementById('propState').value,
        zipcode: document.getElementById('propZipcode').value,
        amount: parseFloat(document.getElementById('propAmount').value),
        bedrooms: parseInt(document.getElementById('propBedrooms').value),
        bathrooms: parseInt(document.getElementById('propBathrooms').value),
        area_sqft: parseFloat(document.getElementById('propArea').value),
        amenities: amenities,
        images: images.length > 0 ? images : ['https://via.placeholder.com/400x300?text=No+Image'],
        status: 'available',
        featured: document.getElementById('propFeatured').checked
    };

    try {
        showLoading();
        const response = await fetch('/properties', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(property)
        });

        const responseData = await response.json();

        if (response.ok) {
            showToast('Property added successfully!', 'success');
            closeModal();
            loadDashboard();
        } else if (response.status === 403) {
            // Membership limit reached
            showToast(responseData.message || 'Property limit reached', 'error');
            closeModal();
            // Show membership upgrade option
            if (confirm(responseData.message + '\n\nWould you like to upgrade your membership now?')) {
                loadMembershipPage();
            }
        } else {
            throw new Error(responseData.message || 'Failed to add property');
        }
    } catch (error) {
        console.error('Add property error:', error);
        showToast('Failed to add property', 'error');
    } finally {
        hideLoading();
    }
}

function openEditPropertyModal(propertyId) {
    // Load property data
    fetch(`tables/properties/${propertyId}`)
        .then(response => response.json())
        .then(property => {
            const amenitiesStr = property.amenities ? property.amenities.join(', ') : '';
            const imagesStr = property.images ? property.images.join('\n') : '';

            const modalContent = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Edit Property</h2>
                        <button class="modal-close" onclick="closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="editPropertyForm" onsubmit="handleEditProperty(event, '${propertyId}')">
                            <div class="form-group">
                                <label>Property Title</label>
                                <input type="text" id="editPropTitle" required value="${property.title}">
                            </div>
                            <div class="form-group">
                                <label>Property Type</label>
                                <select id="editPropType" required>
                                    ${state.propertyTypes.map(type => 
                                        `<option value="${type.id}" ${type.id === property.property_type_id ? 'selected' : ''}>${type.name}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea id="editPropDescription" rows="4" required>${property.description}</textarea>
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <input type="text" id="editPropAddress" required value="${property.address}">
                            </div>
                            <div class="form-group">
                                <label>City</label>
                                <input type="text" id="editPropCity" required value="${property.city}">
                            </div>
                            <div class="form-group">
                                <label>State</label>
                                <input type="text" id="editPropState" required value="${property.state}">
                            </div>
                            <div class="form-group">
                                <label>Zip Code</label>
                                <input type="text" id="editPropZipcode" required value="${property.zipcode}">
                            </div>
                            <div class="form-group">
                                <label>Price (₹)</label>
                                <input type="number" id="editPropAmount" required min="0" value="${property.amount}" placeholder="Enter price in INR">
                            </div>
                            <div class="form-group">
                                <label>Bedrooms</label>
                                <input type="number" id="editPropBedrooms" required min="0" value="${property.bedrooms}">
                            </div>
                            <div class="form-group">
                                <label>Bathrooms</label>
                                <input type="number" id="editPropBathrooms" required min="0" value="${property.bathrooms}">
                            </div>
                            <div class="form-group">
                                <label>Area (sqft)</label>
                                <input type="number" id="editPropArea" required min="0" value="${property.area_sqft}">
                            </div>
                            <div class="form-group">
                                <label>Amenities (comma-separated)</label>
                                <input type="text" id="editPropAmenities" value="${amenitiesStr}">
                            </div>
                            <div class="form-group">
                                <label>Image URLs (one per line)</label>
                                <textarea id="editPropImages" rows="3">${imagesStr}</textarea>
                            </div>
                            <div class="form-group">
                                <label>Status</label>
                                <select id="editPropStatus" required>
                                    <option value="available" ${property.status === 'available' ? 'selected' : ''}>Available</option>
                                    <option value="sold" ${property.status === 'sold' ? 'selected' : ''}>Sold</option>
                                    <option value="rented" ${property.status === 'rented' ? 'selected' : ''}>Rented</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" id="editPropFeatured" ${property.featured ? 'checked' : ''}>
                                    Featured Property
                                </label>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                                <button type="submit" class="btn-primary">Update Property</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;

            const modal = document.getElementById('modalContainer');
            modal.innerHTML = modalContent;
            modal.classList.add('show');
        });
}

async function handleEditProperty(event, propertyId) {
    event.preventDefault();

    const amenitiesText = document.getElementById('editPropAmenities').value;
    const amenities = amenitiesText ? amenitiesText.split(',').map(a => a.trim()).filter(a => a) : [];

    const imagesText = document.getElementById('editPropImages').value;
    const images = imagesText ? imagesText.split('\n').map(i => i.trim()).filter(i => i) : [];

    const updatedProperty = {
        property_type_id: document.getElementById('editPropType').value,
        title: document.getElementById('editPropTitle').value,
        description: document.getElementById('editPropDescription').value,
        address: document.getElementById('editPropAddress').value,
        city: document.getElementById('editPropCity').value,
        state: document.getElementById('editPropState').value,
        zipcode: document.getElementById('editPropZipcode').value,
        amount: parseFloat(document.getElementById('editPropAmount').value),
        bedrooms: parseInt(document.getElementById('editPropBedrooms').value),
        bathrooms: parseInt(document.getElementById('editPropBathrooms').value),
        area_sqft: parseFloat(document.getElementById('editPropArea').value),
        amenities: amenities,
        images: images.length > 0 ? images : ['https://via.placeholder.com/400x300?text=No+Image'],
        status: document.getElementById('editPropStatus').value,
        featured: document.getElementById('editPropFeatured').checked
    };

    try {
        showLoading();
        console.log('Updating property:', propertyId, updatedProperty);
        
        // ✅ NEW: Call Cloudflare Pages Function instead of /tables/
        const response = await fetch(`/properties/${propertyId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProperty)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server response:', response.status, errorData);
            throw new Error(errorData.error || `Failed to update property: ${response.status}`);
        }

        const result = await response.json();
        console.log('Property updated successfully:', result);
        showToast('Property updated successfully!', 'success');
        closeModal();
        await loadDashboard();
    } catch (error) {
        console.error('Update property error:', error);
        showToast(`Failed to update property: ${error.message}`, 'error');
    } finally {
        hideLoading();
    }
}


async function deleteProperty(propertyId) {
    if (!confirm('Are you sure you want to delete this property?')) {
        return;
    }

    try {
        showLoading();
        const response = await fetch(`tables/properties/${propertyId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showToast('Property deleted successfully!', 'success');
            loadDashboard();
        } else {
            throw new Error('Failed to delete property');
        }
    } catch (error) {
        console.error('Delete property error:', error);
        showToast('Failed to delete property', 'error');
    } finally {
        hideLoading();
    }
}

// Document Upload Modal
function openUploadDocumentModal() {
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Upload Document</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="uploadDocForm" onsubmit="handleUploadDocument(event)">
                    <div class="form-group">
                        <label>Document Type</label>
                        <select id="docType" required>
                            <option value="Property Deed">Property Deed</option>
                            <option value="Title Certificate">Title Certificate</option>
                            <option value="Tax Document">Tax Document</option>
                            <option value="Insurance">Insurance</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Related Property (Optional)</label>
                        <select id="docProperty">
                            <option value="">None</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Document Name</label>
                        <input type="text" id="docName" required placeholder="e.g., property_deed_2024.pdf">
                    </div>
                    <div class="form-group">
                        <label>Document URL</label>
                        <input type="url" id="docUrl" required placeholder="https://example.com/document.pdf">
                        <small style="color: var(--text-secondary)">Note: In a production environment, you would upload the actual file. For this demo, provide a URL.</small>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Upload Document</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    const modal = document.getElementById('modalContainer');
    modal.innerHTML = modalContent;
    modal.classList.add('show');

    // Load seller's properties
    loadSellerPropertiesForDoc();
}

async function loadSellerPropertiesForDoc() {
    try {
        const response = await fetch('tables/properties?limit=1000');
        const result = await response.json();
        const sellerProps = result.data.filter(p => p.seller_id === state.currentUser.id);

        const select = document.getElementById('docProperty');
        sellerProps.forEach(prop => {
            const option = document.createElement('option');
            option.value = prop.id;
            option.textContent = prop.title;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading properties:', error);
    }
}

async function handleUploadDocument(event) {
    event.preventDefault();

    const document = {
        id: generateId('doc'),
        seller_id: state.currentUser.id,
        property_id: document.getElementById('docProperty').value || null,
        document_type: document.getElementById('docType').value,
        document_name: document.getElementById('docName').value,
        document_url: document.getElementById('docUrl').value,
        status: 'pending',
        admin_notes: ''
    };

    try {
        showLoading();
        const response = await fetch('tables/documents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(document)
        });

        if (response.ok) {
            showToast('Document uploaded successfully!', 'success');
            closeModal();
            loadDashboard();
        } else {
            throw new Error('Failed to upload document');
        }
    } catch (error) {
        console.error('Upload document error:', error);
        showToast('Failed to upload document', 'error');
    } finally {
        hideLoading();
    }
}
