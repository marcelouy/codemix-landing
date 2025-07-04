// Code animation in phone mockup - INFINITE LOOP VERSION
let animationTimeout;
let isAnimating = false;

function startCodeAnimation() {
    if (isAnimating) return; // Prevent multiple animations
    
    console.log('🚀 Iniciando ciclo de animación...');
    isAnimating = true;
    
    const codeLines = document.querySelectorAll('.code-line');
    const websitePreview = document.getElementById('websitePreview');
    const codeContainer = document.querySelector('.code-container');
    
    if (codeLines.length === 0) {
        console.error('No se encontraron líneas de código');
        isAnimating = false;
        return;
    }
    
    // Reset states
    codeLines.forEach(line => line.classList.remove('visible'));
    if (websitePreview) websitePreview.classList.remove('show');
    if (codeContainer) {
        codeContainer.style.opacity = '1';
        codeContainer.style.filter = 'brightness(1)';
    }
    
    console.log(`📝 Escribiendo ${codeLines.length} líneas de código...`);
    
    let delay = 300;
    
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('visible');
            
            // Si es la última línea
            if (index === codeLines.length - 1) {
                console.log('✅ Código completado - mostrando preview en 1 segundo...');
                setTimeout(() => {
                    showWebsitePreview();
                }, 1000);
            }
        }, delay);
        
        delay += 350; // 350ms entre líneas
    });
}

// Show website preview - ENHANCED VERSION
function showWebsitePreview() {
    console.log('📱 Mostrando preview del sitio web con efectos...');
    const codeContainer = document.querySelector('.code-container');
    const websitePreview = document.getElementById('websitePreview');
    
    if (!codeContainer || !websitePreview) {
        console.error('No se encontraron elementos necesarios para el preview');
        return;
    }
    
    // Fade out code with brightness effect
    codeContainer.style.transition = 'all 0.8s ease';
    codeContainer.style.opacity = '0.05';
    codeContainer.style.filter = 'brightness(0.3) blur(2px)';
    
    // Show website preview with enhanced effects
    setTimeout(() => {
        websitePreview.classList.add('show');
        console.log('✨ Preview mostrado con efectos de brillo!');
        
        // Wait 3 seconds then restart the cycle
        animationTimeout = setTimeout(() => {
            console.log('🔄 Reiniciando ciclo...');
            hideWebsitePreview();
        }, 3000);
        
    }, 600);
}

// Hide website preview and restart cycle
function hideWebsitePreview() {
    const websitePreview = document.getElementById('websitePreview');
    const codeContainer = document.querySelector('.code-container');
    
    if (websitePreview) {
        websitePreview.style.transition = 'all 0.8s ease';
        websitePreview.style.opacity = '0';
        websitePreview.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            websitePreview.classList.remove('show');
            websitePreview.style.opacity = '';
            websitePreview.style.transform = '';
            websitePreview.style.transition = '';
            
            // Reset code container
            if (codeContainer) {
                codeContainer.style.transition = 'all 0.5s ease';
                codeContainer.style.opacity = '1';
                codeContainer.style.filter = 'brightness(1) blur(0px)';
            }
            
            // Restart animation after a brief pause
            setTimeout(() => {
                isAnimating = false;
                startCodeAnimation();
            }, 800);
            
        }, 800);
    }
}

// Stop animation when user scrolls away
function stopAnimation() {
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }
    isAnimating = false;
    console.log('⏹️ Animación detenida');
}

// Enhanced navbar scroll effect
function handleNavbarScroll() {
    const nav = document.querySelector('.nav');
    const scrolled = window.scrollY;
    
    if (scrolled > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Navbar background on scroll - Enhanced
window.addEventListener('scroll', function() {
    handleNavbarScroll();
    
    // Parallax effect for hero background (optional)
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (header && scrolled < header.offsetHeight) {
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Enhanced mobile menu CSS
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

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-3px); }
    60% { transform: translateY(-2px); }
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
}
`;

// Inject mobile menu CSS
const mobileStyle = document.createElement('style');
mobileStyle.textContent = mobileMenuCSS;
document.head.appendChild(mobileStyle);

// Start code animation when hero section is visible - INFINITE LOOP
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('🎯 Hero section visible, starting infinite animation loop...');
            setTimeout(() => {
                startCodeAnimation();
            }, 1000);
        } else {
            // Stop animation when scrolling away
            console.log('📴 Hero section not visible, stopping animation...');
            stopAnimation();
        }
    });
}, { threshold: 0.2 });

// Initialize when DOM is ready - CONSOLIDATED + DEBUG
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 CodeMix UY DOM loaded');
    
    // Check if phone elements exist
    const phoneElements = {
        heroSection: document.querySelector('.hero'),
        phoneMockup: document.querySelector('.phone-mockup'),
        phoneScreen: document.querySelector('.phone-screen'),
        demoContent: document.querySelector('.demo-content'),
        codeContainer: document.querySelector('.code-container'),
        codeLines: document.querySelectorAll('.code-line'),
        websitePreview: document.getElementById('websitePreview')
    };
    
    console.log('📱 Phone elements check:', {
        heroSection: !!phoneElements.heroSection,
        phoneMockup: !!phoneElements.phoneMockup,
        phoneScreen: !!phoneElements.phoneScreen,
        demoContent: !!phoneElements.demoContent,
        codeContainer: !!phoneElements.codeContainer,
        codeLines: phoneElements.codeLines.length,
        websitePreview: !!phoneElements.websitePreview
    });
    
    // Show first line immediately for testing
    if (phoneElements.codeLines.length > 0) {
        phoneElements.codeLines[0].style.opacity = '1';
        phoneElements.codeLines[0].style.transform = 'translateX(0)';
        console.log('✅ First code line made visible for testing');
    }
    
    if (phoneElements.heroSection) {
        console.log('🎯 Hero section found, setting up observer');
        heroObserver.observe(phoneElements.heroSection);
    } else {
        console.error('❌ Hero section not found!');
    }
    
    // Also initialize elements that should fade in
    const fadeElements = document.querySelectorAll('.fade-in, .service-card, .portfolio-item, .step, .contact-item');
    console.log(`📄 Found ${fadeElements.length} fade elements`);
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    console.log('🎉 CodeMix UY website loaded successfully!');
    
    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Set initial theme
    document.body.classList.add('loaded');
});

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
// (This is now handled in DOMContentLoaded above)

// Navbar background on scroll - Enhanced
window.addEventListener('scroll', function() {
    handleNavbarScroll();
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
        window.open(`https://wa.me/59894640299?text=${encodedMessage}`, '_blank');
        
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
// (CSS already injected above)

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
📱 WhatsApp: +598 94 640 299
💻 Desarrollado con tecnologías modernas
`);

// Initialize everything when DOM is ready
// (This is now consolidated above)

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