const express = require('express');
const router = express.Router();

// Shared project data with full details
const projects = [
    {
        id: 1,
        title: "Amy's Daycare",
        category: 'construction',
        description: 'Complete commercial daycare facility construction from ground up, featuring modern safety features and durable materials designed for childcare excellence.',
        thumbnail: '/images/projects/daycare-aerial.jpg',
        images: ['/images/projects/daycare-aerial.jpg', '/images/projects/daycare-framing.jpg', '/images/projects/daycare-progress.jpg'],
        fullDescription: "This ground-up commercial construction project transformed an empty lot into a state-of-the-art childcare facility. Working closely with Amy's Daycare ownership, we designed and built a space that prioritizes child safety while creating a warm, welcoming environment for families. The facility features reinforced safety barriers, child-proof fixtures, commercial-grade HVAC for optimal air quality, and durable finishes that can withstand daily use while remaining easy to clean and maintain.",
        details: {
            duration: '6 months',
            scope: 'Full commercial construction',
            location: 'Leander, TX',
            squareFootage: '4,500 sq ft',
            services: 'Site preparation, Foundation, Framing, Roofing, Electrical, Plumbing, HVAC, Interior finishes'
        },
        highlights: [
            'Commercial-grade construction meeting all childcare licensing requirements',
            'Enhanced safety features including reinforced walls and child-proof fixtures',
            'Energy-efficient HVAC system with superior air filtration',
            'Durable, easy-to-clean flooring and wall finishes',
            'Custom outdoor play area with safety surfacing',
            'ADA compliant throughout the facility'
        ]
    },
    {
        id: 2,
        title: 'Old Anderson Mill Historic Home',
        category: 'remodeling',
        description: 'Stunning historic home restoration preserving original Hill Country character while seamlessly integrating modern luxury amenities and contemporary design.',
        thumbnail: '/images/projects/anderson-hero.jpg',
        images: ['/images/projects/anderson-hero.jpg', '/images/projects/anderson1.jpg', '/images/projects/anderson2.jpg', '/images/projects/anderson3.jpg'],
        fullDescription: "This remarkable renovation project brought new life to a cherished historic property in the Old Anderson Mill area. Our team carefully balanced preservation of the home's original Texas Hill Country character with thoughtful modern upgrades. We restored original limestone features, refinished hardwood floors, and maintained period-appropriate details while adding a gourmet kitchen, spa-like bathrooms, and an open-concept living space that honors the home's heritage.",
        details: {
            duration: '4 months',
            scope: 'Complete interior renovation',
            location: 'Cedar Park, TX',
            squareFootage: '3,200 sq ft',
            services: 'Demo, Structural modifications, Kitchen remodel, Bathroom renovations, Flooring, Painting, Custom millwork'
        },
        highlights: [
            'Preserved original limestone fireplace and architectural details',
            'Custom white oak hardwood flooring throughout',
            'Designer kitchen with quartzite countertops and professional appliances',
            'Three luxury bathrooms with heated floors and frameless glass',
            'Open concept living with exposed beam ceilings',
            'Modern smart home integration maintaining historic aesthetics'
        ]
    },
    {
        id: 3,
        title: '1000 LaCantera Luxury Remodel',
        category: 'remodeling',
        description: 'Complete luxury home transformation featuring designer bathrooms, premium hardwood floors, custom closets, and high-end finishes throughout.',
        thumbnail: '/images/projects/lacantera-bathroom.jpg',
        images: ['/images/projects/lacantera-bathroom.jpg', '/images/projects/lacantera-laundry.jpg', '/images/projects/lacantera-closet.jpg', '/images/projects/lacantera1.jpg', '/images/projects/lacantera2.jpg'],
        fullDescription: "This comprehensive luxury remodel transformed a dated property into a modern masterpiece. Every room received meticulous attention, from the spa-inspired primary bathroom with its freestanding soaking tub and rainfall shower to the custom walk-in closets with built-in organization systems. The project showcased our commitment to quality craftsmanship with premium materials including imported porcelain tile, solid hardwood flooring, and custom cabinetry throughout.",
        details: {
            duration: '3 months',
            scope: 'Whole-home luxury renovation',
            location: 'Georgetown, TX',
            squareFootage: '2,800 sq ft',
            services: 'Bathroom remodels, Closet systems, Flooring, Laundry room, Painting, Lighting, Fixtures'
        },
        highlights: [
            'Spa-inspired primary bathroom with freestanding tub',
            'Custom walk-in closets with built-in organization',
            'Premium wide-plank hardwood flooring',
            'Designer laundry room with custom cabinetry',
            'High-end fixtures and finishes throughout',
            'LED lighting design with smart controls'
        ]
    },
    {
        id: 4,
        title: 'GAF Timberline Solar Installation',
        category: 'solar',
        description: 'Cutting-edge GAF Timberline Solar shingle system combining seamless roof protection with clean energy generation for maximum efficiency and curb appeal.',
        thumbnail: '/images/projects/solar-roof-thumb.jpg',
        images: ['/images/projects/solar-roof-thumb.jpg', '/images/services/solar.jpg'],
        fullDescription: "This innovative installation showcases the future of residential roofing with GAF's Timberline Solar system. Unlike traditional bolt-on solar panels, these solar shingles integrate directly into the roof, creating a sleek, unified appearance while generating substantial clean energy. The homeowner now enjoys significantly reduced electricity bills while maintaining their home's architectural aesthetics. As certified GAF installers, we ensured proper installation backed by comprehensive warranty coverage.",
        details: {
            duration: '1 week',
            scope: 'Solar roof installation',
            location: 'Round Rock, TX',
            squareFootage: '2,400 sq ft roof',
            services: 'Roof replacement, Solar shingle installation, Electrical integration, Monitoring setup'
        },
        highlights: [
            'GAF Timberline Solar shingles for seamless integration',
            'Estimated 70% reduction in electricity costs',
            'Sleek appearance vs. traditional panel systems',
            'GAF Golden Pledge warranty protection',
            'Real-time energy monitoring system',
            'Qualifies for federal and state solar incentives'
        ]
    },
    {
        id: 5,
        title: 'Lake Dillon Roof Replacement',
        category: 'roofing',
        description: 'Complete residential roof replacement featuring premium GAF HDZ architectural shingles with enhanced weather protection for Central Texas conditions.',
        thumbnail: '/images/projects/lakedillon-roof.jpg',
        images: ['/images/projects/lakedillon-roof.jpg', '/images/projects/roof-aerial-1.jpg', '/images/projects/roof-aerial-2.jpg'],
        fullDescription: "After hail damage compromised the original roof, this Lake Dillon homeowner chose GK Homes and Roofing for a complete roof replacement. We installed GAF Timberline HDZ shingles, the #1 selling shingle in North America, featuring StrikeZone nailing technology and LayerLock technology for superior wind resistance up to 130 MPH. The project included complete tear-off, deck inspection and repairs, and installation of a comprehensive weather protection system.",
        details: {
            duration: '2 days',
            scope: 'Complete roof replacement',
            location: 'Pflugerville, TX',
            squareFootage: '3,100 sq ft',
            services: 'Tear-off, Deck repair, Underlayment, Shingle installation, Ridge vents, Flashing'
        },
        highlights: [
            'GAF Timberline HDZ architectural shingles',
            '130 MPH wind warranty protection',
            'StrikeZone nailing technology',
            'Complete synthetic underlayment system',
            'New ridge vents for improved attic ventilation',
            'GAF Golden Pledge warranty eligible'
        ]
    },
    {
        id: 6,
        title: 'Regatta Cove Estate Roofing',
        category: 'roofing',
        description: 'Premium tile roof installation on luxury lakefront estate with precision craftsmanship and attention to architectural detail.',
        thumbnail: '/images/projects/roof-aerial-1.jpg',
        images: ['/images/projects/roof-aerial-1.jpg', '/images/projects/roof-aerial-2.jpg', '/images/hero-aerial.jpg'],
        fullDescription: "This stunning lakefront estate required roofing that matched its architectural grandeur. Our team installed a premium concrete tile roof system designed to withstand decades of Texas weather while enhancing the home's Mediterranean-inspired design. The complex roofline presented unique challenges including multiple valleys, dormers, and varying pitches, all expertly handled by our experienced installation crew.",
        details: {
            duration: '2 weeks',
            scope: 'Premium tile roof installation',
            location: 'Lago Vista, TX',
            squareFootage: '5,200 sq ft',
            services: 'Tile roof installation, Custom flashing, Underlayment system, Valley work, Ridge tiles'
        },
        highlights: [
            'Premium concrete tile roofing system',
            '50+ year expected lifespan',
            'Superior wind and impact resistance',
            'Complex multi-pitch roofline execution',
            'Custom copper flashing details',
            'Enhanced curb appeal and property value'
        ]
    },
    {
        id: 7,
        title: 'Quarry Custom Home',
        category: 'construction',
        description: 'Custom luxury home construction from foundation to finish, featuring modern Hill Country architecture and premium materials throughout.',
        thumbnail: '/images/projects/project1.jpg',
        images: ['/images/projects/project1.jpg', '/images/projects/project2.jpg'],
        fullDescription: "This custom home build in the prestigious Quarry development showcases our full construction capabilities. From initial site preparation through final finishes, our team managed every aspect of this luxury residence. The home features contemporary Hill Country architecture with limestone accents, expansive windows for natural light, and an open floor plan perfect for modern living. Premium finishes include custom cabinetry, designer tile work, and high-end fixtures throughout.",
        details: {
            duration: '10 months',
            scope: 'New custom home construction',
            location: 'Liberty Hill, TX',
            squareFootage: '4,100 sq ft',
            services: 'Site work, Foundation, Framing, Roofing, MEP, Interior finishes, Landscaping'
        },
        highlights: [
            'Contemporary Hill Country architecture',
            'Native limestone exterior accents',
            'Open floor plan with 12-foot ceilings',
            'Gourmet kitchen with custom island',
            'Primary suite with spa bathroom',
            'Covered outdoor living with fireplace'
        ]
    }
];

// Projects gallery
router.get('/', (req, res) => {
    res.render('pages/projects', {
        title: 'Our Projects | GK Homes and Roofing',
        description: 'View our portfolio of completed roofing, remodeling, and construction projects across Central Texas.',
        page: 'projects',
        projects: projects
    });
});

// Individual project details
router.get('/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        return res.status(404).render('pages/404', {
            title: 'Project Not Found | GK Homes and Roofing',
            description: 'The requested project could not be found.',
            page: 'projects'
        });
    }

    res.render('pages/project-detail', {
        title: `${project.title} | GK Homes and Roofing`,
        description: project.description,
        page: 'projects',
        project: project,
        allProjects: projects
    });
});

module.exports = router; 