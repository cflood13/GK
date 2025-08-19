// Main JavaScript for GK Homes and Roofing

// Smooth scroll for the "Discover More" indicator
document.addEventListener('DOMContentLoaded', () => {
  const indicator = document.querySelector('.scroll-indicator');
  if (indicator) {
    indicator.addEventListener('click', () => {
      const nextSection = document.querySelector('main .section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    });
  }

  // Dynamically offset the hero so the fixed header never overlaps the top text
  const headerEl = document.querySelector('header');
  const heroEl = document.querySelector('.hero');
  const heroStats = document.querySelector('.hero-stats');
  const applyHeroOffsets = () => {
    if (!heroEl || !headerEl) return;
    const headerH = headerEl.getBoundingClientRect().height || 0;
    const subline = heroEl.querySelector('.hero-text h6');
    const sublineH = subline ? subline.getBoundingClientRect().height : 0;
    // Ensure the tiny subline above H1 is fully visible below the fixed header
    const topPadding = Math.ceil(headerH + sublineH + 40); // header + subline + breathing room
    heroEl.style.paddingTop = `${topPadding}px`;
    // ensure stats never collide with the scroll indicator
    const indicatorH = indicator ? indicator.getBoundingClientRect().height : 30;
    if (heroStats) {
      heroStats.style.marginBottom = `${indicatorH + 100}px`;
    }
    // add bottom padding to the hero to guarantee space for stats + indicator
    const statsH = heroStats ? heroStats.getBoundingClientRect().height : 0;
    const bottomPadding = Math.max(140, statsH + indicatorH + 60);
    heroEl.style.paddingBottom = `${bottomPadding}px`;
  };
  applyHeroOffsets();
  window.addEventListener('resize', applyHeroOffsets);
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Project Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Contact Form Handler
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loader"></span> Sending...';
            
            try {
                const response = await fetch('/contact/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(Object.fromEntries(formData))
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Show success message
                    showMessage('success', result.message);
                    contactForm.reset();
                } else {
                    showMessage('error', result.message);
                }
            } catch (error) {
                showMessage('error', 'Sorry, there was an error sending your message. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
    
    // Show message function
    function showMessage(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }, 5000);
    }
    
    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Animate on Scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => elementObserver.observe(element));
    
    // Gallery Lightbox
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Close lightbox
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    lightbox.remove();
                }
            });
        });
    });
});

// Enhanced scroll animations with staggered effects
function enhanceScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const enhancedObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for elements in the same container
                const container = entry.target.closest('.services-showcase, .projects-grid, .benefits-grid, .hero-stats');
                if (container) {
                    const elementsInContainer = container.querySelectorAll('.animate-on-scroll');
                    const elementIndex = Array.from(elementsInContainer).indexOf(entry.target);
                    const delay = elementIndex * 150; // Stagger by 150ms
                    
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, delay);
                } else {
                    entry.target.classList.add('animated');
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => enhancedObserver.observe(element));
}

// Parallax effect for hero sections
function addParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero, .page-hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.3;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Enhanced form validation with better UX
function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add focus/blur animations
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentNode.classList.remove('focused');
                if (this.value.trim() === '') {
                    this.parentNode.classList.remove('filled');
                } else {
                    this.parentNode.classList.add('filled');
                }
            });
            
            // Real-time validation
            input.addEventListener('input', function() {
                clearTimeout(this.validationTimer);
                this.validationTimer = setTimeout(() => {
                    validateField(this);
                }, 500);
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    
    // Remove previous validation styling
    field.classList.remove('valid', 'invalid');
    
    if (field.hasAttribute('required') && value) {
        if (type === 'email' && value) {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        } else if (type === 'tel' && value) {
            isValid = /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''));
        } else {
            isValid = value.length >= 2;
        }
        
        field.classList.add(isValid ? 'valid' : 'invalid');
    }
    
    return isValid;
}

// Smooth scrolling for all anchor links
function enableSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    enhanceScrollAnimations();
    addParallaxEffect();
    enhanceFormValidation();
    enableSmoothScrolling();
});

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(err => console.log('ServiceWorker registration failed'));
    });
} 