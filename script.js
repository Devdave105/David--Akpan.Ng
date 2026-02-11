// Navigation functionality
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

// Mobile menu toggle with proper functionality
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menuToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
    document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinksContainer.classList.contains('active') && 
        !navLinksContainer.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Prevent menu from closing when clicking inside nav links container
navLinksContainer.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('.section, .hero');

function updateActiveNav() {
    let current = 'home';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking
            if (navLinksContainer.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Skills animation with Intersection Observer
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, index * 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Project preview modal
const previewButtons = document.querySelectorAll('[data-project]');
const previewModal = document.getElementById('previewModal');
const modalTitle = document.getElementById('modalTitle');
const previewFrame = document.getElementById('previewFrame');
const closeModal = document.getElementById('closeModal');
const modalBackdrop = document.querySelector('.modal-backdrop');

const projectData = {
    '1': {
        title: 'E-Commerce Platform - Live Preview',
        url: 'https://demo-ecommerce-nextjs.vercel.app'
    },
    '2': {
        title: 'Task Management Dashboard - Live Preview',
        url: 'https://demo-taskboard.vercel.app'
    },
    '3': {
        title: 'Social Media Analytics - Live Preview',
        url: 'https://demo-analytics-dashboard.vercel.app'
    },
    '4': {
        title: 'AI Portfolio Generator - Live Preview',
        url: 'https://demo-portfolio-builder.vercel.app'
    },
    '5': {
        title: 'Weather Forecast App - Live Preview',
        url: 'https://demo-weather-app.vercel.app'
    },
    '6': {
        title: 'Fitness Tracking Platform - Live Preview',
        url: 'https://demo-fitness-tracker.vercel.app'
    }
};

// Open modal function
function openPreviewModal(projectId) {
    const project = projectData[projectId];
    
    if (project) {
        modalTitle.textContent = project.title;
        previewFrame.src = project.url;
        previewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Attach event listeners to all preview buttons
previewButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        openPreviewModal(projectId);
    });
});

// Close modal function
function closePreviewModal() {
    previewModal.classList.remove('active');
    previewFrame.src = '';
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closePreviewModal);

// Close modal when clicking on backdrop
if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closePreviewModal);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && previewModal.classList.contains('active')) {
        closePreviewModal();
    }
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeSuccess = document.getElementById('closeSuccess');
const successBackdrop = document.querySelector('.success-backdrop');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all required fields.');
        return;
    }

    // Create mailto link with form data
    const mailtoLink = `mailto:davidakapn105@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Open mailto link
    window.location.href = mailtoLink;

    // Show success modal after brief delay
    setTimeout(() => {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset form
        contactForm.reset();
    }, 500);
});

// Close success modal
function closeSuccessModal() {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeSuccess.addEventListener('click', closeSuccessModal);

// Close success modal when clicking on backdrop
if (successBackdrop) {
    successBackdrop.addEventListener('click', closeSuccessModal);
}

// Close success modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.classList.contains('active')) {
        closeSuccessModal();
    }
});

// Update current year in footer
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Fade in elements on scroll with Intersection Observer
const fadeElements = document.querySelectorAll('.project-card, .review-card, .skill-column, .tech-item, .stat-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Form validation with visual feedback
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    // Validate on blur
    input.addEventListener('blur', () => {
        validateInput(input);
    });

    // Clear error state on focus
    input.addEventListener('focus', () => {
        input.style.borderColor = '';
    });

    // Real-time validation
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    if (input.hasAttribute('required') && input.value.trim() === '') {
        input.style.borderColor = '#EF4444';
        return false;
    } else if (input.type === 'email' && !input.validity.valid) {
        input.style.borderColor = '#EF4444';
        return false;
    } else if (input.value.trim() !== '') {
        input.style.borderColor = '#10B981';
        return true;
    }
    return true;
}

// Add loading animation to submit button
const submitBtn = document.querySelector('.btn-submit');
const originalBtnContent = submitBtn.innerHTML;

if (submitBtn) {
    contactForm.addEventListener('submit', () => {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Parallax effect for hero section (subtle)
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const heroContent = document.querySelector('.hero-content');
            
            if (heroContent && scrolled < window.innerHeight) {
                const opacity = 1 - (scrolled / window.innerHeight) * 0.5;
                const translateY = scrolled * 0.3;
                
                heroContent.style.transform = `translateY(${translateY}px)`;
                heroContent.style.opacity = opacity;
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Add smooth hover effect to social links (works on mobile with tap)
const socialLinks = document.querySelectorAll('.social-link, .footer-social-link, .contact-social-link');

socialLinks.forEach(link => {
    // For mobile: use touchstart and touchend
    link.addEventListener('touchstart', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    link.addEventListener('touchend', function() {
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Lazy loading images for better performance
const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            // Wait for image to load
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
            
            imageObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Add click effect to buttons (mobile-friendly)
const buttons = document.querySelectorAll('.btn, button');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn, button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Console message for developers
console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #DC2626; font-weight: bold;');
console.log('%c✨ Like what you see? Let\'s work together!', 'font-size: 14px; color: #111827;');
console.log('%c📧 davidakapn105@gmail.com', 'font-size: 12px; color: #6B7280;');
console.log('%c🔗 https://github.com/davidakapn', 'font-size: 12px; color: #6B7280;');

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
    
    // Trigger initial animations
    updateActiveNav();
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #DC2626, #991B1B);
    width: 0%;
    z-index: 9999;
    transition: width 0.3s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});


document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    

    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });
});


let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        
        if (window.innerWidth > 768 && navLinksContainer.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }, 250);
});

// Add "Back to Top" button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.setAttribute('aria-label', 'Back to top');
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #DC2626;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
`;
document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top on click
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for back to top button
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'translateY(-5px)';
    backToTopBtn.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.5)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'translateY(0)';
    backToTopBtn.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.4)';
});

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Add animation classes to hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-image');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150);
    });
});