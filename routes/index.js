const express = require('express');
const router = express.Router();

// Simple location pages
const makeLocation = (city, slug) => ({
    path: `/locations/${slug}`,
    title: `${city} Roofing & Construction | GK Homes and Roofing`,
    description: `Top-rated roofing and construction services in ${city}, TX. GAF & Owens Corning certified. Free estimates: 512-564-3679.`
});

const locations = [
    makeLocation('Leander', 'leander'),
    makeLocation('Liberty Hill', 'liberty-hill'),
    makeLocation('Georgetown', 'georgetown'),
    makeLocation('Cedar Park', 'cedar-park'),
    makeLocation('Round Rock', 'round-rock'),
    makeLocation('Jonestown', 'jonestown'),
    makeLocation('Lago Vista', 'lago-vista'),
    makeLocation('Burnet', 'burnet'),
    makeLocation('Pflugerville', 'pflugerville'),
    makeLocation('Lake Travis', 'lake-travis')
];

locations.forEach(loc => {
    router.get(loc.path, (req, res) => {
        res.render('pages/locations/location', {
            title: loc.title,
            description: loc.description,
            page: 'services',
            city: loc.title.split(' Roofing')[0]
        });
    });
});

// Homepage
router.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'GK Homes and Roofing | Roofing, Construction & Remodeling in Central Texas',
        description: 'GK Homes and Roofing offers expert roofing, construction and remodeling services in Central Texas. GAF & Owens Corning certified contractors with 19+ years of experience. Serving Leander, Liberty Hill, Georgetown, Cedar Park, Round Rock, Jonestown, Lago Vista, Burnet, Pflugerville, Lake Travis.',
        page: 'home'
    });
});

// About page
router.get('/about', (req, res) => {
    res.render('pages/about', {
        title: 'About GK Homes | Craftsmanship and Care Since 2017',
        description: 'Built on craftsmanship and driven by passion. Learn about GK Homes—founded in 2017—our values, certifications (GAF, Owens Corning), and commitment to quality in Central Texas.',
        page: 'about'
    });
});

module.exports = router; 