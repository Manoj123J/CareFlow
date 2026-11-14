/**
 * CareFlow — Centralized Sample Data (sample-data.js)
 * ---------------------------------------------------------------------------
 * Global dataset accessible without fetch() or ES modules for file:// compatibility.
 * Provides mock records for:
 * 1. Health Camps (verified community medical screening camps)
 * 2. Voluntary Blood Donors (searchable by group and city with privacy)
 * 3. Care Facilities (hospitals, clinics, and pharmacies with coordinates)
 */

(function (window) {
    'use strict';

    function getOffsetDate(offsetDays) {
        var d = new Date();
        d.setDate(d.getDate() + offsetDays);
        return d.toISOString().split('T')[0];
    }

    var todayStr = getOffsetDate(0);
    var tomorrowStr = getOffsetDate(1);
    var inThreeDaysStr = getOffsetDate(3);
    var inFiveDaysStr = getOffsetDate(5);
    var inEightDaysStr = getOffsetDate(8);
    var inTwelveDaysStr = getOffsetDate(12);
    var pastDateStr = getOffsetDate(-3); // Used to verify that past camps are automatically hidden

    window.CareFlowData = {
        meta: {
            isSample: true,
            version: '2.0.0',
            notice: 'Sample demonstration dataset. Not verified live medical directory data.'
        },

        // ===================================================================
        // 1. HEALTH CAMPS (Verified & Community-Sourced Free Medical Camps)
        // ===================================================================
        camps: [
            {
                id: 'camp-101',
                title: 'Free Eye Screening & Cataract Consultation',
                organizer: 'Lions Vision Foundation & Community Trust',
                contactNumber: '+91 98451 22334',
                city: 'Bangalore',
                address: 'Community Center, 4th Main, Indiranagar',
                date: todayStr,
                time: '09:00 AM - 02:00 PM',
                services: ['Vision Testing', 'Cataract Screening', 'Free Eye Drops'],
                isVerified: true,
                source: 'Added by CareFlow',
                status: 'verified',
                description: 'Comprehensive general vision testing for senior citizens and children. Free reading glasses distributed to first 100 eligible visitors.'
            },
            {
                id: 'camp-102',
                title: 'General Health & Diabetes Checkup Camp',
                organizer: 'Rotary Club South & Apex Health Mission',
                contactNumber: '+91 91234 56789',
                city: 'Bangalore',
                address: 'Govt. Primary School Grounds, Koramangala 6th Block',
                date: tomorrowStr,
                time: '08:30 AM - 01:30 PM',
                services: ['Random Blood Sugar', 'Blood Pressure Check', 'Physician Consultation'],
                isVerified: true,
                source: 'Community submitted',
                status: 'verified',
                description: 'Walk-in screening for hypertension and pre-diabetes. Please bring prior prescriptions if currently taking regular medication.'
            },
            {
                id: 'camp-103',
                title: 'Pediatric Immunization & Child Health Camp',
                organizer: 'Seva Child Welfare Initiative',
                contactNumber: '+91 98888 12345',
                city: 'Delhi',
                address: 'MCD Community Hall, Sector 7, Rohini',
                date: inThreeDaysStr,
                time: '10:00 AM - 03:00 PM',
                services: ['Growth Monitoring', 'Nutrition Counseling', 'Vitamin A Drops'],
                isVerified: true,
                source: 'Added by CareFlow',
                status: 'verified',
                description: 'Child health screening and advice for parents on balanced nutrition and timely government immunization milestones.'
            },
            {
                id: 'camp-104',
                title: 'Cardiac Assessment & Resting ECG Camp',
                organizer: 'Janata Heart Care Volunteers',
                contactNumber: '+91 99000 44556',
                city: 'Mumbai',
                address: 'Municipal School Compound, Dadar West',
                date: inFiveDaysStr,
                time: '09:00 AM - 01:00 PM',
                services: ['Resting ECG', 'Cardiologist Consultation', 'Dietary Guidance'],
                isVerified: true,
                source: 'Community submitted',
                status: 'verified',
                description: 'Free basic cardiac assessment for individuals over 40 or those with a personal or family history of cardiovascular risk.'
            },
            {
                id: 'camp-105',
                title: 'Women Wellness & Anemia Screening Camp',
                organizer: 'Aarogya Women Health Society',
                contactNumber: '+91 97412 88990',
                city: 'Bangalore',
                address: 'Town Hall Grounds, Jayanagar 4th Block',
                date: inEightDaysStr,
                time: '09:30 AM - 02:30 PM',
                services: ['Hemoglobin Test', 'Women Health Consultation', 'Bone Density Check'],
                isVerified: true,
                source: 'Added by CareFlow',
                status: 'verified',
                description: 'Dedicated maternal and women health screening focusing on bone mineral density, iron levels, and lifestyle health.'
            },
            {
                id: 'camp-106',
                title: 'Senior Citizen Geriatric Checkup Camp',
                organizer: 'Elders Care Alliance',
                contactNumber: '+91 93333 44444',
                city: 'Delhi',
                address: 'Senior Center, Defence Colony, Block C',
                date: inTwelveDaysStr,
                time: '09:00 AM - 01:00 PM',
                services: ['Joint Mobility Assessment', 'General Physician Checkup', 'BP Screening'],
                isVerified: true,
                source: 'Added by CareFlow',
                status: 'verified',
                description: 'Specialized consultation camp addressing mobility issues, chronic joint pain, and lifestyle adjustments for elders.'
            },
            {
                // This past camp verifies the filter that automatically hides past camps
                id: 'camp-100-past',
                title: 'Past Dental Screening Camp (Verification Test)',
                organizer: 'Smile Dental Volunteers',
                contactNumber: '+91 94444 00000',
                city: 'Bangalore',
                address: 'Suburban Community Hall, Rajajinagar',
                date: pastDateStr,
                time: '09:00 AM - 01:00 PM',
                services: ['Oral Examination', 'Cavity Check'],
                isVerified: true,
                source: 'Community submitted',
                status: 'verified',
                description: 'Concluded historical camp. Should be filtered out automatically.'
            }
        ],

        // ===================================================================
        // 2. BLOOD DONORS (Voluntary Registry — Phone numbers kept private)
        // ===================================================================
        donors: [
            {
                id: 'donor-201',
                name: 'Priya S.',
                bloodGroup: 'O+',
                city: 'Bangalore',
                available: true,
                lastDonated: '4 months ago',
                consent: true
            },
            {
                id: 'donor-202',
                name: 'Rahul K.',
                bloodGroup: 'A+',
                city: 'Bangalore',
                available: true,
                lastDonated: '6 months ago',
                consent: true
            },
            {
                id: 'donor-203',
                name: 'Ananya M.',
                bloodGroup: 'O-',
                city: 'Mumbai',
                available: true,
                lastDonated: '5 months ago',
                consent: true
            },
            {
                id: 'donor-204',
                name: 'Vikas N.',
                bloodGroup: 'B+',
                city: 'Delhi',
                available: false,
                lastDonated: '1 month ago',
                consent: true
            },
            {
                id: 'donor-205',
                name: 'Deepak T.',
                bloodGroup: 'AB+',
                city: 'Bangalore',
                available: true,
                lastDonated: '7 months ago',
                consent: true
            },
            {
                id: 'donor-206',
                name: 'Kavita R.',
                bloodGroup: 'A-',
                city: 'Mumbai',
                available: true,
                lastDonated: '3 months ago',
                consent: true
            },
            {
                id: 'donor-207',
                name: 'Arjun P.',
                bloodGroup: 'B-',
                city: 'Delhi',
                available: true,
                lastDonated: '8 months ago',
                consent: true
            },
            {
                id: 'donor-208',
                name: 'Meera B.',
                bloodGroup: 'AB-',
                city: 'Bangalore',
                available: true,
                lastDonated: '4 months ago',
                consent: true
            }
        ],

        // ===================================================================
        // 3. CARE FACILITIES (Hospitals, Clinics, 24/7 Pharmacies)
        // Default center: Bangalore (12.9716, 77.5946)
        // ===================================================================
        places: [
            {
                id: 'place-1',
                name: 'City Care General Hospital',
                type: 'hospital',
                address: '15 Hospital Road, Shivaji Nagar, Bangalore',
                distanceKm: 0.8,
                phone: '+91 80 2286 1000',
                openHours: 'Open 24 Hours',
                lat: 12.9784,
                lng: 77.6012,
                verified: true
            },
            {
                id: 'place-2',
                name: 'Apollo 24/7 Pharmacy & Wellness',
                type: 'pharmacy',
                address: '42 Commercial Street, Tasker Town, Bangalore',
                distanceKm: 1.1,
                phone: '+91 80 2558 7700',
                openHours: 'Open 24 Hours',
                lat: 12.9815,
                lng: 77.6083,
                verified: true
            },
            {
                id: 'place-3',
                name: 'Sanjeevani Neighborhood Clinic',
                type: 'clinic',
                address: '77 Residency Road, Shanthala Nagar, Bangalore',
                distanceKm: 1.4,
                phone: '+91 80 2221 4455',
                openHours: '08:00 AM - 08:00 PM',
                lat: 12.9667,
                lng: 77.6033,
                verified: true
            },
            {
                id: 'place-4',
                name: 'MedPlus Discount Pharmacy',
                type: 'pharmacy',
                address: '108 Richmond Road, Bangalore',
                distanceKm: 1.8,
                phone: '+91 80 2224 8899',
                openHours: '07:00 AM - 11:00 PM',
                lat: 12.9620,
                lng: 77.6001,
                verified: true
            },
            {
                id: 'place-5',
                name: 'St. Philomena Health Center',
                type: 'hospital',
                address: 'Campbell Road, Viveka Nagar, Bangalore',
                distanceKm: 2.7,
                phone: '+91 80 4016 4500',
                openHours: 'Open 24 Hours',
                lat: 12.9550,
                lng: 77.6190,
                verified: true
            },
            {
                id: 'place-6',
                name: 'Dr. Rao Family Practice Clinic',
                type: 'clinic',
                address: '23 Victoria Road, Austin Town, Bangalore',
                distanceKm: 3.2,
                phone: '+91 80 2556 1234',
                openHours: '09:00 AM - 06:00 PM (Closed Sundays)',
                lat: 12.9590,
                lng: 77.6150,
                verified: true
            }
        ]
    };

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));

