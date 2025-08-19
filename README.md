# GK Homes and Roofing Website

Professional website for GK Homes and Roofing - Central Texas roofing and construction specialists since 2017.

## 🚀 Live Demo

**Production URL**: [Will be available after Render deployment]

## ✨ Features

- **Modern Responsive Design**: Mobile-first approach with sleek, professional styling
- **AI-Powered Chatbot**: OpenAI-powered customer service assistant
- **Service Showcase**: Comprehensive display of roofing, solar, remodeling, and construction services  
- **Project Portfolio**: Gallery of completed projects with detailed case studies
- **Interactive Elements**: Smooth animations, hover effects, and user-friendly navigation
- **Contact Integration**: Multiple contact forms and clear call-to-action buttons
- **GAF Integration**: Embedded GAF widgets for shingle selection and warranties
- **SEO Optimized**: Structured markup and optimized content for search engines

## 🛠 Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: EJS templating with custom CSS and JavaScript
- **AI Integration**: OpenAI GPT-3.5-turbo for chatbot functionality
- **Styling**: Custom CSS with CSS Variables and modern design patterns
- **Security**: Helmet.js for security headers
- **Performance**: Compression middleware and optimized assets

## 🚀 Deployment

### Automatic Deployment (Render)

This project is configured for automatic deployment on Render:

1. **Push to GitHub**: Code automatically deploys from main branch
2. **Environment Variables**: Set `OPENAI_API_KEY` in Render dashboard
3. **Automatic SSL**: HTTPS enabled by default
4. **Zero Downtime**: Rolling deployments

### Deploy to Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

**Environment Variables Required:**
- `OPENAI_API_KEY`: Your OpenAI API key for chatbot functionality
- `NODE_ENV`: Set to `production`
- `PORT`: Automatically set by Render (10000)

## 💻 Local Development

1. **Clone the repository**
```bash
git clone https://github.com/cflood13/GK.git
cd GK
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
NODE_ENV=development
```

4. **Start development server**
```bash
npm run dev
```

The website will be available at `http://localhost:3000`

## 📁 Project Structure

```
gk-website/
├── public/              # Static assets
│   ├── css/            # Stylesheets
│   ├── js/             # Client-side JavaScript
│   └── images/         # Image assets
├── views/              # EJS templates
│   ├── pages/          # Page templates
│   ├── partials/       # Reusable components
│   └── layout.ejs      # Main layout
├── routes/             # Express routes
│   ├── index.js        # Home routes
│   ├── services.js     # Service pages
│   ├── projects.js     # Project gallery
│   ├── contact.js      # Contact forms
│   └── chatbot.js      # AI chatbot API
├── server.js           # Main application file
├── render.yaml         # Render deployment config
└── package.json        # Dependencies and scripts
```

## 🎯 Key Features

### AI Chatbot
- **Powered by OpenAI GPT-3.5-turbo**
- **Company-specific knowledge** about services and projects
- **Page recommendations** and routing assistance
- **Professional customer service** responses

### Responsive Design
- **Mobile-first** approach
- **Modern CSS Grid** and Flexbox layouts
- **Touch-friendly** interactions
- **Optimized performance** across devices

### SEO & Performance
- **Server-side rendering** with EJS
- **Compressed assets** and optimized images
- **Security headers** and CORS configuration
- **Meta tags** and structured data

## 📞 Contact Information

- **Phone**: (512) 564-3679
- **Email**: Garett@GK-Homes.com
- **Service Area**: Austin, Leander, Cedar Park, Round Rock, Georgetown, TX

## 🔧 Maintenance

- **Dependencies**: Automatically updated via Dependabot
- **Security**: Monitored via GitHub Security Advisories
- **Performance**: Optimized for Core Web Vitals
- **Content**: Easy updates through EJS templates

## 📄 License

© 2025 GK Homes LLC. All rights reserved.

---

**Built with ❤️ for GK Homes and Roofing** 