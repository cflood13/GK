const express = require('express');
const router = express.Router();

// Services overview
router.get('/', (req, res) => {
    res.render('pages/services', {
        title: 'Our Services | GK Homes and Roofing',
        description: 'Professional roofing installation, repair, solar roofing, and home remodeling services in Austin, TX. GAF certified contractors.',
        page: 'services'
    });
});

// Roofing services
router.get('/roofing', (req, res) => {
    res.render('pages/services/roofing', {
        title: 'Roofing Services | GK Homes and Roofing',
        description: 'Expert roofing installation, repair, and maintenance services. GAF & Owens Corning certified contractors specializing in residential and commercial roofing across Central Texas.',
        page: 'services'
    });
});

// Solar roofing
router.get('/solar', (req, res) => {
    res.render('pages/services/solar', {
        title: 'Solar Roofing | GK Homes and Roofing',
        description: 'GAF Energy Timberline Solar roofing installation. Combine roof replacement with solar energy production.',
        page: 'services'
    });
});

// Remodeling services
router.get('/remodeling', (req, res) => {
    res.render('pages/services/remodeling', {
        title: 'Home Remodeling | GK Homes and Roofing',
        description: 'Complete home remodeling services including kitchens, bathrooms, additions, and whole-house renovations in Austin, TX.',
        page: 'services'
    });
});

// Construction services
router.get('/construction', (req, res) => {
    res.render('pages/services/construction', {
        title: 'New Construction | GK Homes and Roofing',
        description: 'Custom home building and new construction services in Austin, TX. From design to completion.',
        page: 'services'
    });
});

module.exports = router; 