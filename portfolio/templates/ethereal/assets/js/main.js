// ===================================
// ETHEREAL RESTAURANT - JAVASCRIPT
// Interactive Features & Animations
// ===================================

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
    
    // Initialize all features
    initPreloader();
    initNavigation();
    initHeroSlider();
    initMenuTabs();
    initGallery();
    initReservationForm();
    initTestimonials();
    initScrollEffects();
    initSmoothScroll();
    initParallax();
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    // Check if we're on a subpage (navbar already has 'scrolled' class)
    const isSubpage = navbar.classList.contains('scrolled');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            // Only remove 'scrolled' class on home page (not on subpages)
            if (!isSubpage) {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// ===== HERO SLIDER =====
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Create dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (n + slideCount) % slideCount;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide
    let autoSlide = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', () => clearInterval(autoSlide));
    heroSection.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
}

// ===== MENU TABS =====
function initMenuTabs() {
    // Handle both .tab-btn (home page) and .menu-tab (menu page)
    const tabBtns = document.querySelectorAll('.tab-btn, .menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab') || btn.getAttribute('data-category');

            // Remove active class from all tabs and categories
            tabBtns.forEach(b => b.classList.remove('active'));
            menuCategories.forEach(cat => cat.classList.remove('active'));

            // Add active class to clicked tab and corresponding category
            btn.classList.add('active');
            const targetCategory = document.getElementById(targetTab);
            if (targetCategory) {
                targetCategory.classList.add('active');
            }

            // Refresh AOS animations
            AOS.refresh();
        });
    });
}

// ===== MENU SIDEBAR NAVIGATION =====
function initMenuSidebar() {
    // Support both old and new sidebar class names
    const menuNavLinks = document.querySelectorAll('.menu-nav-link, .sidebar-link');
    const menuCategories = document.querySelectorAll('.menu-category, .menu-category-new');

    if (!menuNavLinks.length) return;

    // Smooth scroll and update active state on click
    menuNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Smooth scroll to section with offset for navbar
                const navbarHeight = 100;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active state
                menuNavLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Update active state on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // Debounce scroll event for better performance
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            let current = '';
            const scrollPosition = window.pageYOffset + 200;

            menuCategories.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            menuNavLinks.forEach(link => {
                link.classList.remove('active');
                const linkTarget = link.getAttribute('href').substring(1);
                if (linkTarget === current) {
                    link.classList.add('active');
                }
            });
        }, 50);
    });
}

// ===== GALLERY =====
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.modal-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            modal.classList.add('active');
            modalImg.src = img.src;
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', closeImageModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeImageModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeImageModal();
    });
    
    function closeImageModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== RESERVATION FORM =====
function initReservationForm() {
    const form = document.getElementById('reservationForm');
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            guests: document.getElementById('guests').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (validateReservationForm(formData)) {
            // Show success message
            showNotification('Reservation submitted successfully! We will contact you shortly.', 'success');
            form.reset();
        }
    });
}

function validateReservationForm(data) {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }
    
    // Guests validation
    if (data.guests < 1 || data.guests > 12) {
        showNotification('Number of guests must be between 1 and 12.', 'error');
        return false;
    }
    
    return true;
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        font-size: 1rem;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// ===== TESTIMONIALS SLIDER =====
function initTestimonials() {
    const track = document.querySelector('.testimonial-track');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const cards = document.querySelectorAll('.testimonial-card');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 40; // Including gap
    
    function updateSlider() {
        const offset = -currentIndex * cardWidth;
        track.style.transform = `translateX(${offset}px)`;
    }
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    // Auto slide
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    }, 6000);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        // Show/hide scroll to top button
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for hero section
        const heroSlides = document.querySelectorAll('.hero-bg');
        heroSlides.forEach(slide => {
            slide.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.menu-item, .signature-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            newsletterForm.reset();
        }
    });
}

// ===== CURSOR EFFECT (Optional Enhancement) =====
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent-gold);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.display = 'block';
    });
    
    // Enlarge cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Uncomment to enable custom cursor
// initCustomCursor();

// ===== LOADING ANIMATIONS =====
window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Trigger animations
    setTimeout(() => {
        AOS.refresh();
    }, 100);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Ensure all images load properly on all devices
function ensureImagesLoad() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Force image to load if it has a src attribute
        if (img.src && !img.complete) {
            img.addEventListener('error', function() {
                console.warn('Image failed to load:', this.src);
                // Retry loading after a delay
                setTimeout(() => {
                    this.src = this.src;
                }, 1000);
            });
        }
    });
}

// Call on page load and after dynamic content
window.addEventListener('load', ensureImagesLoad);
document.addEventListener('DOMContentLoaded', ensureImagesLoad);

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ANIMATIONS CSS (Added dynamically) =====
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
    
    .notification {
        animation: slideInRight 0.5s ease;
    }
`;
document.head.appendChild(style);

// ===== GALLERY FILTERS (for gallery.html) =====
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!filterBtns.length || !galleryItems.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== LIGHTBOX FUNCTIONALITY (for gallery.html) =====
let currentLightboxIndex = 0;

function openLightbox(button) {
    const galleryItem = button.closest('.gallery-item');
    const allVisibleItems = Array.from(document.querySelectorAll('.gallery-item')).filter(item =>
        item.style.display !== 'none' && window.getComputedStyle(item).display !== 'none'
    );

    currentLightboxIndex = allVisibleItems.indexOf(galleryItem);

    const img = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('.gallery-info h3')?.textContent || '';
    const description = galleryItem.querySelector('.gallery-info p')?.textContent || '';

    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImage');
    const modalTitle = document.getElementById('lightboxTitle');
    const modalDescription = document.getElementById('lightboxDescription');

    if (modal && modalImg) {
        modal.style.display = 'flex';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        if (modalTitle) modalTitle.textContent = title;
        if (modalDescription) modalDescription.textContent = description;

        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);

        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

function navigateLightbox(direction) {
    const allVisibleItems = Array.from(document.querySelectorAll('.gallery-item')).filter(item =>
        item.style.display !== 'none' && window.getComputedStyle(item).display !== 'none'
    );

    currentLightboxIndex += direction;

    if (currentLightboxIndex < 0) {
        currentLightboxIndex = allVisibleItems.length - 1;
    } else if (currentLightboxIndex >= allVisibleItems.length) {
        currentLightboxIndex = 0;
    }

    const item = allVisibleItems[currentLightboxIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-info h3')?.textContent || '';
    const description = item.querySelector('.gallery-info p')?.textContent || '';

    const modalImg = document.getElementById('lightboxImage');
    const modalTitle = document.getElementById('lightboxTitle');
    const modalDescription = document.getElementById('lightboxDescription');

    if (modalImg) {
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.textContent = description;
            modalImg.style.opacity = '1';
        }, 200);
    }
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightboxModal');
    if (modal && modal.style.display === 'flex') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    }
});

// Initialize gallery features
initGalleryFilters();

// Initialize menu sidebar navigation
initMenuSidebar();

console.log('🍽️ Ethereal Restaurant - All systems initialized successfully!');
