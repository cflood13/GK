const express = require('express');
const router = express.Router();

// Contact page
router.get('/', (req, res) => {
    res.render('pages/contact', {
        title: 'Contact Us | GK Homes and Roofing',
        description: 'Get in touch with GK Homes and Roofing for your roofing and construction needs in Central Texas. Free estimates available.',
        page: 'contact'
    });
});

// Handle contact form submission
router.post('/submit', async (req, res) => {
    const { name, email, phone, service, message } = req.body;
    
    try {
        // In a real application, you would:
        // 1. Validate the input
        // 2. Send an email
        // 3. Save to database
        // 4. Send confirmation email to user
        
        console.log('Contact form submission:', {
            name,
            email,
            phone,
            service,
            message
        });
        
        // Send success response
        res.json({
            success: true,
            message: 'Thank you for contacting us! We will get back to you within 24 hours.'
        });
        
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again later.'
        });
    }
});

// Request quote page
router.get('/quote', (req, res) => {
    res.render('pages/quote', {
        title: 'Request a Quote | GK Homes and Roofing',
        description: 'Get a free quote for roofing, remodeling, or construction services in Central Texas.',
        page: 'contact'
    });
});

module.exports = router; 