const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Initialize OpenAI with API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Company information for context
const companyInfo = `
GK Homes and Roofing - Professional roofing and construction services in Central Texas

About Us:
- Family-owned business serving Central Texas since 2017
- Specializing in roofing, solar, remodeling, and construction
- GAF & Owens Corning Certified; BBB Accredited
- Contact: (512) 564-3679 or Garett@GK-Homes.com

Services:
- Roofing: Residential and commercial roof installation, repair, replacement
- Solar: GAF Timberline Solar installation and consultation
- Remodeling: Kitchen, bathroom, whole home renovations
- Construction: Custom homes, additions, commercial projects

Key Pages:
- Home: / (main page with overview)
- About: /about (company history and values)
- Services: /services (all service details)
- Projects: /projects (portfolio and case studies)
- Contact: /contact (contact form and info)
- Get Quote: /contact/quote (request free estimate)

Service Areas: Leander, Liberty Hill, Georgetown, Cedar Park, Round Rock, Jonestown, Lago Vista, Burnet, Pflugerville, Lake Travis
`;

router.post('/chat', async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        console.log('Chatbot request:', { message, apiKey: process.env.OPENAI_API_KEY ? 'Present' : 'Missing' });

        // Create conversation context
        const messages = [
            {
                role: 'system',
                content: `You are a helpful customer service representative for GK Homes and Roofing. 
                
${companyInfo}

Instructions:
1. Answer questions about our services, company, and projects professionally
2. When appropriate, suggest specific pages users should visit using this format: "I recommend visiting our [Page Name](/page-url) for more details"
3. For service inquiries, guide users to the relevant service page or quote page
4. Keep responses concise but informative
5. Always be helpful and professional
6. If you don't know something specific, offer to connect them with our team at (512) 497-1714
7. For pricing questions, encourage them to get a free quote at /contact/quote`
            },
            ...conversationHistory,
            {
                role: 'user',
                content: message
            }
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 300,
            temperature: 0.7
        });

        const botResponse = completion.choices[0].message.content;

        // Extract page recommendations from the response
        const pageMatches = botResponse.match(/\[([^\]]+)\]\(([^)]+)\)/g);
        const recommendations = pageMatches ? pageMatches.map(match => {
            const [, text, url] = match.match(/\[([^\]]+)\]\(([^)]+)\)/);
            return { text, url };
        }) : [];

        console.log('Chatbot response generated successfully');

        res.json({
            response: botResponse,
            recommendations: recommendations,
            conversationHistory: [
                ...conversationHistory,
                { role: 'user', content: message },
                { role: 'assistant', content: botResponse }
            ]
        });

    } catch (error) {
        console.error('Chatbot error:', error);
        res.status(500).json({ 
            error: 'Sorry, I\'m having trouble right now. Please call us at (512) 564-3679 for immediate assistance.',
            details: error.message
        });
    }
});

module.exports = router; 