/**
 * Database Import Script for Narmada Sales
 * Run this script to populate the database with sample data
 * For Cloudflare deployment or any REST API backend
 */

// Base URL for API (change this to your deployment URL)
const API_BASE_URL = 'https://your-domain.com'; // Change this!

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
    return await response.json();
}

// 1. CREATE ADMIN AND USERS
const users = [
    {
        id: 'user-admin-001',
        email: 'admin@narmadasales.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        phone: '+91 94283 61305',
        address: 'Narmada Sales HQ, Mumbai, Maharashtra',
        status: 'active',
        profile_image: 'https://ui-avatars.com/api/?name=Admin+User&background=d4a574&color=fff'
    },
    {
        id: 'user-buyer-001',
        email: 'buyer1@example.com',
        password: 'buyer123',
        role: 'buyer',
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        address: '123 MG Road, Bangalore, Karnataka',
        status: 'active',
        profile_image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=28a745&color=fff'
    },
    {
        id: 'user-buyer-002',
        email: 'buyer2@example.com',
        password: 'buyer123',
        role: 'buyer',
        name: 'Priya Sharma',
        phone: '+91 99887 76655',
        address: '456 Park Street, Kolkata, West Bengal',
        status: 'active',
        profile_image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=28a745&color=fff'
    },
    {
        id: 'user-seller-001',
        email: 'seller1@example.com',
        password: 'seller123',
        role: 'seller',
        name: 'Amit Patel',
        phone: '+91 97654 32109',
        address: '789 Ring Road, Ahmedabad, Gujarat',
        status: 'active',
        profile_image: 'https://ui-avatars.com/api/?name=Amit+Patel&background=007bff&color=fff'
    },
    {
        id: 'user-seller-002',
        email: 'seller2@example.com',
        password: 'seller123',
        role: 'seller',
        name: 'Sunita Reddy',
        phone: '+91 96543 21098',
        address: '321 Banjara Hills, Hyderabad, Telangana',
        status: 'active',
        profile_image: 'https://ui-avatars.com/api/?name=Sunita+Reddy&background=007bff&color=fff'
    }
];

// 2. CREATE PROPERTY TYPES
const propertyTypes = [
    {
        id: 'type-001',
        name: 'Apartment',
        description: 'Modern apartments in prime locations'
    },
    {
        id: 'type-002',
        name: 'Villa',
        description: 'Luxury villas with premium amenities'
    },
    {
        id: 'type-003',
        name: 'Independent House',
        description: 'Spacious independent houses'
    },
    {
        id: 'type-004',
        name: 'Plot',
        description: 'Residential and commercial plots'
    },
    {
        id: 'type-005',
        name: 'Commercial Space',
        description: 'Office spaces and shops'
    }
];

