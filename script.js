// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements that should fade in
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in, .service-card, .portfolio-item, .step, .contact-item');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        nav.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Form handling
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Create WhatsApp message
        const whatsappMessage = `Hola CodeMix UY!

*Consulta desde la web:*

*Nombre:* ${nombre}
*Email:* ${email}
${telefono ? `*Teléfono:* ${telefono}` : ''}

*Mensaje:*
${mensaje}

¡Espero su respuesta!`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Open WhatsApp
        window.open(`https://wa.me/59892345678?text=${encodedMessage}`, '_blank');
        
        // Reset form
        this.reset();
        
        // Show success message
        showNotification('¡Mensaje enviado! Te contactaremos pronto.', 'success');
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #25d366;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Portfolio items enhanced hover
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Only run typing animation on desktop
        if (window.innerWidth > 768) {
            setTimeout(() => {
                typeWriter(heroTitle, 'Páginas Web que Convierten', 80);
            }, 500);
        }
    }
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(statNumber.textContent);
            
            if (targetValue && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateCounter(statNumber, targetValue);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Enhanced mobile menu
const mobileMenuCSS = `
.nav-links.active {
    display: flex !important;
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(26, 26, 26, 0.98);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    backdrop-filter: blur(10px);
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
}
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
        if (!e.target.closest('.nav-content')) {
            navLinks.classList.remove('active');
        }
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (header && scrolled < header.offsetHeight) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Button click tracking (for analytics)
document.querySelectorAll('.btn-primary, .btn-secondary, .whatsapp-float').forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        const buttonClass = this.className;
        
        // Log button click (can be used with Google Analytics)
        console.log('Button clicked:', {
            text: buttonText,
            class: buttonClass,
            timestamp: new Date().toISOString()
        });
        
        // You can add Google Analytics tracking here:
        // gtag('event', 'click', {
        //     event_category: 'Button',
        //     event_label: buttonText
        // });
    });
});

// Performance optimization: Preload critical images
const criticalImages = [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
];

criticalImages.forEach(imageSrc => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imageSrc;
    document.head.appendChild(link);
});

// Console welcome message
console.log(`
🚀 CodeMix UY - Páginas Web Profesionales
📧 codemixuy@gmail.com
📱 WhatsApp: +598 92 345 678
💻 Desarrollado con tecnologías modernas
`);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('CodeMix UY website loaded successfully! 🎉');
    
    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Set initial theme
    document.body.classList.add('loaded');
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.log('Image failed to load:', this.src);
        // You could set a fallback image here
        // this.src = 'path/to/fallback-image.jpg';
    });
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment the following lines if you want to implement a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}