const express = require('express');
const router = express.Router();

    // Projects gallery
    router.get('/', (req, res) => {
        const projects = [
            {
                id: 1,
                title: 'Amy\'s Daycare',
                category: 'construction',
                description: 'Complete commercial daycare facility construction from ground up, featuring modern safety features and durable materials',
                thumbnail: '/images/projects/daycare-aerial.jpg',
                images: ['/images/projects/daycare-aerial.jpg', '/images/projects/daycare-framing.jpg', '/images/projects/daycare-progress.jpg']
            },
            {
                id: 2,
                title: 'Old Anderson Mill Historic Home',
                category: 'remodeling',
                description: 'Historic home restoration preserving original character while adding modern amenities',
                thumbnail: '/images/projects/anderson-hero.jpg',
                images: ['/images/projects/anderson-hero.jpg', '/images/projects/anderson1.jpg', '/images/projects/anderson2.jpg', '/images/projects/anderson3.jpg']
            },
            {
                id: 3,
                title: '1000 LaCantera Luxury Remodel',
                category: 'remodeling',
                description: 'Complete luxury home remodel featuring custom bathrooms, hardwood floors, and high-end finishes',
                thumbnail: '/images/projects/lacantera-bathroom.jpg',
                images: ['/images/projects/lacantera-bathroom.jpg', '/images/projects/lacantera-laundry.jpg', '/images/projects/lacantera-closet.jpg', '/images/projects/lacantera1.jpg', '/images/projects/lacantera2.jpg']
            },
            {
                id: 4,
                title: 'GAF Timberline Solar Installation',
                category: 'solar',
                description: 'Innovative solar shingle installation combining roof protection with clean energy generation',
                thumbnail: '/images/projects/solar-roof-thumb.jpg',
                images: ['/images/projects/solar-roof-thumb.jpg', '/images/services/solar.jpg']
            },
            {
                id: 5,
                title: 'Lake Dillon Roof Replacement',
                category: 'roofing',
                description: 'Complete residential roof replacement with premium GAF architectural shingles',
                thumbnail: '/images/projects/lakedillon-roof.jpg',
                images: ['/images/projects/lakedillon-roof.jpg', '/images/projects/roof-aerial-1.jpg', '/images/projects/roof-aerial-2.jpg']
            },
            {
                id: 6,
                title: 'Luxury Estate Roofing',
                category: 'roofing',
                description: 'Premium tile roof installation on luxury estate with precision craftsmanship',
                thumbnail: '/images/projects/roof-aerial-1.jpg',
                images: ['/images/projects/roof-aerial-1.jpg', '/images/projects/roof-aerial-2.jpg', '/images/hero-aerial.jpg']
            },
            {
                id: 7,
                title: 'Custom Home Construction',
                category: 'construction',
                description: 'New custom home build from foundation to finish with quality materials',
                thumbnail: '/images/projects/project1.jpg',
                images: ['/images/projects/project1.jpg', '/images/projects/project2.jpg']
            }
        ];

    res.render('pages/projects', {
        title: 'Our Projects | GK Homes and Roofing',
        description: 'View our portfolio of completed roofing, remodeling, and construction projects across Central Texas.',
        page: 'projects',
        projects: projects
    });
});

// Individual project details
router.get('/:id', (req, res) => {
    // In a real application, you would fetch this from a database
    const projectId = req.params.id;
    
    // Sample project data
    const project = {
        id: projectId,
        title: 'Project Details',
        category: 'construction',
        description: 'Detailed project information',
        images: [],
        details: {
            duration: '3 months',
            scope: 'Complete construction',
            location: 'Austin, TX'
        }
    };

    res.render('pages/project-detail', {
        title: `${project.title} | GK Homes and Roofing`,
        description: project.description,
        page: 'projects',
        project: project
    });
});

module.exports = router; 