// 3. CREATE INDIAN PROPERTIES (Sample Data)
const properties = [
    {
        id: 'prop-001',
        seller_id: 'user-seller-001',
        property_type_id: 'type-001',
        title: 'Luxury 3BHK Apartment in Whitefield',
        description: 'Beautiful 3BHK apartment with modern amenities in Whitefield, Bangalore. Perfect for families looking for a peaceful yet well-connected location.',
        address: 'EPIP Zone, Whitefield',
        city: 'Bangalore',
        state: 'Karnataka',
        zipcode: '560066',
        amount: 12500000, // ₹1.25 Cr
        bedrooms: 3,
        bathrooms: 2,
        area_sqft: 1650,
        amenities: ['Swimming Pool', 'Gym', 'Power Backup', 'Club House', 'Children Play Area', 'Security', '24x7 Water Supply'],
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
        ],
        status: 'available',
        featured: true
    },
    {
        id: 'prop-002',
        seller_id: 'user-seller-001',
        property_type_id: 'type-002',
        title: 'Spacious Villa in Gachibowli',
        description: 'Stunning 4BHK villa with private garden in the IT hub of Hyderabad. Modern architecture with premium fittings.',
        address: 'Gachibowli Financial District',
        city: 'Hyderabad',
        state: 'Telangana',
        zipcode: '500032',
        amount: 28500000, // ₹2.85 Cr
        bedrooms: 4,
        bathrooms: 4,
        area_sqft: 3200,
        amenities: ['Private Garden', 'Modular Kitchen', 'Wooden Flooring', 'Covered Parking', 'Servant Quarter', 'Solar Panels', 'Rainwater Harvesting'],
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
        ],
        status: 'available',
        featured: true
    },
    {
        id: 'prop-003',
        seller_id: 'user-seller-002',
        property_type_id: 'type-001',
        title: '2BHK Apartment in Andheri West',
        description: 'Compact 2BHK apartment in prime Andheri West location. Close to metro station and all amenities.',
        address: 'SV Road, Andheri West',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipcode: '400058',
        amount: 18500000, // ₹1.85 Cr
        bedrooms: 2,
        bathrooms: 2,
        area_sqft: 950,
        amenities: ['Lift', 'Reserved Parking', 'Piped Gas', 'Intercom', 'Maintenance Staff', 'Visitor Parking'],
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
        ],
        status: 'available',
        featured: false
    },
    {
        id: 'prop-004',
        seller_id: 'user-seller-002',
        property_type_id: 'type-003',
        title: 'Independent House in Koramangala',
        description: 'Spacious 3BHK independent house in prime Koramangala. Perfect for families who value privacy.',
        address: '5th Block, Koramangala',
        city: 'Bangalore',
        state: 'Karnataka',
        zipcode: '560095',
        amount: 22500000, // ₹2.25 Cr
        bedrooms: 3,
        bathrooms: 3,
        area_sqft: 2100,
        amenities: ['Terrace', 'Car Parking', 'Separate Entrance', 'Modular Kitchen', 'Water Purifier', 'Gated Community'],
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
        ],
        status: 'available',
        featured: true
    },
    {
        id: 'prop-005',
        seller_id: 'user-seller-001',
        property_type_id: 'type-004',
        title: 'Residential Plot in Sarjapur Road',
        description: 'RERA approved residential plot in fast developing Sarjapur area. Clear title with all approvals.',
        address: 'Sarjapur Road',
        city: 'Bangalore',
        state: 'Karnataka',
        zipcode: '560102',
        amount: 8500000, // ₹85 Lakhs
        bedrooms: 0,
        bathrooms: 0,
        area_sqft: 2400,
        amenities: ['RERA Approved', 'Clear Title', 'Corner Plot', 'Gated Layout', 'Underground Drainage', 'Street Lights'],
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
            'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800'
        ],
        status: 'available',
        featured: false
    },
    {
        id: 'prop-006',
        seller_id: 'user-seller-002',
        property_type_id: 'type-005',
        title: 'Commercial Office Space in BKC',
        description: 'Premium commercial office space in Bandra Kurla Complex. Ideal for corporate offices.',
        address: 'Bandra Kurla Complex',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipcode: '400051',
        amount: 45000000, // ₹4.5 Cr
        bedrooms: 0,
        bathrooms: 2,
        area_sqft: 1800,
        amenities: ['Central AC', 'Cafeteria', 'Conference Room', 'High Speed Elevators', 'Power Backup', 'Reserved Parking', 'Security'],
        images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
        ],
        status: 'available',
        featured: true
    },
    {
        id: 'prop-007',
        seller_id: 'user-seller-001',
        property_type_id: 'type-001',
        title: '3BHK Penthouse in Powai',
        description: 'Luxurious penthouse with lake view. Premium fittings and designer interiors.',
        address: 'Hiranandani Gardens',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipcode: '400076',
        amount: 32500000, // ₹3.25 Cr
        bedrooms: 3,
        bathrooms: 3,
        area_sqft: 2400,
        amenities: ['Lake View', 'Private Terrace', 'Jacuzzi', 'Smart Home', 'Italian Marble', 'Home Theatre', 'Wine Cellar'],
        images: [
            'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
            'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800'
        ],
        status: 'available',
        featured: true
    },
    {
        id: 'prop-008',
        seller_id: 'user-seller-002',
        property_type_id: 'type-002',
        title: 'Beachside Villa in ECR Chennai',
        description: 'Breathtaking beach villa on East Coast Road. Perfect weekend getaway or permanent residence.',
        address: 'East Coast Road',
        city: 'Chennai',
        state: 'Tamil Nadu',
        zipcode: '603112',
        amount: 42500000, // ₹4.25 Cr
        bedrooms: 5,
        bathrooms: 5,
        area_sqft: 4500,
        amenities: ['Beach Access', 'Swimming Pool', 'Garden', 'BBQ Area', 'Gym', 'Staff Quarters', 'Generator'],
        images: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800'
        ],
        status: 'available',
        featured: true
    },
    {
        id: 'prop-009',
        seller_id: 'user-seller-001',
        property_type_id: 'type-001',
        title: '4BHK Apartment in Cyber City',
        description: 'Premium 4BHK in DLF Cyber City area. Perfect for IT professionals.',
        address: 'DLF Phase 2',
        city: 'Gurgaon',
        state: 'Haryana',
        zipcode: '122002',
        amount: 24500000, // ₹2.45 Cr
        bedrooms: 4,
        bathrooms: 3,
        area_sqft: 2650,
        amenities: ['Golf Course View', 'Club House', 'Tennis Court', 'Swimming Pool', 'Spa', 'Security', 'Jogging Track'],
        images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800'
        ],
        status: 'available',
        featured: false
    },
    {
        id: 'prop-010',
        seller_id: 'user-seller-002',
        property_type_id: 'type-003',
        title: 'Farmhouse in Lonavala',
        description: 'Serene farmhouse with mountain views. Perfect weekend retreat from city life.',
        address: 'Khandala Road',
        city: 'Lonavala',
        state: 'Maharashtra',
        zipcode: '410401',
        amount: 15500000, // ₹1.55 Cr
        bedrooms: 3,
        bathrooms: 3,
        area_sqft: 2800,
        amenities: ['Mountain View', 'Fruit Garden', 'Open Parking', 'Well Water', 'Greenhouse', 'Peaceful Location'],
        images: [
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800',
            'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
        ],
        status: 'available',
        featured: false
    }
];

