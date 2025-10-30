// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize all functionality
    initNavigation();
    initBookingForm();
    initScrollEffects();
    initGallery();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = mobileMenu.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(31, 41, 55, 0.98)';
        } else {
            navbar.style.background = 'rgba(31, 41, 55, 0.95)';
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== BOOKING FORM =====
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    const dateInput = document.getElementById('date');
    
    // Set minimum date to tomorrow
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const barber = formData.get('barber');
            const date = formData.get('date');
            const time = formData.get('time');
            const notes = formData.get('notes');

            // Basic validation
            if (!name || !phone || !service || !date || !time) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Phone validation (basic)
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                showNotification('Please enter a valid phone number.', 'error');
                return;
            }

            // Date validation
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate <= today) {
                showNotification('Please select a future date for your appointment.', 'error');
                return;
            }

            // Check if selected date is Sunday and time is outside business hours
            const dayOfWeek = selectedDate.getDay();
            const selectedTime = parseInt(time.split(':')[0]);
            
            if (dayOfWeek === 0) { // Sunday
                if (selectedTime < 10 || selectedTime >= 16) {
                    showNotification('Sunday appointments are only available from 10:00 AM to 4:00 PM.', 'error');
                    return;
                }
            } else if (dayOfWeek === 6) { // Saturday
                if (selectedTime < 8 || selectedTime >= 18) {
                    showNotification('Saturday appointments are available from 8:00 AM to 6:00 PM.', 'error');
                    return;
                }
            } else { // Monday-Friday
                if (selectedTime < 9 || selectedTime >= 19) {
                    showNotification('Weekday appointments are available from 9:00 AM to 7:00 PM.', 'error');
                    return;
                }
            }

            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
            submitButton.disabled = true;

            setTimeout(() => {
                const serviceName = getServiceName(service);
                const barberName = getBarberName(barber);
                const formattedDate = formatDate(selectedDate);
                const formattedTime = formatTime(time);
                
                let message = `Thank you ${name}! Your appointment for ${serviceName} on ${formattedDate} at ${formattedTime}`;
                if (barberName) {
                    message += ` with ${barberName}`;
                }
                message += ' has been booked. We\'ll call you to confirm shortly.';
                
                showNotification(message, 'success');
                this.reset();
                
                // Reset date minimum
                if (dateInput) {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    dateInput.min = tomorrow.toISOString().split('T')[0];
                }
                
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// ===== GALLERY =====
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You could add a lightbox or modal here
            const title = this.querySelector('.gallery-overlay h4').textContent;
            showNotification(`Viewing: ${title}`, 'info');
        });
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroPattern = document.querySelector('.hero-pattern');
        
        if (heroPattern) {
            const rate = scrolled * -0.3;
            heroPattern.style.transform = `translateY(${rate}px)`;
        }
    });

    // Animate barber chair on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const chairObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chair = entry.target.querySelector('.barber-chair');
                if (chair) {
                    chair.style.animation = 'chairBounce 1s ease-out';
                }
                chairObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        chairObserver.observe(heroVisual);
    }

    // Service cards hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('featured') ? 'scale(1.05)' : '';
        });
    });
}

// ===== UTILITY FUNCTIONS =====

function getServiceName(serviceValue) {
    const services = {
        'classic-cut': 'Classic Haircut',
        'traditional-shave': 'Traditional Shave',
        'beard-grooming': 'Beard Grooming',
        'royal-treatment': 'The Royal Treatment'
    };
    return services[serviceValue] || serviceValue;
}

function getBarberName(barberValue) {
    const barbers = {
        'frank': 'Frank Romano',
        'tony': 'Tony Martinez',
        'marcus': 'Marcus Johnson'
    };
    return barbers[barberValue] || '';
}

function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 6 seconds for success messages, 4 seconds for others
    const autoRemoveTime = type === 'success' ? 6000 : 4000;
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, autoRemoveTime);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes chairBounce {
        0% { transform: translateY(20px) scale(0.8); opacity: 0; }
        50% { transform: translateY(-10px) scale(1.1); opacity: 0.8; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s;
    }

    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// ===== PERFORMANCE OPTIMIZATIONS =====

// Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Scroll-based animations and effects are handled in initScrollEffects
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
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

// Initialize lazy loading
initLazyLoading();

// Add some vintage charm with random chair movements
setInterval(() => {
    const chair = document.querySelector('.barber-chair');
    if (chair && Math.random() > 0.95) { // 5% chance every interval
        chair.style.transform = 'rotate(1deg)';
        setTimeout(() => {
            chair.style.transform = '';
        }, 200);
    }
}, 3000);
