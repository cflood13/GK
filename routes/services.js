const express = require('express');
const router = express.Router();

// Services overview
router.get('/', (req, res) => {
    res.render('pages/services', {
        title: 'Our Services | GK Roofing & Construction',
        description: 'Professional roofing installation, repair, solar roofing, and home remodeling services in Austin, TX. GAF certified contractors.',
        page: 'services'
    });
});

// Roofing services
router.get('/roofing', (req, res) => {
    res.render('pages/services/roofing', {
        title: 'Roofing Services | GK Roofing & Construction',
        description: 'Expert roofing installation, repair, and maintenance services. GAF certified contractors specializing in residential and commercial roofing.',
        page: 'services'
    });
});

// Solar roofing
router.get('/solar', (req, res) => {
    res.render('pages/services/solar', {
        title: 'Solar Roofing | GK Roofing & Construction',
        description: 'GAF Energy Timberline Solar roofing installation. Combine roof replacement with solar energy production.',
        page: 'services'
    });
});

// Remodeling services
router.get('/remodeling', (req, res) => {
    res.render('pages/services/remodeling', {
        title: 'Home Remodeling | GK Roofing & Construction',
        description: 'Complete home remodeling services including kitchens, bathrooms, additions, and whole-house renovations in Austin, TX.',
        page: 'services'
    });
});

// Construction services
router.get('/construction', (req, res) => {
    res.render('pages/services/construction', {
        title: 'New Construction | GK Roofing & Construction',
        description: 'Custom home building and new construction services in Austin, TX. From design to completion.',
        page: 'services'
    });
});

module.exports = router; 