// Function to import all data
async function importAllData() {
    console.log('Starting database import...');
    
    try {
        // Import Users
        console.log('\n1. Importing Users...');
        for (const user of users) {
            try {
                await apiCall('tables/users', 'POST', user);
                console.log(`✓ Created user: ${user.email}`);
            } catch (error) {
                console.error(`✗ Failed to create user ${user.email}:`, error);
            }
        }
        
        // Import Property Types
        console.log('\n2. Importing Property Types...');
        for (const type of propertyTypes) {
            try {
                await apiCall('tables/property_types', 'POST', type);
                console.log(`✓ Created property type: ${type.name}`);
            } catch (error) {
                console.error(`✗ Failed to create property type ${type.name}:`, error);
            }
        }
        
        // Import Properties
        console.log('\n3. Importing Properties...');
        for (const property of properties) {
            try {
                await apiCall('tables/properties', 'POST', property);
                console.log(`✓ Created property: ${property.title}`);
            } catch (error) {
                console.error(`✗ Failed to create property ${property.title}:`, error);
            }
        }
        
        console.log('\n✅ Database import completed!');
        console.log(`\nSummary:`);
        console.log(`- Users: ${users.length}`);
        console.log(`- Property Types: ${propertyTypes.length}`);
        console.log(`- Properties: ${properties.length}`);
        
    } catch (error) {
        console.error('Import failed:', error);
    }
}

// Export data for manual use
const exportData = {
    users,
    propertyTypes,
    properties
};

console.log('Database Import Script Loaded');
console.log('Instructions:');
console.log('1. Update API_BASE_URL with your deployment URL');
console.log('2. Run: importAllData()');
console.log('3. Or manually copy the data objects and use them');
