const express = require('express');
const router = express.Router();

// Homepage
router.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'GK Roofing & Construction | Professional Roofing & Remodeling Services in Austin, TX',
        description: 'GK Roofing & Construction offers expert roofing installation, repair, and home remodeling services in Austin and surrounding areas. GAF Certified contractors with 50+ years of experience.',
        page: 'home'
    });
});

// About page
router.get('/about', (req, res) => {
    res.render('pages/about', {
        title: 'About Us | GK Roofing & Construction',
        description: 'Learn about GK Roofing & Construction\'s 50+ years of experience, certifications, and commitment to quality construction and roofing services in Austin, TX.',
        page: 'about'
    });
});

module.exports = router; 