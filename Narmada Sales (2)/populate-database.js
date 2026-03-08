// Narmada Sales - Database Population Script
// Run this in browser console after logging in as admin

async function populateNarmadaSalesDatabase() {
    console.log('Starting Narmada Sales Database Population...');
    
    // Clear existing data (optional)
    const clearData = confirm('Do you want to clear existing data first?');
    
    if (clearData) {
        console.log('Clearing existing data...');
        // Note: You'll need to manually delete from tables if needed
    }
    
    // 1. Add Users
    console.log('Adding users...');
    
    const users = [
        {
            id: 'admin-ns-001',
            email: 'admin@narmadasales.com',
            password: 'admin123',
            role: 'admin',
            name: 'Narmada Sales Admin',
            phone: '+91-94283-61305',
            address: 'Narmada Sales Office, India',
            status: 'active',
            profile_image: 'https://ui-avatars.com/api/?name=Admin&background=ff6b35&color=fff'
        },
        {
            id: 'buyer-ns-001',
            email: 'rajesh.kumar@email.com',
            password: 'buyer123',
            role: 'buyer',
            name: 'Rajesh Kumar',
            phone: '+91-98765-43210',
            address: '123, Green Park, Delhi, India 110016',
            status: 'active',
            profile_image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=10b981&color=fff'
        },
        {
            id: 'buyer-ns-002',
            email: 'priya.sharma@email.com',
            password: 'buyer123',
            role: 'buyer',
            name: 'Priya Sharma',
            phone: '+91-98765-43211',
            address: '456, Koramangala, Bangalore, Karnataka 560034',
            status: 'active',
            profile_image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=10b981&color=fff'
        },
        {
            id: 'seller-ns-001',
            email: 'amit.properties@email.com',
            password: 'seller123',
            role: 'seller',
            name: 'Amit Real Estate',
            phone: '+91-98765-43212',
            address: '789, Bandra West, Mumbai, Maharashtra 400050',
            status: 'active',
            profile_image: 'https://ui-avatars.com/api/?name=Amit+Real+Estate&background=ff6b35&color=fff'
        },
        {
            id: 'seller-ns-002',
            email: 'sunita.homes@email.com',
            password: 'seller123',
            role: 'seller',
            name: 'Sunita Premium Homes',
            phone: '+91-98765-43213',
            address: '321, Jubilee Hills, Hyderabad, Telangana 500033',
            status: 'active',
            profile_image: 'https://ui-avatars.com/api/?name=Sunita+Homes&background=ff6b35&color=fff'
        }
    ];
    
    for (const user of users) {
        try {
            const response = await fetch('tables/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                console.log(`✓ Added user: ${user.name}`);
            }
        } catch (error) {
            console.error(`✗ Error adding user ${user.name}:`, error);
        }
    }
    
    // 2. Add Property Types
    console.log('Adding property types...');
    
    const propertyTypes = [
        { id: 'type-ns-001', name: 'Apartment', description: 'Multi-unit residential building' },
        { id: 'type-ns-002', name: 'Villa', description: 'Luxury standalone residence' },
        { id: 'type-ns-003', name: 'Independent House', description: 'Single-family detached home' },
        { id: 'type-ns-004', name: 'Flat', description: 'Residential unit in multi-story building' },
        { id: 'type-ns-005', name: 'Penthouse', description: 'Luxury apartment on top floor' },
        { id: 'type-ns-006', name: 'Bungalow', description: 'Single-story detached house' },
        { id: 'type-ns-007', name: 'Duplex', description: 'Two-floor residential unit' },
        { id: 'type-ns-008', name: 'Farmhouse', description: 'Rural property with land' }
    ];
    
    for (const type of propertyTypes) {
        try {
            const response = await fetch('tables/property_types', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(type)
            });
            if (response.ok) {
                console.log(`✓ Added property type: ${type.name}`);
            }
        } catch (error) {
            console.error(`✗ Error adding type ${type.name}:`, error);
        }
    }
    
    // 3. Add Properties (Indian Real Estate)
    console.log('Adding properties...');
    
    const properties = [
        {
            id: 'prop-ns-001',
            seller_id: 'seller-ns-001',
            property_type_id: 'type-ns-002',
            title: 'Luxury Beach Villa in North Goa',
            description: 'Stunning 4-bedroom villa with private pool, located just 500m from Anjuna Beach. Perfect for luxury living with modern amenities and breathtaking sea views.',
            address: 'Beach Road, Anjuna',
            city: 'Goa',
            state: 'Goa',
            zipcode: '403509',
            amount: 85000000,
            bedrooms: 4,
            bathrooms: 4,
            area_sqft: 3500,
            amenities: ['Private Pool', 'Beach Access', 'Gym', 'Garden', 'Parking', '24/7 Security'],
            images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
            status: 'available',
            featured: true
        },
        {
            id: 'prop-ns-002',
            seller_id: 'seller-ns-001',
            property_type_id: 'type-ns-001',
            title: '3BHK Modern Apartment in Whitefield',
            description: 'Spacious 3-bedroom apartment in prime Whitefield location. Walking distance to tech parks, malls, and schools.',
            address: '123, ITPL Main Road, Whitefield',
            city: 'Bangalore',
            state: 'Karnataka',
            zipcode: '560066',
            amount: 12500000,
            bedrooms: 3,
            bathrooms: 3,
            area_sqft: 1850,
            amenities: ['Gym', 'Swimming Pool', 'Parking', 'Clubhouse', '24/7 Security'],
            images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
            status: 'available',
            featured: true
        },
        {
            id: 'prop-ns-003',
            seller_id: 'seller-ns-002',
            property_type_id: 'type-ns-003',
            title: '4BHK Independent House in South Delhi',
            description: 'Beautiful independent house in prime South Delhi. Large garden, parking for 3 cars, separate servant quarters.',
            address: '456, Greater Kailash-1',
            city: 'New Delhi',
            state: 'Delhi',
            zipcode: '110048',
            amount: 65000000,
            bedrooms: 4,
            bathrooms: 4,
            area_sqft: 3200,
            amenities: ['Garden', 'Parking', 'Terrace', 'Modular Kitchen', 'Servant Room'],
            images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'],
            status: 'available',
            featured: true
        },
        {
            id: 'prop-ns-004',
            seller_id: 'seller-ns-002',
            property_type_id: 'type-ns-005',
            title: 'Premium Penthouse with Sea View - Worli',
            description: 'Spectacular penthouse with panoramic Arabian Sea views. Top floor luxury with private terrace and Jacuzzi.',
            address: 'Worli Sea Face',
            city: 'Mumbai',
            state: 'Maharashtra',
            zipcode: '400018',
            amount: 250000000,
            bedrooms: 4,
            bathrooms: 5,
            area_sqft: 5000,
            amenities: ['Sea View', 'Private Terrace', 'Jacuzzi', 'Gym', 'Smart Home'],
            images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'],
            status: 'available',
            featured: true
        },
        {
            id: 'prop-ns-005',
            seller_id: 'seller-ns-002',
            property_type_id: 'type-ns-002',
            title: 'Contemporary Villa in Jubilee Hills',
            description: 'Modern villa with designer interiors. Private pool, home theater, and landscaped garden.',
            address: 'Road No. 45, Jubilee Hills',
            city: 'Hyderabad',
            state: 'Telangana',
            zipcode: '500033',
            amount: 45000000,
            bedrooms: 4,
            bathrooms: 4,
            area_sqft: 4000,
            amenities: ['Private Pool', 'Home Theater', 'Garden', 'Parking', 'Gym'],
            images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'],
            status: 'available',
            featured: false
        },
        {
            id: 'prop-ns-006',
            seller_id: 'seller-ns-001',
            property_type_id: 'type-ns-001',
            title: '2BHK Premium Apartment in Koregaon Park',
            description: 'Luxury 2-bedroom apartment in Koregaon Park. Fully furnished with modern amenities.',
            address: 'Lane 7, Koregaon Park',
            city: 'Pune',
            state: 'Maharashtra',
            zipcode: '411001',
            amount: 8500000,
            bedrooms: 2,
            bathrooms: 2,
            area_sqft: 1200,
            amenities: ['Gym', 'Parking', 'Security', 'Swimming Pool'],
            images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
            status: 'available',
            featured: false
        },
        {
            id: 'prop-ns-007',
            seller_id: 'seller-ns-001',
            property_type_id: 'type-ns-007',
            title: '4BHK Duplex in OMR IT Corridor',
            description: 'Spacious duplex in prime OMR location. Close to IT parks and schools.',
            address: 'OMR Main Road, Thoraipakkam',
            city: 'Chennai',
            state: 'Tamil Nadu',
            zipcode: '600097',
            amount: 15000000,
            bedrooms: 4,
            bathrooms: 3,
            area_sqft: 2400,
            amenities: ['Parking', 'Gym', 'Security', 'Clubhouse'],
            images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
            status: 'available',
            featured: false
        },
        {
            id: 'prop-ns-008',
            seller_id: 'seller-ns-002',
            property_type_id: 'type-ns-006',
            title: 'Elegant Bungalow in Satellite Area',
            description: 'Beautiful bungalow with large plot. Traditional architecture with modern amenities.',
            address: 'Satellite Road',
            city: 'Ahmedabad',
            state: 'Gujarat',
            zipcode: '380015',
            amount: 35000000,
            bedrooms: 5,
            bathrooms: 4,
            area_sqft: 4500,
            amenities: ['Garden', 'Parking', 'Solar Panels', 'Servant Quarter'],
            images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
            status: 'available',
            featured: false
        },
        {
            id: 'prop-ns-009',
            seller_id: 'seller-ns-001',
            property_type_id: 'type-ns-004',
            title: '3BHK Premium Flat in Salt Lake',
            description: 'Modern flat in Salt Lake. Close to City Centre mall and IT hub.',
            address: 'Sector-V, Salt Lake',
            city: 'Kolkata',
            state: 'West Bengal',
            zipcode: '700091',
            amount: 9500000,
            bedrooms: 3,
            bathrooms: 2,
            area_sqft: 1600,
            amenities: ['Parking', 'Lift', 'Security', 'Gym'],
            images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
            status: 'available',
            featured: false
        },
        {
            id: 'prop-ns-010',
            seller_id: 'seller-ns-002',
            property_type_id: 'type-ns-008',
            title: 'Luxury Farmhouse with Valley View',
            description: 'Spectacular farmhouse on 2 acres. Private pool and valley view. Perfect weekend getaway.',
            address: 'Old Mumbai-Pune Highway',
            city: 'Lonavala',
            state: 'Maharashtra',
            zipcode: '410401',
            amount: 55000000,
            bedrooms: 5,
            bathrooms: 5,
            area_sqft: 6000,
            amenities: ['Private Pool', 'Valley View', 'Organic Farm', 'Garden', 'BBQ Area'],
            images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'],
            status: 'available',
            featured: false
        }
    ];
    
    for (const property of properties) {
        try {
            const response = await fetch('tables/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(property)
            });
            if (response.ok) {
                console.log(`✓ Added property: ${property.title}`);
            }
        } catch (error) {
            console.error(`✗ Error adding property ${property.title}:`, error);
        }
    }
    
    console.log('✅ Narmada Sales Database Population Complete!');
    console.log('You can now login with:');
    console.log('Admin: admin@narmadasales.com / admin123');
    console.log('Buyer: rajesh.kumar@email.com / buyer123');
    console.log('Seller: amit.properties@email.com / seller123');
}

// Run the population
// populateNarmadaSalesDatabase();

console.log('Database population script loaded. Run populateNarmadaSalesDatabase() to start.');
