// ===== LUXE BEAUTY ATELIER - ELITE JAVASCRIPT =====

class LuxeBeautyAtelier {
    constructor() {
        this.init();
    }

    init() {
        this.initPreloader();
        this.initNavigation();
        this.initCounterAnimations();
        this.initFormHandling();
        this.initScrollAnimations();
        this.initAOS();
    }

    // Preloader
    initPreloader() {
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader');
            const loadingProgress = document.querySelector('.loading-progress');

            // Animate loading progress
            setTimeout(() => {
                loadingProgress.style.width = '100%';
            }, 500);

            // Hide preloader
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 2000);
        });
    }

    // Navigation
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Smooth scroll for all anchor links
        const allLinks = document.querySelectorAll('a[href^="#"]');
        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // Counter Animations
    initCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }

    // Form Handling
    initFormHandling() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, select, textarea');

        // Add validation and styling
        inputs.forEach(input => {
            // Handle focus and blur for label animation
            input.addEventListener('focus', () => {
                input.parentNode.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentNode.classList.remove('focused');
                }
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }

                // Keep label up if there's content
                if (input.value) {
                    input.parentNode.classList.add('focused');
                } else {
                    input.parentNode.classList.remove('focused');
                }
            });

            // Special handling for select dropdown
            if (input.tagName === 'SELECT') {
                // Initialize label position based on current value
                if (input.value && input.value !== '') {
                    input.parentNode.classList.add('focused');
                }

                input.addEventListener('change', () => {
                    if (input.value && input.value !== '') {
                        input.parentNode.classList.add('focused');
                    } else {
                        input.parentNode.classList.remove('focused');
                    }
                    this.validateField(input);
                });

                // Handle focus for select - always move label up when focused
                input.addEventListener('focus', () => {
                    input.parentNode.classList.add('focused');
                });

                input.addEventListener('blur', () => {
                    // Only remove focused class if no value is selected
                    if (!input.value || input.value === '') {
                        input.parentNode.classList.remove('focused');
                    }
                    this.validateField(input);
                });
            }
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
    }

    validateField(field) {
        const value = field.value ? field.value.trim() : '';
        let isValid = true;

        // Remove existing error
        field.classList.remove('error');
        this.removeErrorMessage(field);

        // Required field validation
        if (field.hasAttribute('required') && (!value || value === '')) {
            isValid = false;
            this.showErrorMessage(field, 'This field is required');
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                this.showErrorMessage(field, 'Please enter a valid email address');
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                this.showErrorMessage(field, 'Please enter a valid phone number');
            }
        }

        if (!isValid) {
            field.classList.add('error');
        }

        return isValid;
    }

    showErrorMessage(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #E91E63;
            font-size: 0.8rem;
            margin-top: 4px;
            font-weight: 500;
        `;
        field.parentNode.appendChild(errorElement);
    }

    removeErrorMessage(field) {
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    handleFormSubmit(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let isFormValid = true;

        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm(form);
        } else {
            this.showFormError('Please correct the errors above');
        }
    }

    submitForm(form) {
        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>Booking Your Experience...</span>
        `;
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showSuccessMessage();
            form.reset();

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #E91E63, #8E24AA);
                color: white;
                padding: 30px 40px;
                border-radius: 20px;
                text-align: center;
                box-shadow: 0 20px 60px rgba(233, 30, 99, 0.3);
                z-index: 10000;
                backdrop-filter: blur(20px);
            ">
                <i class="fas fa-crown" style="font-size: 2rem; margin-bottom: 16px; color: #D4AF37;"></i>
                <h3 style="margin-bottom: 12px; font-family: 'Cormorant Garamond', serif;">Booking Confirmed!</h3>
                <p style="margin: 0; opacity: 0.9;">We'll contact you within 24 hours to schedule your luxury experience.</p>
            </div>
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 4000);
    }

    showFormError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            background: rgba(233, 30, 99, 0.1);
            border: 1px solid #E91E63;
            color: #E91E63;
            padding: 12px 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            font-weight: 500;
        `;

        const form = document.getElementById('contact-form');
        form.insertBefore(errorElement, form.firstChild);

        setTimeout(() => {
            errorElement.remove();
        }, 5000);
    }

    // Scroll Animations
    initScrollAnimations() {
        // Parallax effect for floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-ornament, .particle');

            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Initialize AOS
    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100,
                delay: 100
            });
        }
    }
}

// Utility Functions
class LuxuryUtils {
    static createParticles() {
        const particleContainer = document.querySelector('.luxury-particles');
        if (!particleContainer) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (8 + Math.random() * 8) + 's';
            particleContainer.appendChild(particle);
        }
    }

    static addShimmerEffect() {
        const buttons = document.querySelectorAll('.btn-hero-primary, .btn-luxury, .service-btn');
        buttons.forEach(btn => {
            if (!btn.querySelector('.btn-shimmer')) {
                const shimmer = document.createElement('div');
                shimmer.className = 'btn-shimmer';
                btn.appendChild(shimmer);
            }
        });
    }

    static initImageLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LuxeBeautyAtelier();
    LuxuryUtils.createParticles();
    LuxuryUtils.addShimmerEffect();
    LuxuryUtils.initImageLazyLoading();
});

// Performance optimization
window.addEventListener('load', () => {
    // Remove unused CSS after load
    const unusedStyles = document.querySelectorAll('style[data-temp]');
    unusedStyles.forEach(style => style.remove());

    // Preload critical images
    const criticalImages = [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});