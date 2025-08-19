const express = require('express');
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security and performance middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                "https://cdnjs.cloudflare.com",
                "https://view.ceros.com",
                // Owens Corning widgets
                "https://apis.owenscorning.com",
                "https://www.owenscorning.com",
                // GuildQuality widgets (allow common domains)
                "https://www.guildquality.com",
                "https://cdn.guildquality.com"
            ],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            frameSrc: [
                "'self'",
                "https://view.ceros.com",
                "https://360.supersale3d.com",
                // GuildQuality embeds can render in iframes
                "https://www.guildquality.com",
                "https://cdn.guildquality.com",
                "https://www.owenscorning.com"
            ],
            connectSrc: [
                "'self'",
                "https://apis.owenscorning.com",
                "https://www.owenscorning.com",
                "https://www.guildquality.com",
                "https://cdn.guildquality.com"
            ]
        }
    }
}));
app.use(compression());
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const indexRoute = require('./routes/index');
const projectsRoute = require('./routes/projects');
const servicesRoute = require('./routes/services');
const contactRoute = require('./routes/contact');
const chatbotRoute = require('./routes/chatbot');

app.use('/', indexRoute);
app.use('/projects', projectsRoute);
app.use('/services', servicesRoute);
app.use('/contact', contactRoute);
app.use('/api/chatbot', chatbotRoute);

// 404 handler
app.use((req, res, next) => {
    res.status(404).render('pages/404', { 
        title: '404 - Page Not Found | GK Homes and Roofing',
        description: 'The page you are looking for could not be found.',
        page: '404'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/error', { 
        title: 'Error | GK Homes and Roofing',
        description: 'An error occurred while processing your request.',
        page: 'error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 