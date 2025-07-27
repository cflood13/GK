const express = require('express');
const router = express.Router();

    // Projects gallery
    router.get('/', (req, res) => {
        const projects = [
            {
                id: 1,
                title: 'Amy\'s Daycare',
                category: 'construction',
                description: 'Complete daycare facility construction with modern safety features',
                thumbnail: '/images/projects/amys-daycare-thumb.jpg',
                images: ['/images/projects/amys-daycare-thumb.jpg', '/images/services/construction.jpg']
            },
            {
                id: 2,
                title: 'Old Anderson Mill Winn Whittman House',
                category: 'remodeling',
                description: 'Historic home restoration and complete remodeling',
                thumbnail: '/images/projects/anderson-mill-thumb.jpg',
                images: ['/images/projects/anderson-mill-thumb.jpg', '/images/projects/anderson1.jpg', '/images/projects/anderson2.jpg', '/images/projects/anderson3.jpg']
            },
            {
                id: 3,
                title: '1000 LaCantera',
                category: 'remodeling',
                description: 'Luxury home complete remodel with high-end finishes',
                thumbnail: '/images/services/remodeling.jpg',
                images: ['/images/services/remodeling.jpg', '/images/projects/lacantera1.jpg', '/images/projects/lacantera2.jpg']
            },
            {
                id: 4,
                title: 'Solar Roofing Installation',
                category: 'solar',
                description: 'GAF Timberline Solar roof installation with energy efficiency',
                thumbnail: '/images/projects/solar-roof-thumb.jpg',
                images: ['/images/projects/solar-roof-thumb.jpg', '/images/services/solar.jpg']
            },
            {
                id: 5,
                title: 'Residential Roof Replacement',
                category: 'roofing',
                description: 'Complete roof replacement with GAF architectural shingles',
                thumbnail: '/images/services/roofing.jpg',
                images: ['/images/services/roofing.jpg', '/images/gallery1.jpg', '/images/gallery2.jpg', '/images/gallery3.jpg']
            },
            {
                id: 6,
                title: 'Custom Home Construction',
                category: 'construction',
                description: 'New custom home build from foundation to finish',
                thumbnail: '/images/projects/project1.jpg',
                images: ['/images/projects/project1.jpg', '/images/projects/project2.jpg']
            }
        ];

    res.render('pages/projects', {
        title: 'Our Projects | GK Roofing & Construction',
        description: 'View our portfolio of completed roofing, remodeling, and construction projects in Austin, TX.',
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
        title: `${project.title} | GK Roofing & Construction`,
        description: project.description,
        page: 'projects',
        project: project
    });
});

module.exports = router; 